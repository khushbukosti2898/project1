export const getPhoneFormat = (value) => {
    const input = value.replace(/\D/g, '').substring(0, 10);

    // Divide numbers in 3 parts :"(123) 456-7890" 
    const first = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 10);

    if (input.length > 6) {
        return `(${first}) ${middle}-${last}` 
    }
    else if (input.length > 3) {
        return `(${first}) ${middle}` 
    }
    else if (input.length >= 0) {
        return input
    }
}

/* 
export const getPostalFormat = (value) => {
    return value.toUpperCase()
} */