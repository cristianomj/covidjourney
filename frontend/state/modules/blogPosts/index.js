import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import api from 'api';
import { ERROR, LOADED, LOADING } from 'state/status';

export const GET_BLOG_POST_REQUEST = 'covidjourney/blogPosts/GET_BLOG_POST_REQUEST';
export const GET_BLOG_POST_SUCCESS = 'covidjourney/blogPosts/GET_BLOG_POST_SUCCESS';
export const GET_BLOG_POST_FAILURE = 'covidjourney/blogPosts/GET_BLOG_POST_FAILURE';

const initialState = {
  entities: {},
  fetchStatus: {},
  errors: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BLOG_POST_REQUEST:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          [action.id]: LOADING,
        },
      };
    case GET_BLOG_POST_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.blogPost.id]: action.blogPost,
        },
        fetchStatus: {
          ...state.fetchStatus,
          [action.blogPost.id]: LOADED,
        },
        errors: {
          [action.blogPost.id]: {},
        },
      };
    case GET_BLOG_POST_FAILURE:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          [action.id]: ERROR,
        },
        errors: {
          ...state.errors,
          [action.id]: action.error,
        },
      };
    default:
      return state;
  }
}

export const selectBlogPosts = state => state.blogPosts.entities;

export const getBlogPost = id => ({ type: GET_BLOG_POST_REQUEST, id });

export function* getBlogPostAsync(action) {
  try {
    const blogPost = yield call([api, api.getBlogPost], action.id);
    yield put({ type: GET_BLOG_POST_SUCCESS, blogPost });
  } catch (error) {
    yield put({ type: GET_BLOG_POST_FAILURE, id: action.id, error });
  }
}

export function* blogPostsSaga() {
  yield all([takeLatest(GET_BLOG_POST_REQUEST, getBlogPostAsync)]);
}
