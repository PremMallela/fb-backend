export function isValidMobileNumber(mobileNumber) {
    const mobileRegex = /^[0-9]{10}$/;
    return typeof mobileNumber === 'string' && mobileRegex.test(mobileNumber);
}

export function isValidName(name) {
    return typeof name === 'string' && name.trim().length > 0;
}