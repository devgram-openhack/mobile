import Toast from 'react-native-simple-toast';

// Mockups until the backend is ready

const hackathons = [
  {
    id: '2',
    title: 'Shawee - OpenHack',
    images: [
      'https://shawee.io/images/welovehackathons.png',
    ],
    description: 'An online hackathon to develop solutions for enhancing the experience of participants in hackathons.',
    isOpen: true,
    isParticipating: true,
  },
  {
    id: '1',
    title: 'HackathonTest',
    images: [],
    description: 'In this hackathon you will develop solutions for something.',
    isOpen: true,
    isParticipating: false,
  },
  {
    id: '0',
    title: 'SpaceHacka',
    images: [],
    description: 'In this hackathon you will develop solutions for something space-related.',
    isOpen: false,
    isParticipating: false,
  },
];

const users = {
  carl: {
    id: '0',
    avatar: 'https://avatars0.githubusercontent.com/u/25509361?s=460',
    name: 'Carl Grimes',
    username: 'carl',
    specialization: 'Designer',
    description: 'I\'m from California, 22 years old, and have 3-year experience with UX design.',
    email: 'carl@gmail.com',
    modifiedTimestamp: 445,
  },
  henry: {
    id: '1',
    avatar: 'https://avatars0.githubusercontent.com/u/25509362?s=460',
    name: 'Henry Peletier',
    username: 'henry',
    specialization: 'Developer',
    description: 'I develop with Javascript.',
    email: 'henry@gmail.com',
    modifiedTimestamp: 446,
  },
  carol: {
    id: '2',
    avatar: 'https://avatars0.githubusercontent.com/u/25509363?s=460',
    name: 'Carol Peletier',
    username: 'carol',
    specialization: 'Mentor',
    description: 'I mentor projects when it comes to the design.',
    email: 'carol@gmail.com',
    modifiedTimestamp: 449,
  },
};

const posts = [
  {
    id: '2',
    author: users.carl,
    title: 'Project: Bookcademy',
    images: [
      'https://ph-files.imgix.net/d6e8efc6-3f40-4fc4-89e7-8b7322929eb8?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=627.97583081571&h=380&fit=max',
      'https://ph-files.imgix.net/84cb3681-d9eb-4c6f-98ee-930ef39c6f08?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=492.4260355029586&h=380&fit=max',
    ],
    description: 'Hello everyone, this is the first draft of our project, we would appreciate your feedback.\n\nBooks are no longer theoretical knowledge. We turn non-fiction books into a fun, useful and practical way to learn. Each book is a course!',
    likes: 195,
    dislikes: 6,
    comments: 3,
    liked: true,
    disliked: false,
    createdTimestamp: 110,
    modifiedTimestamp: 110,
  },
  {
    id: '1',
    author: users.henry,
    title: 'Idea: Humans',
    images: [
      'https://ph-files.imgix.net/a6c447c1-de7f-4e96-9062-f9d3b4dcbb05?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=635&h=380&fit=max',
    ],
    description: 'We don\'t have much experience with Hackathons, so we just want some feedback for the idea that we had.\n\nWe thought about implementing a curated gallery featuring the world\'s best personal websites. The list would consist of projects built with various technologies and services: React, Angular, Vue, WP and even Wix or About.me sites.\n\nYou can see a very basic prototype in the image above.',
    likes: 155,
    dislikes: 3,
    comments: 0,
    liked: false,
    disliked: true,
    createdTimestamp: 111,
    modifiedTimestamp: 111,
  },
  {
    id: '0',
    author: users.carl,
    title: 'Idea: Bookcademy',
    images: [],
    description: 'Hello everyone, we have an idea to turn non-fiction books into a fun, useful and practical way to learn. No images yet, but what do you think?',
    likes: 30,
    dislikes: 122,
    comments: 0,
    liked: false,
    disliked: false,
    createdTimestamp: 112,
    modifiedTimestamp: 112,
  },
];

const comments = [
  [
    {
      id: '2',
      author: users.henry,
      description: 'Wow!',
      createdTimestamp: 113,
      modifiedTimestamp: 113,
    },
    {
      id: '1',
      author: users.carol,
      description: 'I really this this!',
      createdTimestamp: 114,
      modifiedTimestamp: 114,
    },
    {
      id: '0',
      author: users.carl,
      description: 'Thanks, guys!',
      createdTimestamp: 115,
      modifiedTimestamp: 115,
    },
  ],
  [],
  [],
];

const api = {
  async get(url) {
    let matches;

    matches = url.match(/^\/hackathons\?page=(.+)/);

    if (matches) {
      const page = parseInt(matches[1]);
      const startSlice = 2 * (page - 1);
      const endSlice = startSlice + 2;
      const isLastPage = endSlice > hackathons.length;

      Toast.show(`Getting hackathons ${page} ${startSlice} ${endSlice} ${isLastPage}...`);

      return {
        data: {
          sucess: true,
          isLastPage,
          hackathons: hackathons.slice(startSlice, endSlice),
        },
      };
    }

    matches = url.match(/^\/posts\?page=(.+)/);

    if (matches) {
      const page = parseInt(matches[1]);
      const startSlice = 2 * (page - 1);
      const endSlice = startSlice + 2;
      const isLastPage = endSlice > posts.length;

      Toast.show(`Getting posts ${page} ${startSlice} ${endSlice} ${isLastPage}...`);

      return {
        data: {
          sucess: true,
          isLastPage,
          posts: posts.slice(startSlice, endSlice),
        },
      };
    }

    matches = url.match(/^\/post\/(.+?)\/comments\?page=(.+)/);

    if (matches) {
      const post = parseInt(matches[1]);
      const index = posts.length - post - 1;
      const page = parseInt(matches[2]);
      const startSlice = 2 * (page - 1);
      const endSlice = startSlice + 2;
      const isLastPage = endSlice > comments[index].length;

      Toast.show(`Getting comments ${post} ${page} ${startSlice} ${endSlice} ${isLastPage}...`);

      return {
        data: {
          success: true,
          isLastPage,
          comments: comments[index].slice(startSlice, endSlice),
          post: posts[index],
        },
      };
    }

    matches = url.match(/^\/user\/(.+?)\/posts\?page=(.+)/);

    if (matches) {
      const username = matches[1];
      const page = parseInt(matches[2]);
      const userPosts = posts.filter(post => post.author.username === username);
      const startSlice = 2 * (page - 1);
      const endSlice = startSlice + 2;
      const isLastPage = endSlice >= userPosts.length;

      Toast.show(`Getting posts for user ${username} ${page} ${startSlice} ${endSlice} ${isLastPage}...`);

      return {
        data: {
          success: true,
          isLastPage,
          posts: userPosts.slice(startSlice, endSlice),
        },
      };
    }

    matches = url.match(/^\/user\/(.+)/);

    if (matches) {
      const username = matches[1];

      Toast.show(`Getting user ${username}...`);

      return {
        data: {
          success: true,
          user: users[username],
        },
      };
    }
  },

  async post(url, data, headers) {
    let matches;

    matches = url.match(/^\/login/);

    if (matches) {
      Toast.show('Logging in...');

      const user = Object.keys(users).map(username => users[username]).filter(user => user.username === data.usernameOrEmail || user.email === data.usernameOrEmail)[0];

      if (user) {
        return {
          data: {
            success: true,
            session: {
              token: `ABC_${user.username}`,
              username: user.username,
            },
          },
        };
      } else {
        return {
          data: {
            success: false,
            message: 'User does not exist or invalid password!',
          },
        };
      }
    }

    matches = url.match(/^\/register/);

    if (matches) {
      Toast.show('Registering...');

      const user = Object.keys(users).map(username => users[username]).filter(user => user.username === data.username || user.email === data.username)[0];

      if (user) {
        return {
          data: {
            success: false,
            message: 'User already exists!',
          },
        };
      } else {
        data.avatar = data.avatar.uri;
        data.id = Object.keys(users).length.toString();
        users[data.username] = data;

        return {
          data: {
            success: true,
            session: {
              token: `ABC_${data.username}`,
              username: data.username,
            },
          },
        };
      }
    }

    matches = url.match(/^\/logout/);

    if (matches) {
      Toast.show('Logging out...');

      return {
        data: {
          success: true,
        },
      };
    }

    matches = url.match(/^\/posts/);

    if (matches) {
      Toast.show('Creating post...');

      const now = Date.now();

      data.id = posts.length.toString();
      data.author = users[headers.Authorization.split('_')[1]];
      data.images = data.images.map(image => image.uri);
      data.createdTimestamp = now;
      data.modifiedTimestamp = now;
      data.comments = 0;
      data.likes = 0;
      data.dislikes = 0;
      data.liked = false;
      data.disliked = false;
      posts.unshift(data);
      comments.unshift([]);

      return {
        data: {
          success: true,
        },
      };
    }

    matches = url.match(/^\/hackathon\/(.+?)\/join/);

    if (matches) {
      const hackathon = parseInt(matches[1]);

      Toast.show(`Joining hackathon ${hackathon}...`);

      if (hackathons[hackathon].isOpen) {
        hackathons[hackathon].isParticipating = true;

        return {
          data: {
            success: true,
          },
        };
      } else {
        return {
          data: {
            success: false,
          },
        };
      }
    }

    matches = url.match(/^\/post\/(.+?)\/comments/);

    if (matches) {
      const post = parseInt(matches[1]);

      Toast.show(`Creating comment ${post}...`);

      const now = Date.now();

      const index = comments.length - post - 1;
      data.id = comments[index].length.toString();
      data.author = users[headers.Authorization.split('_')[1]];
      data.createdTimestamp = now;
      data.modifiedTimestamp = now;
      comments[index].unshift(data);
      posts[index].comments = comments[index].length;

      return {
        data: {
          success: true,
          post: {
            id: posts[index].id,
            comments: posts[index].comments,
          },
        },
      };
    }

    matches = url.match(/^\/post\/(.+?)\/(likes|dislikes)/);

    if (matches) {
      Toast.show('Liking / disliking post...');

      const post = parseInt(matches[1]);
      const index = posts.length - post - 1;
      const action = matches[2];

      if (action === 'likes') {
        if (posts[index].liked) {
          posts[index].liked = false;
          posts[index].likes -= 1;
        } else {
          posts[index].liked = true;
          posts[index].likes += 1;
          if (posts[index].disliked) {
            posts[index].disliked = false;
            posts[index].dislikes -= 1;
          }
        }
      } else {
        if (posts[index].disliked) {
          posts[index].disliked = false;
          posts[index].dislikes -= 1;
        } else {
          posts[index].disliked = true;
          posts[index].dislikes += 1;
          if (posts[index].liked) {
            posts[index].liked = false;
            posts[index].likes -= 1;
          }
        }
      }

      return {
        data: {
          success: true,
          post: {
            id: posts[index].id,
            likes: posts[index].likes,
            dislikes: posts[index].dislikes,
            liked: posts[index].liked,
            disliked: posts[index].disliked,
          },
        },
      };
    }
  },

  async patch(url, data, headers) {
    let matches;

    matches = url.match(/^\/post\/(.+)/);

    if (matches) {
      const post = parseInt(matches[1]);
      const index = posts.length - post - 1;

      Toast.show(`Editing post ${post}...`);

      data.id = post.toString();
      data.author = users[headers.Authorization.split('_')[1]];
      data.images = data.images.map(image => image.uri);
      data.modifiedTimestamp = Date.now();
      posts[index] = Object.assign({}, posts[index], data);

      return {
        data: {
          success: true,
          post: data,
        },
      };
    }

    matches = url.match(/^\/user\/(.+)/);

    if (matches) {
      const username = matches[1];

      Toast.show(`Editing ${username}...`);

      const user = Object.keys(users).map(username => users[username]).filter(user => user.username === data.username || user.email === data.username)[0];

      if (user && (!headers.Authorization || username !== headers.Authorization.split('_')[1])) {
        return {
          data: {
            success: false,
            message: 'Username already in use!',
          },
        };
      } else {
        users[data.username].avatar = data.avatar.uri;
        users[data.username].name = data.name;
        users[data.username].username = data.username;
        users[data.username].specialization = data.specialization;
        users[data.username].description = data.description;
        users[data.username].email = data.email;
        users[data.username].modifiedTimestamp = Date.now();

        return {
          data: {
            success: true,
            session: {
              token: `ABC_${data.username}`,
              username: data.username,
            },
            user: users[data.username],
          },
        };
      }
    }
  },
};

export { api };