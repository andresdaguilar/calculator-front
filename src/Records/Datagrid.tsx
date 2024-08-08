import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowId } from '@mui/x-data-grid';
import { Button, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import iRecords from './iRecords';



interface DataGridProps {
  rows: iRecords[];
  handleDelete: (id: GridRowId) => void;
}

const DataTable: React.FC<DataGridProps> = ({rows, handleDelete}) => {
  console.log("Rows", rows);
  const rowList = rows.map((row: iRecords, inde: number) => {
    return { id: row.id, date: row.date, operationType: "T"+row.operation_id, amounts: `${row.amount}, ${row.amount2}`, Result: row.operation_response }
  });

  const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date', width: 200, 
      renderCell: (params: GridRenderCellParams) => (
      <div style={{ textWrap: 'nowrap' }}>
        {params.value}
      </div>
    ), },
    { field: 'operationType', headerName: 'Operation Type', width: 120 },
    { field: 'amounts', headerName: 'Amounts', width: 100, },
    { field: 'Result', headerName: 'Result', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 80,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant="outlined"
          onClick={() => handleDelete(params.id)}
        >
          <DeleteIcon/>
        </Button>
      ),
    },
  ];

 
  return (
    <Container style={{ width: '100%' }}>
      <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rowList}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      </div>
    </Container>
  );
};

export default DataTable;
