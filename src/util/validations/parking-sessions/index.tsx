import parsePhoneNumber from 'libphonenumber-js'
import { Dayjs } from 'dayjs';

export const validatePhoneNumber = (phoneNumber: string) => {
  // returns null if valid or an error message if invalid
  const parsedNumber = parsePhoneNumber(phoneNumber, 'US')
  let valid = false
  if (parsedNumber) valid = parsedNumber.isPossible()
  if (valid) return null
  return 'Invalid phone number length'
}

export const validateLicensePlate = (licensePlateNumber: string) => {
  // returns null if valid or an error message if invalid
  const regex = /^[a-zA-Z0-9-\s]*$/
  if (!regex.test(licensePlateNumber)) return 'License plate number must be letters, numbers, dashes, or spaces'
  return null
}


export const validateEnterExit = (enteredAt: Dayjs, exitedAt: Dayjs) => {
  // returns null if valid or an error message if invalid
  if (exitedAt.isBefore(enteredAt)) return 'Exited at must be after entered at'
  return null
}