import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getBlogPost,
  selectBlogPosts,
} from 'state/modules/blogPosts';
import getUrlParam from 'helpers/url/getUrlParam';

function BlogPost(props) {
  const [blogPost, setBlogPost] = useState(null);

  useEffect(() => {
    const { blogPosts, getBlogPost, match } = props;
    const blogPostId = getUrlParam(match, 'id');
    const blogPostRecord = blogPosts[`${blogPostId}`];
    if (!blogPostRecord) getBlogPost(blogPostId);
    setBlogPost(blogPostRecord);
  });

  return (
    <>
      {blogPost ? (
        <>
          <h1>{blogPost.title}</h1>
          <p>{blogPost.content}</p>
        </>
      ) : (
        <h1>LOADING</h1>
      )}
    </>
  );
}

BlogPost.propTypes = {
  blogPosts: PropTypes.shape({}),
};

BlogPost.defaultProps = {
  blogPosts: {},
};

const mapStateToProps = (state) => ({
  blogPosts: selectBlogPosts(state),
});

const mapDispatchToProps = { getBlogPost };

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost);
