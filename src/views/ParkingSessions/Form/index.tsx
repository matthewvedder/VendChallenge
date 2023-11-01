// libraries
import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs';
// components
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// utils
import { validatePhoneNumber, validateLicensePlate, validateEnterExit } from '../../../util/validations/parking-sessions'
// styles
import './index.css'


export default function ParkingSessionForm() {
  // values
  const [licensePlateNumber, setLicensePlateNumber] = React.useState<string>('')
  const [phoneNumber, setPhoneNumber] = React.useState<string>('') 
  const [enteredAt, setEnteredAt] = React.useState<Dayjs|null>(dayjs())
  const [exitedAt, setExitedAt] = React.useState<Dayjs|null>(null)
  const [status, setStatus] = React.useState<string>('active')
  // errors
  const [licensePlateError, setLicensePlateError] = React.useState<string|null>(null)
  const [phoneNumberError, setPhoneNumberError] = React.useState<string|null>(null)
  const [enterExitError, setEnterExitError] = React.useState<string|null>(null)

  const handleExitChange = (newValue: Dayjs | null) => {
    setExitedAt(newValue)
    setEnterExitError(validateEnterExit(enteredAt!, newValue!))
  }

  return (
    <div className='parking-session-form'>
      <TextField 
        label="License Plate Number" 
        required
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setLicensePlateNumber(event.target.value);
        }}
        value={licensePlateNumber}
        onBlur={() => { setLicensePlateError(validateLicensePlate(licensePlateNumber)) }}
        error={!!licensePlateError}
        helperText={licensePlateError}
      />

      <TextField 
        label="Phone Number" 
        required
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPhoneNumber(event.target.value);
        }}
        value={phoneNumber}
        onBlur={() => { setPhoneNumberError(validatePhoneNumber(phoneNumber)) }}
        error={!!phoneNumberError}
        helperText={phoneNumberError}
      />
      
      <DateTimePicker
        label="Entered At *"
        value={enteredAt}
        onChange={(value) => { setEnteredAt(value) }}
        timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
        views={['day', 'hours', 'minutes', 'month', 'seconds', 'year']}
      />

      <DateTimePicker
        label="Exited At"
        value={exitedAt}
        onChange={(value) => { handleExitChange(value) }}
        timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
        views={['day', 'hours', 'minutes', 'month', 'seconds', 'year']}
        slotProps={{
          textField: {
            error: !!enterExitError,
            helperText: enterExitError,
          },
        }}
      />

      <FormControl>
        <InputLabel>Status</InputLabel>
        <Select label="Status" defaultValue='active'>
          <MenuItem value={'active'}>Active</MenuItem>
          <MenuItem value={'completed'}>Completed</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained">Create</Button>
    </div>
  );
}
