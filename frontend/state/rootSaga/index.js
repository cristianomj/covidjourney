import { all, call } from 'redux-saga/effects';

import { blogPostsSaga } from 'state/modules/blogPosts';
import { authSaga } from 'state/modules/auth';

export default function* rootSaga() {
  yield all([
    call(blogPostsSaga),
    call(authSaga),
  ]);
}
