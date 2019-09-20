// Mockups until the backend is ready

const token = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const likes = [true, false, false];
const dislikes = [false, true, false];

const users = [
  {
    avatar: 'https://avatars0.githubusercontent.com/u/25509361?s=460',
    name: 'Carl Grimes',
    username: 'carl',
    role: 'Designer',
    description: 'I\'m from California, 22 years old, and have 3-year experience with UX design.',
  },
  {
    avatar: 'https://avatars0.githubusercontent.com/u/25509362?s=460',
    name: 'Henry Peletier',
    username: 'henry',
    role: 'Developer',
    description: 'I develop with Javascript.',
  },
  {
    avatar: 'https://avatars0.githubusercontent.com/u/25509363?s=460',
    name: 'Carol Peletier',
    username: 'carol',
    role: 'Mentor',
    description: 'I mentor projects when it comes to the design.',
  },
];

const posts = [
  {
    id: '0',
    author: users[0],
    title: 'Project: Bookcademy',
    images: [
      'https://ph-files.imgix.net/d6e8efc6-3f40-4fc4-89e7-8b7322929eb8?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=627.97583081571&h=380&fit=max',
      'https://ph-files.imgix.net/84cb3681-d9eb-4c6f-98ee-930ef39c6f08?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=492.4260355029586&h=380&fit=max',
    ],
    description: 'Hello everyone, this is the first draft of our project, we would appreciate your feedback.\n\nBooks are no longer theoretical knowledge. We turn non-fiction books into a fun, useful and practical way to learn. Each book is a course!',
    likes: 195,
    dislikes: 6,
    comments: 2,
    liked: likes[0],
    disliked: dislikes[0],
  },
  {
    id: '1',
    author: users[1],
    title: 'Idea: Humans',
    images: [
      'https://ph-files.imgix.net/a6c447c1-de7f-4e96-9062-f9d3b4dcbb05?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=635&h=380&fit=max',
    ],
    description: 'We don\'t have much experience with Hackathons, so we just want some feedback for the idea that we had.\n\nWe thought about implementing a curated gallery featuring the world\'s best personal websites. The list would consist of projects built with various technologies and services: React, Angular, Vue, WP and even Wix or About.me sites.\n\nYou can see a very basic prototype in the image above.',
    likes: 155,
    dislikes: 3,
    comments: 0,
    liked: likes[1],
    disliked: dislikes[1],
  },
  {
    id: '2',
    author: users[0],
    title: 'Idea: Bookcademy',
    images: [],
    description: 'Hello everyone, we have an idea to turn non-fiction books into a fun, useful and practical way to learn. No images yet, but what do you think?',
    likes: 30,
    dislikes: 122,
    comments: 0,
    liked: likes[2],
    disliked: dislikes[2],
  },
];

const comments = [
  {
    id: '0',
    author: users[1],
    description: 'Wow!',
  },
  {
    id: '1',
    author: users[2],
    description: 'I really this this!',
  },
  {
    id: '2',
    author: users[0],
    description: 'Thanks, guys!',
  },
];

const api = {
  async get(url) {
    switch (url) {
      case '/posts?page=1':
        return {
          data: {
            success: true,
            isLastPage: false,
            posts: posts.slice(0, 2),
          },
        };
      case '/posts?page=2':
        return {
          data: {
            success: true,
            isLastPage: true,
            posts: posts.slice(2),
          },
        };
      case '/post/0/comments?page=1':
        return {
          data: {
            success: true,
            isLastPage: false,
            comments: comments.slice(0, 2),
            post: posts[0],
          },
        };
      case '/post/0/comments?page=2':
        return {
          data: {
            success: true,
            isLastPage: true,
            comments: comments.slice(2),
            post: {
              ...posts[0],
              comments: 3,
            },
          },
        };
      case '/post/1/comments?page=1':
        return {
          data: {
            success: true,
            isLastPage: true,
            comments: [],
            post: posts[1],
          },
        };
      case '/post/2/comments?page=1':
        return {
          data: {
            success: true,
            isLastPage: true,
            comments: [],
            post: posts[2],
          },
        };
      case '/user/carl':
        return {
          data: {
            success: true,
            user: users[0],
          },
        };
      case '/user/henry':
        return {
          data: {
            success: true,
            user: users[1],
          },
        };
      case '/user/carol':
        return {
          data: {
            success: true,
            user: users[2],
          },
        };
      case '/user/carl/posts?page=1':
        return {
          data: {
            success: true,
            isLastPage: true,
            posts: posts.filter(post => post.author.username === 'carl'),
          },
        };
      case '/user/henry/posts?page=1':
        return {
          data: {
            success: true,
            isLastPage: true,
            posts: posts.filter(post => post.author.username === 'henry'),
          },
        };
      case '/user/carol/posts?page=1':
        return {
          data: {
            success: true,
            isLastPage: true,
            posts: posts.filter(post => post.author.username === 'carol'),
          },
        };
    }
  },

  async post(url) {
    switch (url) {
      case '/login':
      case '/register':
      case '/posts':
      case '/post/0/comments':
      case '/post/1/comments':
      case '/post/2/comments':
        return {
          data: {
            success: true,
            session: {
              token,
              username: 'carl',
            },
          },
        };
      case '/post/0/likes':
      case '/post/1/likes':
      case '/post/2/likes': {
        const num = url.match(/\d/)[0];

        likes[num] = !likes[num];

        return {
          data: {
            success: true,
            post: {
              ...posts[num],
              liked: likes[num],
              disliked: dislikes[num],
            },
          },
        };
      }
      case '/post/0/dislikes':
      case '/post/1/dislikes':
      case '/post/2/dislikes': {
        const num = url.match(/\d/)[0];

        dislikes[num] = !dislikes[num];

        return {
          data: {
            success: true,
            post: {
              ...posts[num],
              liked: likes[num],
              disliked: dislikes[num],
            },
          },
        };
      }
    }
  },
};

export { api };