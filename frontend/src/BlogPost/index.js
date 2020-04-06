import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import makeStyles from '@material-ui/core/styles/makeStyles';

import {
  getBlogPost,
  selectBlogPost,
} from 'state/modules/blogPosts/index';
import getUrlParam from 'helpers/url/getUrlParam/index';

const useStyles = makeStyles({
  title: {
    color: 'red',
  },
  content: {
    color: 'blue',
  },
});

function BlogPost({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const blogPostId = getUrlParam(match, 'id');
  const blogPost = useSelector(state => selectBlogPost(state, blogPostId));

  useEffect(() => {
    if (!blogPost) dispatch(getBlogPost(blogPostId));
  });

  return (
    <>
      {blogPost ? (
        <>
          <h1 className={classes.title}>{blogPost.title}</h1>
          <p className={classes.content}>{blogPost.content}</p>
          <p className={classes.content}>{blogPost.isFeatured ? 'featured' : 'not featured'}</p>
        </>
      ) : (
        <h1>LOADING</h1>
      )}
    </>
  );
}

BlogPost.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export default BlogPost;
