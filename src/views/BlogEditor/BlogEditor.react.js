/**
 * BookMark view - which renders the initial page after the app loads
 * @prop {Object} map
 * @prop {Object} dispatch
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as blogActions from '../../actions/blogs.js';
import BlogEditorForm from '../../components/BlogEditor';

class BlogEditor extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.actions = bindActionCreators(blogActions, dispatch);
  }

  componentDidMount() {
      if (this.props.params.id)
        this.actions.getById(this.props.params.id, this.props.auth.token());
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }

  onEdit = (name, value) => {
      let form = this.props.blogs.form;
      form[name] = value;
      this.actions.onEdit(form);
  }

  onSubmit = () => {
      let data = {
          blogTitle: this.props.blogs.form.blogTitle,
          content: this.props.blogs.form.content
      }
      if (this.props.blogs.form.id) {
          this.actions.onEditSubmit(this.props.blogs.form.id, data, this.props.auth.token());
      } else {
          this.actions.onSubmit(data, this.props.auth.token());
      }
  }

  render() {
    return (
      <BlogEditorForm
      id={this.props.blogs.form.id}
      blogTitle={this.props.blogs.form.blogTitle}
      content={this.props.blogs.form.content}
      err={this.props.blogs.form.err}
      onEdit={this.onEdit}
      onSubmit={this.onSubmit}
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
    const { blogs, auth } = state;
    return {
      blogs,
      auth
    };
}

BlogEditor.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    blogs: React.PropTypes.object
};

export default connect(mapStateToProps)(BlogEditor);
