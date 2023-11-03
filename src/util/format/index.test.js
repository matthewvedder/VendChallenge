import { ECDH } from 'crypto'
import { formatPhoneNumber, stripPhoneNumber, stripLicensePlate } from './index'

test('format phone number valid', () => {
    let formattedPhoneNumber = formatPhoneNumber('6178675309')
    expect(formattedPhoneNumber).toBe('(617) 867-5309')

    formattedPhoneNumber = formatPhoneNumber('(617) 867-5309')
    expect(formattedPhoneNumber).toBe('(617) 867-5309')

    formattedPhoneNumber = formatPhoneNumber('(617) 867 5309')
    expect(formattedPhoneNumber).toBe('(617) 867-5309')

    formattedPhoneNumber = formatPhoneNumber('(617)8675309')
    expect(formattedPhoneNumber).toBe('(617) 867-5309')

    formattedPhoneNumber = formatPhoneNumber('617-867-5309')
    expect(formattedPhoneNumber).toBe('(617) 867-5309')

    formattedPhoneNumber = formatPhoneNumber('617 867 5309')
    expect(formattedPhoneNumber).toBe('(617) 867-5309')

    formattedPhoneNumber = formatPhoneNumber('1 617 867 5309')
    expect(formattedPhoneNumber).toBe('(617) 867-5309')
})

test('format phone number invalid', () => {
    let formattedPhoneNumber = formatPhoneNumber('867-5309')
    expect(formattedPhoneNumber).toBe('8675309')

    formattedPhoneNumber = formatPhoneNumber('hello')
    expect(formattedPhoneNumber).toBe('hello')
})

test('strip phone number valid', () => {
  let strippedPhoneNumber = stripPhoneNumber('(617) 867-5309')
  expect(strippedPhoneNumber).toBe('6178675309')

  strippedPhoneNumber = stripPhoneNumber('(617) 867 5309')
  expect(strippedPhoneNumber).toBe('6178675309')

  strippedPhoneNumber = stripPhoneNumber('(617)8675309')
  expect(strippedPhoneNumber).toBe('6178675309')

  strippedPhoneNumber = stripPhoneNumber('617-867-5309')
  expect(strippedPhoneNumber).toBe('6178675309')
})

test('strip phone number invalid', () => { 
  let strippedPhoneNumber = stripPhoneNumber(null)
  expect(strippedPhoneNumber).toBe(null)

  strippedPhoneNumber = stripPhoneNumber(undefined)
  expect(strippedPhoneNumber).toBe(undefined)
})

test('strip license plate valid', () => {
  let strippedLicensePlate = stripLicensePlate('ABC123')
  expect(strippedLicensePlate).toBe('ABC123')

  strippedLicensePlate = stripLicensePlate('ABC 123')
  expect(strippedLicensePlate).toBe('ABC123')

  strippedLicensePlate = stripLicensePlate('ABC-123')
  expect(strippedLicensePlate).toBe('ABC123')

  strippedLicensePlate = stripLicensePlate('ABC- 123')
  expect(strippedLicensePlate).toBe('ABC123')

  strippedLicensePlate = stripLicensePlate('ABC_123')
  expect(strippedLicensePlate).toBe('ABC123')
})

test('strip license plate invalid', () => {
  let strippedLicensePlate = stripLicensePlate(null)
  expect(strippedLicensePlate).toBe(null)

  strippedLicensePlate = stripLicensePlate(undefined)
  expect(strippedLicensePlate).toBe(undefined)
})



