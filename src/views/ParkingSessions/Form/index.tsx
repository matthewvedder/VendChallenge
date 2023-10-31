// libraries
import * as React from 'react'
import dayjs from 'dayjs';
// components
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// styles
import './index.css'



export default function ParkingSessionForm() {
  return (
    <div className='parking-session-form'>
      <TextField 
        id="standard-basic" 
        label="License Plate Number" 
        required
      />

      <TextField 
        id="standard-basic" 
        label="Phone Number" 
        required
      />
      
      <DateTimePicker
        label="Entered At *"
        defaultValue={dayjs()}
      />

      <DateTimePicker
        label="Exited At *"
      />

      <FormControl>
        <InputLabel>Status</InputLabel>
        <Select label="Status" defaultValue='active'>
          <MenuItem value={'active'}>Active</MenuItem>
          <MenuItem value={'completed'}>Completed</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
