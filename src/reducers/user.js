/**
 * reducer for the user data
 */
import * as types from '../constants';
import { createReducer } from 'redux-create-reducer';

// Default values
const initialState = {
  username: '',
  password: '',
  passwordConfirmation: '',
  err: ''
};

export default createReducer(initialState, {
  [types.ON_SIGNUP_FORM_TYPE] (state, action) {
    let {username, password, passwordConfirmation} = action.payload;
    return {
      ...state,
      username,
      password,
      passwordConfirmation
    }
  },
  [types.ON_SIGNUP] (state, action) {
    return {
      ...state
    };
  },
  [types.ON_SIGNUP_SUCCESS] (state, action) {
    return {
      ...state
    };
  },
  [types.ON_SIGNUP_FAIL] (state, action) {
    let {response} = action.payload;

    return {
      ...state,
      err: 'Oops! Something went wrong'
    };
  }
});
