import * as types from '../constants';
import api from '../api';

/**
 * function to get login to get the token
 * @param {Object.username} form.username - typed username
 * @param {Object.password} form.password - typed password
 */
export function login(form) {
  return {
    types: [types.ON_LOGIN, types.ON_LOGIN_SUCCESS, types.ON_LOGIN_FAIL],
    payload: {
      response: api.login(form)
    }
  }
}

/**
 * function to edit the login details
 * @param {Object.username} form.username - typed username
 * @param {Object.password} form.password - typed password
 */
export function onEdit(form) {
  return {
    type: types.ON_LOGIN_FORM_TYPE,
    payload: {
      ...form
    }
  }
}

/**
 * function to redirect to the bookmark page, if signed in
 */
export function redirectToBookmark() {
  return {
    type: types.REDIRECT,
    meta: {
      transition: () => ({
        path : '/blogs'
      })
    }
  }
}

/**
 * function to logout
 */
export function logout() {
  return {
    type: types.LOGOUT,
    meta: {
      transition: () => ({
        path : '/'
      })
    }
  }
}
