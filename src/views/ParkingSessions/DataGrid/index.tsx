// libraries
import * as React from 'react';
// components
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { DataGrid, GridColDef, GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
// utils
import { formatPhoneNumber } from '../../../util/format/';

const columns: GridColDef[] = [
  { 
    field: 'licensePlateNumber', 
    headerName: 'License Plate Number', 
    width: 180 
  },
  { 
    field: 'phoneNumber', 
    headerName: 'Phone Number', 
    width: 180, 
    valueFormatter: ({ value }) => formatPhoneNumber(value || ''),
  },
  {
    field: 'enteredAt',
    headerName: 'Entered At',
    type: 'dateTime',
    width: 200,
  },
  {
    field: 'exitedAt',
    headerName: 'Exited At',
    type: 'dateTime',
    width: 200,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 220,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    getActions: (params: GridRowParams) => [
      <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
    ]
  }
]

const rows = [
  {
    id: 1,
    licensePlateNumber: 'ABC123',
    phoneNumber: '12345678901',
    enteredAt: new Date(),
    exitedAt: new Date(),
    status: 'active',
  },
  {
    id: 2,
    licensePlateNumber: 'DEF456',
    phoneNumber: '12345678901',
    enteredAt: new Date(),
    exitedAt: new Date(),
    status: 'completed',
  },
  {
    id: 3,
    licensePlateNumber: 'GHI789',
    phoneNumber: '12345678901',
    enteredAt: new Date(),
    exitedAt: new Date(),
    status: 'active',
  },
  {
    id: 4,
    licensePlateNumber: 'JKL012',
    phoneNumber: '12345678901',
    enteredAt: new Date(),
    exitedAt: new Date(),
    status: 'completed',
  },
  {
    id: 5,
    licensePlateNumber: 'MNO345',
    phoneNumber: '12345678901',
    enteredAt: new Date(),
    exitedAt: new Date(),
    status: 'active',
  }
];

export default function ParkingSessionsGrid() {
  return (
    <Box sx={{ height: 400, width: '100%', marginTop: 10 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[20, 50, 100]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}