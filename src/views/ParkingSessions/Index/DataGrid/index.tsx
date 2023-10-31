// libraries
import * as React from 'react';
import { Link } from  'react-router-dom'
// components
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { 
  DataGrid, 
  GridColDef, 
  GridActionsCellItem, 
  GridRowParams,
  GridToolbarContainer
} from '@mui/x-data-grid';
// utils
import { formatPhoneNumber } from '../../../../util/format';
// styles
import './index.css'

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
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Edit',
    getActions: (params: GridRowParams) => [
      <GridActionsCellItem icon={<EditIcon />} label="Edit" />,
    ]
  },
  {
    field: 'complete',
    type: 'actions',
    getActions: (params: GridRowParams) => {
      console.log(params.row.status)
      if (params.row.status === 'completed') return []
      return [
        <Button variant="text">Complete</Button>
      ]
    }
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

function EditToolbar() {

  return (
    <GridToolbarContainer>
      <Link to="/parking-sessions/create">
        <Button color="primary" startIcon={<AddIcon />}>
          Create Parking Session
        </Button>
      </Link>
    </GridToolbarContainer>
  );
}

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
        slots={{
          toolbar: EditToolbar,
        }}
      />
    </Box>
  );
}