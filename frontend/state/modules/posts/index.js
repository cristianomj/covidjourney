import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import api from 'api';
import { ERROR, LOADED, LOADING } from 'state/status';

export const GET_POST_REQUEST = 'covidjourney/posts/GET_POST_REQUEST';
export const GET_POST_SUCCESS = 'covidjourney/posts/GET_POST_SUCCESS';
export const GET_POST_FAILURE = 'covidjourney/posts/GET_POST_FAILURE';

const initialState = {
  entities: {},
  fetchStatus: {},
  errors: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST_REQUEST:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          [action.id]: LOADING,
        },
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.post.id]: action.post,
        },
        fetchStatus: {
          ...state.fetchStatus,
          [action.post.id]: LOADED,
        },
        errors: {
          [action.post.id]: null,
        },
      };
    case GET_POST_FAILURE:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          [action.id]: ERROR,
        },
        errors: {
          [action.id]: action.error,
        },
      };
    default:
      return state;
  }
}

export const getPost = id => ({ type: GET_POST_REQUEST, id });

export function* getPostAsync(action) {
  try {
    const post = yield call([api, api.getPost], action.id);
    yield put({ type: GET_POST_SUCCESS, post });
  } catch (error) {
    yield put({ type: GET_POST_FAILURE, slug: action.id, error });
  }
}

export function* postsSaga() {
  yield all([takeLatest(GET_POST_REQUEST, getPostAsync)]);
}
