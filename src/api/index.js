/**
* list of api function which will return the promise
* for simplicity splitted into two different function, incase itwill be same function
* with different query parameters
*/
import request from 'request-promise';

const utils = {
    /**
    * function to handle the call to get the city lists
    * @param {Object.username} form.username
    * @param {Object.password} form.password
    * @return {Promise}
    */
    login: (form) => {
        return request({
            url: `http://localhost:3000/api/auth/login`,
            method: 'post',
            json: true,
            body: form
        });
    },
    /**
    * function to handle the call to get the city lists
    * @param {Object.username} form.username
    * @param {Object.password} form.password
    * @return {Promise}
    */
    signup: (form) => {
        return request({
            url: `http://localhost:3000/api/user`,
            method: 'post',
            json: true,
            body: form
        });
    },
    /**
    * function to get login to get the token
    * @param {BookMark.name} bookmark.name - name
    * @param {BookMark.url} bookmark.url - url
    * @param {BookMark.tags} bookmark.tags - tags
    * @param {String} token - valid user token
    * @return {Promise}
    */
    addBookmark: (bookmark, token) => {
        console.log('===>', bookmark)
        return request({
            url: `http://localhost:3000/api/bookmark`,
            method: 'post',
            headers: {
                'x-access-token': token
            },
            json: true,
            body: bookmark
        });
    },

    /**
    * function to get login to get the token
    * @param {String} tags - types tag
    * @param {Number} limit - types limit
    * @param {Number} offset - types offset
    * @param {String} token - valid user token
    * @return {Promise}
    */
    searchBookmark: (tags, limit, offset, token) => {
        return request({
            url: `http://localhost:3000/api/bookmark`,
            method: 'get',
            headers: {
                'x-access-token': token
            },
            json: true,
            qs: {
                tags: tags,
                offset: offset,
                limit: limit
            }
        });
    },

    /**
    * function to get all the blogs
    * @param {Number} limit
    * @param {Number} offset
    */
    getBlogs: (limit, offset) => {
        return request({
            url: `http://localhost:3000/api/blog`,
            method: 'get',
            json: true,
            qs: {
                offset: offset,
                limit: limit
            }
        })
    },

    /**
    * function to get blog by its id
    * @param {Number} id
    * @param {String} token - valid user token
    * @return {Promise}
    */
    getBlogById: (id, token) => {
        return request({
            url: `http://localhost:3000/api/blog/${id}`,
            method: 'get',
            json: true,
            headers: {
                'x-access-token': token
            }
        })
    },

    /**
    * function to create a blog
    * @param {Object} form
    * @param {String} token - valid user token
    * @return {Promise}
    */
    createBlog: (form, token) => {
        return request({
            url: `http://localhost:3000/api/blog/`,
            method: 'post',
            body: form,
            json: true,
            headers: {
                'x-access-token': token
            }
        })
    },

    /**
    * function to update a blog
    * @param {Number} id
    * @param {Object} form
    * @param {String} token - valid user token
    * @return {Promise}
    */
    updateBlog: (id, form, token) => {
        return request({
            url: `http://localhost:3000/api/blog/${id}`,
            method: 'put',
            body: form,
            json: true,
            headers: {
                'x-access-token': token
            }
        })
    }
}
export default utils;
