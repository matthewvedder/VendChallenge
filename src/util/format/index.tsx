import parsePhoneNumber from 'libphonenumber-js'

export const formatPhoneNumber = (phoneNumber: string) => {
  const parsedNumber = parsePhoneNumber(phoneNumber, 'US')
  if (parsedNumber) {
    return parsedNumber.formatNational()
  } else {
    return phoneNumber
  }
}

