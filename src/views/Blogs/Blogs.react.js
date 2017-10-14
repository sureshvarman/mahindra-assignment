/**
 * BookMark view - which renders the initial page after the app loads
 * @prop {Object} map
 * @prop {Object} dispatch
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as blogActions from '../../actions/blogs.js';
import Blog from '../../components/Blog';
import './Blogs.scss';

class BlogsView extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.actions = bindActionCreators(blogActions, dispatch);
  }

  componentDidMount() {
      this.actions.get(this.props.limit, this.props.offset);
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }

  renderBlog = () => {
      let blogList = [];
      for (let i = 0; i < this.props.blogs.view.data.length; i++) {
          blogList.push(<Blog
              key={this.props.blogs.view.data[i].id}
              id={this.props.blogs.view.data[i].id}
              title={this.props.blogs.view.data[i].blogTitle}
              content={this.props.blogs.view.data[i].content}
              createdBy={this.props.blogs.view.data[i].createdBy}
              userId={this.props.auth.user()}
              />
          )
      }

      return <div>{blogList}</div>;
  }

  render() {
    return (
      this.renderBlog()
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
    const { blogs, auth } = state;
    return {
      blogs,
      auth
    };
}

BlogsView.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    blogs: React.PropTypes.object
};

export default connect(mapStateToProps)(BlogsView);
