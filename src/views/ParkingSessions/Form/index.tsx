// libraries
import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom'
// components
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// utils
import { stripPhoneNumber } from '../../../util/format';
import { 
  validatePhoneNumber, 
  validateLicensePlate, 
  validateEnterExit,
  validateStatus
} from '../../../util/validations/parking-sessions'
// styles
import './index.css'


export default function ParkingSessionForm(props: { onSubmit: (parkingSession: any) => void }) {
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate();
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
  const [statusError, setStatusError] = React.useState<string|null>(null)

  const handleExitChange = (newValue: Dayjs | null) => {
    setExitedAt(newValue)
    setEnterExitError(validateEnterExit(enteredAt!, newValue!))
    setStatusError(validateStatus(status as 'active' | 'completed', newValue!))
  }

  const handleStatusChange = (newValue: string) => {
    setStatus(newValue)
    setStatusError(validateStatus(newValue as 'active' | 'completed', exitedAt))
  }

  

  const validateAll = () => {
    setLoading(true)
    const licensePlateError = validateLicensePlate(licensePlateNumber)
    const phoneNumberError = validatePhoneNumber(phoneNumber)
    const enterExitError = validateEnterExit(enteredAt!, exitedAt!)
    const statusError = validateStatus(status as 'active' | 'completed', exitedAt)
    
    if (licensePlateError || phoneNumberError || enterExitError || statusError ) {
      setLicensePlateError(licensePlateError)
      setPhoneNumberError(phoneNumberError)
      setEnterExitError(enterExitError)
      setStatusError(statusError)
      setLoading(false)
      return false
    }

    setLoading(false)
    return true
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!validateAll()) return

    props.onSubmit({
      licensePlateNumber: licensePlateNumber.toUpperCase(),
      phoneNumber: stripPhoneNumber(phoneNumber),
      enteredAt: enteredAt!.unix(),
      exitedAt: exitedAt ? exitedAt!.unix() : null,
      status: status.toLowerCase()
    })
  }


  return (
    <form className='parking-session-form' onSubmit={(event: React.FormEvent) => handleSubmit(event)}>
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
        label="Entered At"
        value={enteredAt}
        onChange={(value) => { setEnteredAt(value) }}
        timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
        views={['day', 'hours', 'minutes', 'month', 'seconds', 'year']}
        slotProps={{
          textField: {
            required: true,
          },
        }}
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
            helperText: enterExitError
          },
        }}
      />

      <FormControl error={!!statusError}>
        <InputLabel>Status</InputLabel>
        <Select 
          label="Status"
          value={status}
          onChange={(event: SelectChangeEvent) => handleStatusChange(event.target.value)}
        >
          <MenuItem value={'active'}>Active</MenuItem>
          <MenuItem value={'completed'}>Completed</MenuItem>
        </Select>
        <FormHelperText>{statusError}</FormHelperText>
      </FormControl>
      <LoadingButton variant="contained" type='submit' loading={loading}>
        Create
      </LoadingButton>
      <Button 
        variant="outlined" 
        onClick={() => navigate('/')}
      >
        Cancel
      </Button>
    </form>
  );
}
