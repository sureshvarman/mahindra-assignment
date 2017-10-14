/**
 * Header component to take care of the header part of the application to display
 * the user information and application
 */
import React from 'react';
import {Navbar, Nav, MenuItem, NavItem, NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router';
import './Header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }

  onSubmit = (e) => {
    this.props.onSubmit();
    e.preventDefault();
    e.stopPropagation();
  }

  onEdit = (name, e) => {
    var form = {};
    form.name = this.props.name;
    form.url = this.props.url;
    form.tags = this.props.tags;

    form[name] = e.target.value;

    this.props.onEdit(form);
  }

  onLogout = (e) => {
    this.props.onLogout();
    e.preventDefault();
    e.stopPropagation();
  }

  render () {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Tech Blog</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {
              this.props.isLoggedIn ?
              <Nav pullRight>
                <Link to='/blogs/create'>Create Blog</Link>
                <NavItem eventKey={1} onClick={this.onLogout}>Logout</NavItem>
                {/*<NavItem eventKey={1}><Link to='/search'>Search Bookmarks</Link></NavItem>*/}
              </Nav>
              :
              <NavItem className="cs-link" eventKey={1}><Link to='/signup'>SignUp</Link></NavItem>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

Header.propTypes = {
    isLoggedIn: React.PropTypes.bool,
    username: React.PropTypes.string,
    onLogout: React.PropTypes.func
};

export default Header;
