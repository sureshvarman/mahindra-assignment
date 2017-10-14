/**
 * User form to be used to get the username and typed password to back, depends on the type of form
 * @prop {String} icon
 * @prop {String} text
 */
import React from 'react';
import {FormGroup, FormControl, Row, Col, Grid, ControlLabel} from 'react-bootstrap';
import './Login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }

  formSubmit = (e) => {
    this.props.onSubmit();
    e.preventDefault();
    e.stopPropagation();
  }

  onEdit = (name, e) => {
    var form = {};
    form.username = this.props.username;
    form.password = this.props.password;

    form[name] = e.target.value;

    this.props.onEdit(form);
  }

  render () {
    return (
      <Grid>
        <Row className="show-grid">
          <Col sm={6} md={6}>
            <Row className="clearfix">
              <form>
                <FormGroup>
                  <ControlLabel>User name</ControlLabel>
                  <FormControl type="text" value={this.props.username} onChange={this.onEdit.bind(this, 'username')} />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Password</ControlLabel>
                  <FormControl type="password" value={this.props.password} onChange={this.onEdit.bind(this, 'password')} />
                </FormGroup>
                {this.props.isSingup ?
                  <FormGroup>
                    <ControlLabel>Password Confirmation</ControlLabel>
                    <FormControl type="password" value={this.props.passwordConfirmation} onChange={this.onEdit.bind(this, 'passwordConfirmation')} />
                  </FormGroup> : ''
                }
                <FormGroup>
                  <FormControl type="submit" value={this.props.isSingup ? "SignUp" : "SignIn"} onClick={this.formSubmit} />
                </FormGroup>
                <FormGroup>
                  <div className={this.props.err ? "err" : ""}>
                    {this.props.err}
                  </div>
                </FormGroup>
              </form>
            </Row>
          </Col>
        </Row>
      </Grid>
    )
  }
}

Login.propTypes = {
    isSingup: React.PropTypes.bool,
    username: React.PropTypes.string,
    password: React.PropTypes.string,
    passwordConfirmation: React.PropTypes.string
};

export default Login;
