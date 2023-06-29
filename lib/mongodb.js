import { MongoClient } from 'mongodb';
import promiseRetry from 'promise-retry';
import { createConstraints } from './constraints';

const uri = process.env.MONGODB_URI || '';
const options = { maxPoolSize: 50, wtimeoutMS: 2500 };
const promiseRetryOptions = {
  retries: 10,
  factor: 1, // sets the factor for exponential backoff
  minTimeout: 1000,
  maxTimeout: 2000,
};
let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = promiseRetry((retry, number) => {
      console.log(`Mongo (dev) connection attempt number: ${number}`);
      return client.connect().catch(retry);
    }, promiseRetryOptions).then((promise) => {
      console.log('Mongo (dev) successfully connected.');
      createConstraints(promise);
      return promise;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = promiseRetry((retry, number) => {
    console.log(`Mongo (prod) connection attempt number: ${number}`);
    return client.connect().catch(retry);
  }, promiseRetryOptions).then((promise) => {
    console.log('Mongo (prod) successfully connected.');
    createConstraints(promise);
    return promise;
  });
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
