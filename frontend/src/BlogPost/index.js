import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  title: {
    color: 'red',
  },
  content: {
    color: 'blue',
  },
});

import {
  getBlogPost,
  selectBlogPosts,
} from 'state/modules/blogPosts';
import getUrlParam from 'helpers/url/getUrlParam';

function BlogPost({ blogPosts, getBlogPost, match }) {
  const [blogPost, setBlogPost] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const blogPostId = getUrlParam(match, 'id');
    const blogPostRecord = blogPosts[`${blogPostId}`];
    if (!blogPostRecord) getBlogPost(blogPostId);
    setBlogPost(blogPostRecord);
  });

  return (
    <>
      {blogPost ? (
        <>
          <h1 className={classes.title}>{blogPost.title}</h1>
          <p className={classes.content}>{blogPost.content}</p>
        </>
      ) : (
        <h1>LOADING</h1>
      )}
    </>
  );
}

BlogPost.propTypes = {
  blogPosts: PropTypes.shape({}),
  getBlogPost: PropTypes.func.isRequired,
  match: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
};

BlogPost.defaultProps = {
  blogPosts: {},
};

const mapStateToProps = (state) => ({
  blogPosts: selectBlogPosts(state),
});

const mapDispatchToProps = { getBlogPost };

export default connect(mapStateToProps, mapDispatchToProps)(BlogPost);
