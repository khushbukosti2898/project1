export default loginReducer(state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, email: action.payload.email, password:action.payload.password };
    default:
      return state;
  }
};