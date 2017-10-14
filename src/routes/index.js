/**
 * Defines route in application and corresponding components
 */
import { Route }   from 'react-router';
import React       from 'react';
import CoreLayout  from 'layouts/CoreLayout';
import HomeView    from 'views/Home/HomeView.react';
import SignupView    from 'views/Signup/SignupView.react';
import BlogView    from 'views/Blogs/Blogs.react';
import BlogEditor    from 'views/BlogEditor/BlogEditor.react';

export default (
    <Route component={CoreLayout}>
        <Route name='home' path='/' component={HomeView} />
        <Route name='signup' path='/signup' component={SignupView} />
        <Route name='blogs' path='/blogs' component={BlogView} />
        <Route name='blogeditor' path='/blogs/edit/:id' component={BlogEditor} />
        <Route name='blogeditor' path='/blogs/create' component={BlogEditor} />
    </Route>
);
