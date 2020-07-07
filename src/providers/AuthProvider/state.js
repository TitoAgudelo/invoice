export const types = {
  SIGNIN_REQ: 'SIGNIN_REQ',
  SIGNIN_SUCCESS: 'SIGNIN_SUCCESS',
  SIGNIN_FAILED: 'SIGNIN_FAILED',

  SIGNOUT_REQ: 'SIGNOUT_REQ',
  SIGNOUT_SUCCESS: 'SIGNOUT_SUCCESS',
  SIGNOUT_FAILED: 'SIGNOUT_FAILED',

  SET_USER: 'SET_USER',

  IS_NOT_LOGGED_IN: 'IS_NOT_LOGGED_IN',
};

export const userReducer = (state, action) => {
  return action.type === types.SIGNIN_REQ
    ? { ...state, isLoading: true }
    : action.type === types.SIGNIN_SUCCESS
    ? { ...state, isLoading: false, isLoggedIn: true }
    : action.type === types.SIGNIN_FAILED
    ? { ...state, isLoading: false, error: action.payload }
    : action.type === types.SET_USER
    ? { ...state, user: action.payload, isLoggedIn: true }
    : action.type === types.IS_NOT_LOGGED_IN
    ? { ...state, isLoggedIn: false }
    : state;
};

export const initialState = {
  isLoggedIn: false,
  user: false,
  error: null,
  isLoading: false,
};
