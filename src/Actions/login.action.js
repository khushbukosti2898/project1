export const LoginAction = data => ({ type: 'LOGIN', payload: {
    email:data.email,
    password:data.password
} });
