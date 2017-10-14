/**
 * reducer for the bookmark data
 */
import * as types from '../constants';
import { createReducer } from 'redux-create-reducer';

// Default values
const initialState = {
  name: '',
  url: '',
  tags: '',
  err: '',
  success: '',
  search: {
    data: [],
    nextLimit: 1,
    nextOffset: 0,
    err: ''
  }
};

export default createReducer(initialState, {
  [types.ON_BOOKMARK_EDIT] (state, action) {
    let {name, url, tags} = action.payload;
    return {
      ...state,
      name,
      url,
      tags,
      success: ''
    };
  },
  [types.ON_BOOKMARK] (state, action) {
    return {
      ...state,
      success: ''
    }
  },
  [types.ON_BOOKMARK_SUCCESS] (state, action) {
    let {response} = action.payload;
    return {
      ...state,
      name: '',
      url: '',
      tags: '',
      success: 'Record, created successfully'
    }
  },
  [types.ON_BOOKMARK_FAIL] (state, action) {

    return {
      ...state,
      err: 'Oops! something went wrong',
      success: ''
    }
  },
  [types.ON_BOOKMARK_SEARCH_SUCCESS] (state, action) {
    let {response} = action.payload;
    let search = state.search;

    search.nextLimit = response.meta.next.limit;
    search.nextOffset = response.meta.next.offset;
    search.data = response.data;
    search.err = ''
    return {
      ...state,
      search: search
    }
  },
  [types.ON_BOOKMARK_SEARCH_FAIL] (state, action) {
    return {
      ...state,
      err: 'Search failed'
    }
  }
});
