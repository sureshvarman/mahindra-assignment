import * as types from '../constants';
import api from '../api';

export function get(limit, offset) {
  return {
    types: [types.ON_BLOGS, types.ON_BLOGS_SUCCESS, types.ON_BLOGS_FAIL],
    payload: {
      response: api.getBlogs(limit, offset)
    }
  }
}

export function getById(id, token) {
    return {
        types: [types.ON_GET_BLOG, types.ON_GET_BLOG_SUCCESS, types.ON_GET_BLOG_FAIL],
        payload: {
            response: api.getBlogById(id, token)
        }
    }
}

export function onEdit(formdata) {
    return {
        type: [types.ON_BLOG_FORM_EDIT],
        payload: {
            form: formdata
        }
    }
}

export function onEditSubmit(id, form, token) {
    return {
        types: [types.ON_BLOG_EDIT, types.ON_BLOG_EDIT_SUCCESS, types.ON_BLOG_EDIT_FAIL],
        payload: {
            form: api.updateBlog(id, form, token)
        },
        meta: {
            transition: (state, action) => ({
                onSuccess: (successdata) => ({
                    path: '/blogs'
                }),
            })
        }
    }
}

export function onSubmit(form, token) {
    return {
        types: [types.ON_BLOG_EDIT, types.ON_BLOG_EDIT_SUCCESS, types.ON_BLOG_EDIT_FAIL],
        payload: {
            form: api.createBlog(form, token)
        },
        meta: {
            transition: (state, action) => ({
                onSuccess: (successdata) => ({
                    path: '/blogs'
                }),
            })
        }
    }
}
