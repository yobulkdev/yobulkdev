import { Readable } from 'stream';
import Papa from 'papaparse';

const openCsvInputStream = (fileInputStream) => {
  const csvInputStream = new Readable({ objectMode: true });
  csvInputStream._read = () => {};
  Papa.parse(fileInputStream, {
    header: true,
    dynamicTyping: false,
    skipEmptyLines: true,
    step: (results) => {
      Object.keys(results.data).forEach((key) => {
        if (results.data[key] === "true" || results.data[key] === "false") {
          results.data[key] = (results.data[key] === "true")
        } else if (/^\d+$/.test(results.data[key])) {
          results.data[key] = parseInt(results.data[key])
        } else if (/^\d+\.\d+$/.test(results.data[key])) {
          results.data[key] =  parseFloat(results.data[key])
        }
      })
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

export { openCsvInputStream };
