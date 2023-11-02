import parsePhoneNumber from 'libphonenumber-js'
import { Dayjs } from 'dayjs';

// validations return null if valid or an error message if invalid

export const validatePhoneNumber = (phoneNumber: string) => {
  if (phoneNumber.trim().length === 0) return null
  const parsedNumber = parsePhoneNumber(phoneNumber, 'US')
  let valid = false
  if (parsedNumber) valid = parsedNumber.isPossible()
  if (valid) return null
  return 'Phone number must contain 10 digits'
}

export const validateLicensePlate = (licensePlateNumber: string) => {
  const regex = /^[a-zA-Z0-9-\s]*$/
  if (!regex.test(licensePlateNumber)) return 'License plate number must consist of letters, numbers, dashes, or spaces'
  return null
}


export const validateEnterExit = (enteredAt: Dayjs, exitedAt: Dayjs) => {
  if (!exitedAt || !enteredAt) return null
  if (exitedAt.isBefore(enteredAt)) return 'Exited at must be after entered at'
  return null
}

export const validateStatus = (status: 'active' | 'completed', exitedAt: Dayjs|null) => {
  if (status === 'completed' && !exitedAt) return 'Exited at must be set in order to complete parking session'
  return null
}