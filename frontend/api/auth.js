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

export const verifyUser = payload =>
  request('auth/verify', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const getUser = token =>
  request('auth/user', {
    token,
  });

export default {
  signUp,
  signIn,
  verifyUser,
  getUser,
};
