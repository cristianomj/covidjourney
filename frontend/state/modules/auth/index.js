import { all, call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import api from 'api';
import { ERROR, LOADED, LOADING } from 'state/status';

export const SIGN_UP_REQUEST = 'covidjourney/auth/SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'covidjourney/auth/SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'covidjourney/auth/SIGN_UP_FAILURE';

export const GET_USER_REQUEST = 'covidjourney/auth/GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'covidjourney/auth/GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'covidjourney/auth/GET_USER_FAILURE';

const initialState = {
  entities: {
    token: localStorage.getItem('token'),
  },
  fetchStatus: {},
  errors: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          user: LOADING,
        },
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          user: action.user,
          token: action.token,
        },
        fetchStatus: {
          ...state.fetchStatus,
          user: LOADED,
        },
        errors: {
          user: {},
        },
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          user: ERROR,
        },
        errors: {
          ...state.errors,
          user: action.error,
        },
      };
    case GET_USER_REQUEST:
      return {
        ...state,
        fetchStatus: {
          ...state.fetchStatus,
          user: LOADING,
        },
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          user: action.user,
        },
        fetchStatus: {
          ...state.fetchStatus,
          user: LOADED,
        },
        errors: {
          user: {},
        },
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        entities: {
          ...state.entities,
          user: null,
          token: null,
        },
        fetchStatus: {
          ...state.fetchStatus,
          user: ERROR,
        },
        errors: {
          ...state.errors,
          user: action.error,
        },
      };
    default:
      return state;
  }
}

export const selectUser = state => state.auth.entities.user;

export const signUp = user => ({ type: SIGN_UP_REQUEST, user });

export function* signUpAsync(action) {
  try {
    const authResponse = yield call([api, api.signUp], action.user);
    yield put({ type: SIGN_UP_SUCCESS, ...authResponse });
    localStorage.setItem('token', authResponse.token);
    yield put(push('/'));
  } catch (error) {
    yield put({ type: SIGN_UP_FAILURE, username: action.user.username, error });
  }
}

export function* authSaga() {
  yield all([takeLatest(SIGN_UP_REQUEST, signUpAsync)]);
}
