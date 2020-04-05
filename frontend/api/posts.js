import { request } from './';

export default {
  getPost: id => request(`posts/${id}`),
};
