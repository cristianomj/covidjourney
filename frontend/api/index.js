import 'isomorphic-fetch';

import blogPosts from './blogPosts';
import auth from './auth';

const defaultOptions = {
  credentials: 'include',
  method: 'GET',
  headers: {},
};

export function request(path, options = {}, token = null, isJSON = true) {
  const combinedOptions = { ...defaultOptions, ...options };

  if (isJSON) combinedOptions.headers['Content-Type'] = 'application/json';

  if (token) combinedOptions.header['Authorization'] = `Token ${token}`;

  return fetch(`/api/${path}`, {
    ...combinedOptions,
  }).then(res => {
    const json = res.text().then(text => (text ? JSON.parse(text) : {}));
    return res.ok ? json : json.then(Promise.reject.bind(Promise));
  });
}

export default {
  ...blogPosts,
  ...auth,
};
