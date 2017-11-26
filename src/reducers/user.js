const initialState = {
  token: null,
  isAuthenticated: false,
  info: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case '':
      break;
    default:
      return state;
  }
};
