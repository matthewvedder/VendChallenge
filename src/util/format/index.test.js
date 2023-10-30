import { formatPhoneNumber } from './index'

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


