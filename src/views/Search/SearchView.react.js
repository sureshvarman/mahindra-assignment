/**
 * BookMark view - which renders the initial page after the app loads
 * @prop {Object} map
 * @prop {Object} dispatch
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {FormGroup, FormControl, Row, Col, Grid, ControlLabel} from 'react-bootstrap';
import * as bookMarkActions from '../../actions/bookmark.js';
import './SearchView.scss';

class SearchView extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.actions = bindActionCreators(bookMarkActions, dispatch);

    this.state = {
      searchStr: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }

  onChange = (e) => {
    this.setState({
      ...this.state,
      searchStr: e.target.value
    })
  }

  onSearch = (e) => {
    this.actions.search(this.state.searchStr.split(/[\s,]+/),
      this.props.bookmark.search.nextLimit,
      this.props.bookmark.search.nextOffset,
      this.props.auth.token());

    e.preventDefault();
    e.stopPropagation();
  }

  renderSearchResult = () => {
    if (this.props.bookmark.search.err)
      return (
        <div className="err">{this.props.bookmark.search.err}</div>
      );
    let resultComp = [];
    let data = this.props.bookmark.search.data;
    for (var r = 0; r < data.length; r++) {
      resultComp.push(
        <div className="search-item">
          {data[r].name}
          <br />
          {data[r].url}
          <br />
          {data[r].tags.join(',')}
        </div>
      )
    }
    let next = '';
    if (this.props.bookmark.search.nextOffset) {
      next = (<div className="next" onClick={this.onSearch}>Next</div>)
    }
    resultComp.push(next);
    return <div>
      {resultComp}
    </div>;
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col sm={6} md={6}>
            <Row className="clearfix">
              <form>
                <FormGroup>
                  <ControlLabel>Search Tags</ControlLabel>
                  <FormControl type="text" onChange={this.onChange} value={this.state.searchStr} />
                </FormGroup>
                <FormControl type="submit" value="Search" onClick={this.onSearch} />
              </form>
              {this.renderSearchResult()}
            </Row>
          </Col>
        </Row>
      </Grid>
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
    const { bookmark, auth } = state;
    return {
      bookmark,
      auth
    };
}

SearchView.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    bookmark: React.PropTypes.object
};

export default connect(mapStateToProps)(SearchView);
