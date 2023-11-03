// libraries
import * as React from 'react';
import { Link } from  'react-router-dom'
// components
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { 
  DataGrid, 
  GridColDef, 
  GridActionsCellItem, 
  GridRowParams,
  GridToolbarContainer
} from '@mui/x-data-grid';
// types
import { DocumentData } from "firebase/firestore";
// utils
import { formatPhoneNumber } from '../../../../util/format';
// styles
import './index.css'

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

interface ParkingSessionsGridProps {
  parkingSessions: DocumentData[],
  completeParkingSession: (sessionId: string) => void
}

export default function ParkingSessionsGridProps(props: ParkingSessionsGridProps) {

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
      field: 'complete',
      type: 'actions',
      width: 200,
      getActions: (params: GridRowParams) => {
        if (params.row.status === 'completed') return []
        return [
          <Button 
            variant="text"
            onClick={() => props.completeParkingSession(params.row.id as string)}
          >
            End Session
          </Button>
        ]
      }
    }
  ]
  
  return (
    <Box sx={{ height: '70vh', width: '100%', marginTop: 10 }}>
      <DataGrid
        rows={props.parkingSessions}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[20, 50, 100]}
        disableRowSelectionOnClick
        slots={{
          toolbar: EditToolbar,
        }}
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
             outline: "none !important",
          },
       }}
      />
    </Box>
  );
}