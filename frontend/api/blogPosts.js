import { request } from './';

export default {
  getBlogPost: id => request(`posts/${id}`),
};
