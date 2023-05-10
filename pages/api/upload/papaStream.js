import { Readable } from 'stream';
import Papa from 'papaparse';

const openCsvInputStream = (fileInputStream) => {
  const csvInputStream = new Readable({ objectMode: true });
  csvInputStream._read = () => {};
  Papa.parse(fileInputStream, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    step: (results) => {
      Object.keys(results.data).forEach((key) => {
        if (results.data[key] instanceof Date) results.data[key] = results.data[key].toISOString()
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
