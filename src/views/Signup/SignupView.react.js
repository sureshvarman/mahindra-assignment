/**
 * Signup view - which renders the initial page after the app loads
 * @prop {Object} map
 * @prop {Object} dispatch
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/user.js';
import Login from '../../components/Login';
import './SignupView.scss';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.actions = bindActionCreators(userActions, dispatch);
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }

  render() {
    return (
      <Login
       isSingup={true}
       username={this.props.user.username}
       password={this.props.user.password}
       passwordConfirmation={this.props.user.passwordConfirmation}
       err={this.props.user.err}
       onEdit={(result) => {this.actions.onEdit(result)}}
       onSubmit={() => {this.actions.signup({
         username: this.props.user.username,
         password: this.props.user.password,
         passwordConfirmation: this.props.user.passwordConfirmation
       })}}
      />
    )
  }
}

/**
 * function to map state information to component
 * will be a callback
 * @param {state} Object
 * @return {Object}
 */
function mapStateToProps(state) {
    const { user } = state;
    return {
      user
    };
}

Signup.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    user: React.PropTypes.object
};

export default connect(mapStateToProps)(Signup);
