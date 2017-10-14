/**
* Core layout component defines the children components
* @prop {ReactElement} children
*/
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/auth.js';
import Header from '../../components/Header';
import './CoreLayout.scss';

class CoreLayout extends React.Component {
    static propTypes = {
        children : React.PropTypes.element
    }

    constructor (props) {
        super(props);
        const { dispatch } = this.props;
        this.actions = bindActionCreators(authActions, dispatch);

        var socket = io('http://localhost:3000');
        socket.on('newBlog', function (data) {
            console.log(data);
        });
    }

    render () {
        return (
            <div className='app-container'>
            <Header isLoggedIn={this.props.auth.token() ? true : false} onLogout={this.actions.logout}/>
            <div className='view-port'>
            {this.props.children}
            </div>
            </div>
        );
    }
}


/**
* function to map state information to component
* will be a callback
* @param {state} Object
* @return {Object}
*/
function mapStateToProps(state) {
    const { auth } = state;
    return {
        auth
    };
}

CoreLayout.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    auth: React.PropTypes.object
};

export default connect(mapStateToProps)(CoreLayout);
