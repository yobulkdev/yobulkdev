import { Writable } from 'stream';
import { MongoClient } from 'mongodb';

class StreamToMongoDB {
  constructor(options) {
    this.config = {};
    this.batch = [];
    this.dbConnection = null;
    this.defaultConfig = {
      batchSize: 1000,
      insertOptions: { ordered: false, w: 1 },
    };

    this.setupConfig(options);
    this.stream = this.writableStream();
  }

  stream() {
    return this.stream;
  }

  async connect() {
    const conn = this.config.client; //await MongoClient.connect(this.config.dbURL);
    return conn;
  }

  async insertToMongo(records) {
    records = records.map((r) => {
      delete r._id;
      return r;
    });

    try {
      await this.dbConnection
        .db(this.config.dbName)
        .collection(this.config.collectionName)
        .insertMany(records);
      // console.log('---- inserted records ----', records.length);
      this.resetBatch();
    } catch (error) {
      console.log(error);
    }
  }

  async addToBatch(record) {
    try {
      this.batch.push(record);

      if (this.batch.length === this.config.batchSize) {
        await this.insertToMongo(this.batch);
      }
    } catch (error) {
      console.log(error);
    }
  }

  setupConfig(options) {
    // add required options if not exists
    Object.keys(this.defaultConfig).forEach((configKey) => {
      if (!options[configKey]) {
        options[configKey] = this.defaultConfig[configKey];
      }
    });

    this.config = options;
  }

  resetConn() {
    if (this.dbConnection) this.dbConnection.close();
    this.dbConnection = null;
  }

  resetBatch() {
    this.batch = [];
  }

  writableStream() {
    const writable = new Writable({
      objectMode: true,
      write: async (record, encoding, next) => {
        try {
          if (this.dbConnection) {
            await this.addToBatch(record);
            next();
          } else {
            this.dbConnection = await this.connect();
            await this.addToBatch(record);
            next();
          }
        } catch (error) {
          console.log(error);
        }
      },
    });

    writable.on('finish', async () => {
      try {
        if (this.batch.length) {
          await this.insertToMongo(this.batch);
        }
        // this.dbConnection.close();
        //this.resetConn();
        writable.emit('close');
        console.log('---- writable stream finish ----');
        this.config.resolve(this.config.collectionName);
      } catch (error) {
        console.log(error);
        this.config.reject(this.config.collectionName);
      }
    });

    return writable;
  }
}

export default StreamToMongoDB;
