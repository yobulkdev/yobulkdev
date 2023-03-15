# Insert millions of record into Mongodb through a webapp on your personal laptop using Nodejs Streams!

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
