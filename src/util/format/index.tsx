import parsePhoneNumber from 'libphonenumber-js'

export const formatPhoneNumber = (phoneNumber: string) => {
  const parsedNumber = parsePhoneNumber(phoneNumber, 'US')
  if (parsedNumber) {
    return parsedNumber.formatNational()
  } else {
    return phoneNumber
  }
}

export const stripPhoneNumber = (phoneNumber: string) => {
  if (!(typeof phoneNumber === 'string')) return phoneNumber
  return phoneNumber.replace(/\D/g,'')
}

export const stripLicensePlate = (licensePlateNumber: string) => {
  if (!(typeof licensePlateNumber === 'string')) return licensePlateNumber
  return licensePlateNumber.replace(/[^a-z0-9]/gi, '')
}
