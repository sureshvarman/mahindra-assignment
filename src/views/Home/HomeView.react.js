/**
 * Home view - which renders the initial page after the app loads
 * @prop {Object} map
 * @prop {Object} dispatch
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/auth.js';
import Login from '../../components/Login';
import './HomeView.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.actions = bindActionCreators(authActions, dispatch);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.token()) {
      this.actions.redirectToBookmark();
    }
    this.props = nextProps;
  }

  renderMainView = () => {
    return (
      <Login
       username={this.props.auth.username}
       password={this.props.auth.password}
       err={this.props.auth.err}
       onEdit={(result) => {this.actions.onEdit(result)}}
       onSubmit={() => {this.actions.login( {username: this.props.auth.username, password: this.props.auth.password} )}}
      />
    )
  }

  render() {
    return this.renderMainView()
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

Home.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    auth: React.PropTypes.object
};

export default connect(mapStateToProps)(Home);
