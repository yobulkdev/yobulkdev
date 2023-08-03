import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Papa from 'papaparse';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDropzone } from 'react-dropzone';

const App = () => {
  const [gridData, setGridData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [columnColors, setColumnColors] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [columnNames, setColumnNames] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: handleCsvData,
      skipEmptyLines: true
    });
  };

  const handleCsvData = (results) => {
    const csvData = results.data || [];
    const filteredCsvData = csvData.filter((row) => {
      for (const column in row) {
        if (row[column]) {
          return true;
        }
      }
      return false;
    });

    const names = Object.keys(filteredCsvData[0]);
    setColumnNames(names);

    const rows = filteredCsvData.map((row, index) => ({
      id: index + 1,
      ...row,
    }));

    const columnUniqueness = getColumnUniqueness(rows);
    const colors = generateColumnColors(names.length);

    const updatedRows = rows.map((row) => {
      const updatedRow = { ...row };
      for (const column in updatedRow) {
        if (column !== 'id') {
          const cellValue = updatedRow[column];
          const isUnique = columnUniqueness[column][cellValue] === 1;
          updatedRow[column] = cellValue;
          updatedRow[column + '_unique'] = isUnique;
          updatedRow[column + '_duplicate'] = !isUnique;
        }
      }
      return updatedRow;
    });

    const updatedColumns = names.map((columnName, index) => ({
      field: columnName,
      headerName: columnName,
      width: 150,
      editable: true,
      cellClassName: (params) => params.row[params.field + '_duplicate'] ? 'duplicate-cell' : '',
      renderCell: (params) => {
        if (params.row[params.field + '_duplicate']) {
          return (
            <div className="cell-tooltip">
              <span>{params.value}</span>
              <div className="cell-tooltip-text">
                Duplicate entry in column: {params.field}
              </div>
            </div>
          );
        }
        return <span>{params.value}</span>;
      },
      headerClassName: (params) => `column-header ${params.field}_header`,
      headerStyle: {
        backgroundColor: columnColors[columnNames.indexOf(columnName)],
      },
    }));

    setGridData(updatedRows);
    setColumns(updatedColumns);
    setColumnColors(colors);
  };

  const getColumnUniqueness = (rows) => {
    const columnUniqueness = {};

    rows.forEach((row) => {
      for (const column in row) {
        if (column !== 'id') {
          const cellValue = row[column];
          columnUniqueness[column] = columnUniqueness[column] || {};
          columnUniqueness[column][cellValue] = columnUniqueness[column][cellValue]
            ? columnUniqueness[column][cellValue] + 1
            : 1;
        }
      }
    });

    return columnUniqueness;
  };

  const generateColumnColors = (numColumns) => {
    const colors = [];
    const hueIncrement = Math.floor(360 / numColumns);
    let hue = 0;
    for (let i = 0; i < numColumns; i++) {
      const color = `hsl(${hue}, 100%, 80%)`;
      colors.push(color);
      hue += hueIncrement;
    }
    return colors;
  };

  const handleColumnSelect = (event) => {
    setSelectedColumn(event.target.value);
  };

  const getColumnUniquenessStatus = () => {
    if (selectedColumn) {
      const columnUniqueness = getColumnUniqueness(gridData);
      const columnData = gridData.map((row) => row[selectedColumn]);
      const isUnique = new Set(columnData).size === gridData.length;
      const uniquenessStatus = isUnique ? 'All Unique' : 'Duplicates Found';
      return uniquenessStatus;
    }
    return '';
  };

  useEffect(() => {
    const columnUniqueness = getColumnUniqueness(gridData);
    const updatedColumns = columns.map((column) => ({
      ...column,
      headerStyle: {
        ...column.headerStyle,
        backgroundColor: columnColors[columnNames.indexOf(column.field)],
      },
      renderCell: (params) => {
        if (params.field === selectedColumn && params.row[params.field + '_duplicate']) {
          return (
            <div className="cell-tooltip">
              <span>{params.value}</span>
              <div className="cell-tooltip-text">
                Duplicate entry in column: {params.field}
              </div>
            </div>
          );
        }
        return <span>{params.value}</span>;
      },
    }));

    setColumns(updatedColumns);
  }, [gridData, selectedColumn]);

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <div style={{ marginTop: 10 }}>
        <FormControl sx={{
          minWidth: 200,
        }}>
          <InputLabel>Select Column</InputLabel>
          <Select value={selectedColumn} onChange={handleColumnSelect}>
            {columns.map((column) => (
              <MenuItem key={column.field} value={column.field}>
                {column.headerName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedColumn && (
          <div style={{ marginTop: 10 }}>
            <strong>Column Uniqueness:</strong> {getColumnUniquenessStatus()}
          </div>
        )}
      </div>
      <div style={{ height: 600, width: '100%', marginTop: 10 }}>
        <DataGrid columns={columns} rows={gridData} />
      </div>
    </div>
  );
};

export default App;
