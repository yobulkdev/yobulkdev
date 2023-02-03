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
