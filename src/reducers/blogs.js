/**
* reducer for the blogs data
*/
import * as types from '../constants';
import { createReducer } from 'redux-create-reducer';

// Default values
const initialState = {
    blogs: [],
    limit: 10,
    offset: 0,
    err: '',
    view: {
      data: [],
      nextLimit: 1,
      nextOffset: 0,
      err: ''
  },
  form: {
      blogTitle: '',
      content: '',
      id: ''
  }
};

export default createReducer(initialState, {
    [types.ON_BLOGS_SUCCESS] (state, action) {
        let {response} = action.payload;
        let view = state.view;

        view.nextLimit = response.nextLimit;
        view.nextOffset = response.nextOffset;
        view.data = response.data;
        view.err = ''
        return {
            ...state,
            view: view
        }
    },
    [types.ON_BLOGS] (state, action) {
        return {
            ...state
        }
    },
    [types.ON_BLOGS_FAIL] (state, action) {
        return {
            ...state,
            err: 'Failed to display blogs' // #TODO changes needs to be done to suppor i8n
        }
    },
    [types.ON_GET_BLOG_SUCCESS] (state, action) {
        let form = state.form;
        let {content, blogTitle, id} = action.payload.response;
        form.content = content;
        form.blogTitle = blogTitle;
        form.id = id;

        return {
            ...state,
            form
        }
    },
    [types.ON_GET_BLOG_FAIL] (state, action) {
        let form = state.form;
        form.err = 'Failed to update / create record / not authorized';

        return {
            ...state,
            form
        }
    },
    [types.ON_BLOG_FORM_EDIT] (state, action) {
        let {blogTitle, content} = action.payload.form;
        let form = {
            ...state.form,
            blogTitle,
            content
        }
        return {
            ...state,
            form
        }
    },
    [types.ON_BLOG_CREATE_FAIL] (state, action) {
        let form = state.form;
        form.err = 'Failed to update / create record / not authorized';

        return {
            ...state,
            form
        }
    },
    [types.ON_BLOG_EDIT_FAIL] (state, action) {
        let form = state.form;
        form.err = 'Failed to update / create record / not authorized';

        return {
            ...state,
            form
        }
    },
    [types.ON_BLOG_EDIT_SUCCESS] (state, action) {
        let form = state.form;

        return {
            ...state,
            form: {
                blogTitle: '',
                content: '',
                id: ''
            }
        }
    },
    [types.ON_BLOG_CREATE_SUCCESS] (state, action) {
        let form = state.form;

        return {
            ...state,
            form: {
                blogTitle: '',
                content: '',
                id: ''
            }
        }
    }
});
