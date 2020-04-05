import 'isomorphic-fetch';

import posts from './posts';

const defaultOptions = {
  credentials: 'include',
  method: 'GET',
  headers: {},
};

export function request(path, options = {}, isJSON = true) {
  const combinedOptions = { ...defaultOptions, ...options };

  if (isJSON) combinedOptions.headers['Content-Type'] = 'application/json';

  return fetch(`/api/${path}`, {
    ...combinedOptions,
  }).then(res => {
    const json = res.text().then(text => (text ? JSON.parse(text) : {}));
    return res.ok ? json : json.then(Promise.reject.bind(Promise));
  });
}

export default {
  ...posts,
};
