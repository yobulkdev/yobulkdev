# Insert millions of records into Mongodb through a NextJS app on your personal laptop using Nodejs Streams!

Node.js streams are a powerful and flexible mechanism for reading and writing data in a streaming fashion. Streams provide an efficient way to handle large volumes of data by processing it in small chunks, rather than loading it all into memory at once.

### What are Node.js Streams?

In Node.js, a stream is an abstract interface that represents a sequence of data. A stream can be thought of as a flow of data that is divided into chunks, and these chunks can be processed incrementally as they become available.

Streams can be used to read or write data from various sources, such as files, network sockets, or even in-memory data structures. Streams in Node.js are implemented using event emitters, which means that they can be used asynchronously and in a non-blocking way.

### Types of Node.js Streams

There are four types of Node.js streams, each of which serves a different purpose:

- Readable: A Readable stream is used to read data from a source, such as a file or network socket. A Readable stream emits the 'data' event whenever new data is available, and the 'end' event when the stream has reached its end.

- Writable: A Writable stream is used to write data to a destination, such as a file or network socket. A Writable stream provides a 'write' method to write data to the stream, and the 'end' method to signal the end of the stream.

- Duplex: A Duplex stream is both Readable and Writable. A Duplex stream can be used to read data from a source and write data to a destination at the same time. A Duplex stream emits the 'data' event when new data is available and provides a 'write' method to write data to the stream.

- Transform: A Transform stream is a type of Duplex stream that can be used to transform data as it passes through the stream. A Transform stream provides a 'transform' method to modify the data, and the 'flush' method to signal the end of the stream.

## What is current architecture ?

![Stream Flow](https://raw.githubusercontent.com/yobulkdev/yobulkdev/main/public/import-flow.jpg)

#### Step 1

A drop zone is created to provision a place for drag and drop of csv file.

```
const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

return(
    <>
        <div
        className={`px-6 pt-5 pb-6 border-2 border-dashed rounded-lg ${
          isDragActive ? "border-green-400" : "border-gray-400"
        }`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center        text-center space-y-1">
          <PlusIcon className="w-8 h-8 text-gray-400" />
          <p className="text-sm font-medium text-gray-400">
            Drop files here or click to upload
          </p>
        </div>
      </div>
      {files.map((file) => (
        <p
          key={file.name}
          className="mt-2 text-sm font-medium text-gray-500 truncate"
        >
          {file.name} ({file.size} bytes)
        </p>
      ))}
      </>)

```

#### Step 2

Create rest api for starting streaming.

```
 busboy.on(
            'file',
            async function (fieldname, file, filename, encoding, mimetype) {
              console.log('The file details are', filename, encoding, mimetype);
            }
          pipeline(stream1, stream2)

            )
```

Here we have used Busboy library so as to directly stream the data instead of copying it to a location on server and then moving into MongoDB.

The pipeline function from node js stream will be used for giving a flow for the parsing, then transforming and inserting into Mongodb.

```
     pipeline(
                file,
                openCsvInputStream,
                headers_changes,
                dbClient.stream,
                (err) => {
                  if (err) {
                    console.log('Pipeline failed with an error:', err);
                  } else {
                    console.log('Pipeline ended successfully');
                  }
                }
              );
```

#### Step 3

Here the papaparse stream is the first stage on the pipeline. Papaparse is a high speed parsing library for parsing huge csvs into json format. But, we need stream of the huge csv data which will be passed to the next stages of the transformation.

The following code creates a readable stream out of papaparse input stream.

```
const openCsvInputStream = (fileInputStream) => {
  const csvInputStream = new Readable({ objectMode: true });
  csvInputStream._read = () => {};
  Papa.parse(fileInputStream, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    step: (results) => {
      csvInputStream.push(results.data);
    },
    complete: () => {
      csvInputStream.push(null);
    },
    error: (err) => {
      csvInputStream.emit('error', err);
    },
  });
  return csvInputStream;
};

```

#### Step 4

This is where the transformation streams come into picture.

```
    var headers_changes = new Transform({
          readableObjectMode: true,
          writableObjectMode: true,
        });

        headers_changes._transform = async function (data, enc, cb) {
          var newdata = await changeHeader({
            oldColumns,
           newColumns,
          });
          headers_changes.push(newdata);
          cb();
        };

```

This header change transformation changes the old column header names into new header name, the catch is , this is a transformer stream. Once the data is transformed, it is ready for insertion.

#### <ins>Step 5 </ins>
