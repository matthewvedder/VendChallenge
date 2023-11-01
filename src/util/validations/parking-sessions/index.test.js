import { 
  validatePhoneNumber, 
  validateLicensePlate, 
  validateEnterExit,
  validateStatus
} from './index'
import dayjs from 'dayjs'

test('validatePhoneNumber valid', () => {
  let validation = validatePhoneNumber('788-867-5309')
  expect(validation).toBe(null)
})

test('validatePhoneNumber invalid', () => {
  let validation = validatePhoneNumber('8-5309')
  expect(validation).toBe('Phone number must contain 10 digits')
})

test('validatePhoneNumber valid', () => {
  let validation = validateLicensePlate('1AGE123')
  expect(validation).toBe(null)

  validation = validateLicensePlate('1AGE 123')
  expect(validation).toBe(null)

  validation = validateLicensePlate('1AGE-123')
  expect(validation).toBe(null)
})

test('validatePhoneNumber invalid', () => {
  const errorMessage = 'License plate number must consist of letters, numbers, dashes, or spaces'
  let validation = validateLicensePlate('$$AGE123')
  expect(validation).toBe(errorMessage)

  validation = validateLicensePlate('1AGE_123')
  expect(validation).toBe(errorMessage)

  validation = validateLicensePlate('@GE123')
  expect(validation).toBe(errorMessage)
})

test('validateEnterExit valid', () => {
  const enteredAt = dayjs().subtract(7, 'hours')
  const exitedAt = dayjs()

  const validation = validateEnterExit(enteredAt, exitedAt)
  expect(validation).toBe(null)
})

test('validateEnterExit invalid', () => {
  const enteredAt = dayjs()
  const exitedAt = dayjs().subtract(7, 'hours')

  const validation = validateEnterExit(enteredAt, exitedAt)
  expect(validation).toBe('Exited at must be after entered at')
})

test('validateStatus valid', () => {
  let validation = validateStatus('completed', dayjs())
  expect(validation).toBe(null)

  validation = validateStatus('active', null)
  expect(validation).toBe(null)
})

test('validateStatus invalid', () => {
  let validation = validateStatus('completed', null)
  expect(validation).toBe('Exited at must be set in order to complete parking session')
})