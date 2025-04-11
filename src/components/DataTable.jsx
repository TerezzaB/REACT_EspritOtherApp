import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function DataTable({ data }) {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  // Extract columns from the keys of the first object
  const columns = Object.keys(data[0]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: '12px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        width: '100%'
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                sx={{
                  fontWeight: 'bold',
                  backgroundColor: '#f5f5f5',
                  textAlign: 'center',
                }}
              >
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{
                backgroundColor: rowIndex % 2 === 0 ? '#ffffff' : '#f9f9f9',
                '&:hover': {
                  backgroundColor: '#f1f1f1',
                },
              }}
            >
              {columns.map((column, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  {row[column]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}