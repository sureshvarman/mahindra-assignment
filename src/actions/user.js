import * as types from '../constants';
import api from '../api';

/**
 * function to get login to get the token
 * @param {Object.username} form.username - typed username
 * @param {Object.password} form.password - typed password
 * @param {Object.passwordConfirmation} form.passwordConfirmation - typed passwordConfirmation
 */
export function signup(form) {
  return {
    types: [types.ON_SIGNUP, types.ON_SIGNUP_SUCCESS, types.ON_SIGNUP_FAIL],
    payload: {
      response: api.signup(form)
    },
    meta: {
      transition: (state, action) => ({
        onSuccess: (successdata) => {
          return {
            path : '/'
          }
        }
      })
    }
  }
}

/**
 * function to edit the login details
 * @param {Object.username} form.username - typed username
 * @param {Object.password} form.password - typed password
 * @param {Object.passwordConfirmation} form.passwordConfirmation - typed passwordConfirmation
 */
export function onEdit(form) {
  return {
    type: types.ON_SIGNUP_FORM_TYPE,
    payload: {
      ...form
    }
  }
}
