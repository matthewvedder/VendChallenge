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
import Alert from '@mui/material/Alert';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// database
import { database } from "../../../database"
import { query, where, getDocs, collection } from "firebase/firestore";
// utils
import { stripPhoneNumber, stripLicensePlate } from '../../../util/format';
import { 
  validatePhoneNumber, 
  validateLicensePlate, 
  validateEnterExit,
  validateStatus
} from '../../../util/validations/parking-sessions'
// styles
import './index.css'

interface ParkingSessionFormProps {
  onSubmit: (parkingSession: any) => void
}

export default function ParkingSessionForm(props: ParkingSessionFormProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate();
  // values
  const [licensePlateNumber, setLicensePlateNumber] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('') 
  const [enteredAt, setEnteredAt] = useState<Dayjs|null>(dayjs())
  const [exitedAt, setExitedAt] = useState<Dayjs|null>(null)
  const [status, setStatus] = useState<string>('active')
  // errors
  const [activeSessionsError, setActiveSessionsError] = useState<string|null>(null)
  const [licensePlateError, setLicensePlateError] = useState<string|null>(null)
  const [phoneNumberError, setPhoneNumberError] = useState<string|null>(null)
  const [enterExitError, setEnterExitError] = useState<string|null>(null)
  const [statusError, setStatusError] = useState<string|null>(null)

  const handleExitChange = (newValue: Dayjs | null) => {
    setExitedAt(newValue)
    setEnterExitError(validateEnterExit(enteredAt!, newValue!))
    setStatusError(validateStatus(status as 'active' | 'completed', newValue!))
  }

  const handleStatusChange = (newValue: string) => {
    setStatus(newValue)
    setStatusError(validateStatus(newValue as 'active' | 'completed', exitedAt))
  }


  const getActiveByPlate = () => {
    // return error message if license plate number already has an active session
    const parkingSessionsRef = collection(database, "parking-sessions");
    const sessionsQuery = query(
      parkingSessionsRef, 
      where("licensePlateNumber", "==", stripLicensePlate(licensePlateNumber.toUpperCase())), 
      where("status", "==", "active")
    )
    
    return getDocs(sessionsQuery)
  }

  const checkActiveSessions = async () => {
    const querySnapshot = await getActiveByPlate()
    if (!querySnapshot.empty) {
      return 'There is already an active parking session for this license plate number'
    }
    return null
  }


  const validateAll = async () => {
    setLoading(true)
    const activeSessionsError = await checkActiveSessions()
    const licensePlateError = validateLicensePlate(licensePlateNumber)
    const phoneNumberError = validatePhoneNumber(phoneNumber)
    const enterExitError = validateEnterExit(enteredAt!, exitedAt!)
    const statusError = validateStatus(status as 'active' | 'completed', exitedAt)
    
    if (activeSessionsError || licensePlateError || phoneNumberError || enterExitError || statusError ) {
      setActiveSessionsError(activeSessionsError)
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const formIsValid = await validateAll()
    if (!formIsValid) return

    props.onSubmit({
      licensePlateNumber: stripLicensePlate(licensePlateNumber.toUpperCase()),
      phoneNumber: stripPhoneNumber(phoneNumber),
      enteredAt: enteredAt!.unix(),
      exitedAt: exitedAt ? exitedAt!.unix() : null,
      status: status.toLowerCase(),
      createdAt: dayjs().unix()
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

      {activeSessionsError && <Alert severity="error">{activeSessionsError}</Alert>}
      
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
