import React from 'react';

const DisplayData = ({ getTableBodyProps, rows, prepareRow }) => {
  return (
    <div>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </div>
  );
};

export default DisplayData;