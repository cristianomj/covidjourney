import { all, call } from 'redux-saga/effects';

import { blogPostsSaga } from 'state/modules/blogPosts';

export default function* rootSaga() {
  yield all([
    call(blogPostsSaga),
  ]);
}
