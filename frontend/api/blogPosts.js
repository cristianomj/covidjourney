import { request } from './';

export default {
  getBlogPost: id => request(`posts/${id}`),
  getAllBlogPosts: () => request(`posts`),
  createBlogPost: ({ payload, token }) =>
    request('posts/', {
      method: 'POST',
      body: JSON.stringify(payload),
      token,
    }),
};
