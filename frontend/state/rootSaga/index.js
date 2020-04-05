import { all, call } from 'redux-saga/effects';

import { postsSaga } from '../modules/posts';

export default function* rootSaga() {
  yield all([
    call(postsSaga),
  ]);
}
