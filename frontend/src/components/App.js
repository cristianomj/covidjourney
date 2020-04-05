import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPost } from '../../state/modules/posts';

class App extends Component {
  componentDidMount() {
    const { getPost } = this.props;
    getPost(1);
  }

  render() {
    const { post } = this.props;
    return <h1>{post.title}</h1>
  };
}

App.propTypes = {
  post: PropTypes.object,
};

App.defaultProps = {
  post: {},
};

const mapStateToProps = (state) => ({
  post: state.posts.entities['1'],
});

const mapDispatchToProps = { getPost };

export default connect(mapStateToProps, mapDispatchToProps)(App);
