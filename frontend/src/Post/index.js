import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPost } from 'state/modules/posts';
import getUrlParam from 'helpers/url/getUrlParam';

class App extends Component {
  componentDidMount() {
    const { posts, getPost, match } = this.props;
    const postId = getUrlParam(match, 'id');
    const post = posts[`${postId}`];
    if (!post) getPost(postId);
  }

  render() {
    const { posts, match } = this.props;
    const post = posts[`${getUrlParam(match, 'id')}`];
    return (
      <>
        {post ? (
          <>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
          </>
        ) : (
          <h1>LOADING</h1>
        )}
      </>
    )
  };
}

App.propTypes = {
  posts: PropTypes.object,
};

App.defaultProps = {
  posts: {},
};

const mapStateToProps = (state) => ({
  posts: state.posts.entities,
});

const mapDispatchToProps = { getPost };

export default connect(mapStateToProps, mapDispatchToProps)(App);
