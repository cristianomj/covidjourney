import { request } from './';

export const signUp = payload =>
  request('auth/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const signIn = payload =>
  request('auth/signin', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export default {
  signUp,
  signIn,
};
