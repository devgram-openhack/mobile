// import Toast from 'react-native-simple-toast';

// Mockup until the backend is ready
const DATABASE = {
  users: {
    '0': {
      id: '0',
      avatar: 'https://avatars0.githubusercontent.com/u/25509361?s=460',
      name: 'Carl Grimes',
      username: 'carl',
      specialization: 'Designer',
      description: 'I\'m from California, 22 years old, and have 3-year experience with UX design.',
      email: 'carl@gmail.com',
      passwordHash: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      likes: ['2'],
      dislikes: ['1'],
      hackathons: ['0', '2'],
      createdTimestamp: 1569103194496,
      modifiedTimestamp: 1569103194496,
    },
    '1': {
      id: '1',
      avatar: 'https://avatars0.githubusercontent.com/u/25509362?s=460',
      name: 'Henry Peletier',
      username: 'henry',
      specialization: 'Developer',
      description: 'I develop with Javascript.',
      email: 'henry@gmail.com',
      passwordHash: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      likes: [],
      dislikes: [],
      hackathons: ['2'],
      createdTimestamp: 1569103194496,
      modifiedTimestamp: 1569103194496,
    },
    '2': {
      id: '2',
      avatar: 'https://avatars0.githubusercontent.com/u/25509363?s=460',
      name: 'Carol Peletier',
      username: 'carol',
      specialization: 'Mentor',
      description: 'I mentor projects when it comes to the design.',
      email: 'carol@gmail.com',
      passwordHash: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      likes: [],
      dislikes: [],
      hackathons: [],
      createdTimestamp: 1569103194496,
      modifiedTimestamp: 1569103194496,
    },
  },
  posts: {
    '0': {
      id: '0',
      author: '0',
      title: 'Idea: Bookcademy',
      images: [],
      description: 'Hello everyone, we have an idea to turn non-fiction books into a fun, useful and practical way to learn. No images yet, but what do you think?',
      likes: 30,
      dislikes: 122,
      comments: 0,
      createdTimestamp: 1569103194497,
      modifiedTimestamp: 1569103194497,
    },
    '1': {
      id: '1',
      author: '1',
      title: 'Idea: Humans',
      images: [
        'https://ph-files.imgix.net/a6c447c1-de7f-4e96-9062-f9d3b4dcbb05?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=635&h=380&fit=max',
      ],
      description: 'We don\'t have much experience with Hackathons, so we just want some feedback for the idea that we had.\n\nWe thought about implementing a curated gallery featuring the world\'s best personal websites. The list would consist of projects built with various technologies and services: React, Angular, Vue, WP and even Wix or About.me sites.\n\nYou can see a very basic prototype in the image above.',
      likes: 155,
      dislikes: 3,
      comments: 0,
      createdTimestamp: 1569103194498,
      modifiedTimestamp: 1569103194498,
    },
    '2': {
      id: '2',
      author: '0',
      title: 'Project: Bookcademy',
      images: [
        'https://ph-files.imgix.net/d6e8efc6-3f40-4fc4-89e7-8b7322929eb8?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=627.97583081571&h=380&fit=max',
        'https://ph-files.imgix.net/84cb3681-d9eb-4c6f-98ee-930ef39c6f08?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=492.4260355029586&h=380&fit=max',
      ],
      description: 'Hello everyone, this is the first draft of our project, we would appreciate your feedback.\n\nBooks are no longer theoretical knowledge. We turn non-fiction books into a fun, useful and practical way to learn. Each book is a course!',
      likes: 195,
      dislikes: 6,
      comments: 3,
      createdTimestamp: 1569103194499,
      modifiedTimestamp: 1569103194499,
    },
  },
  comments: {
    '0': {
      id: '0',
      author: '1',
      post: '2',
      description: 'Wow!',
      createdTimestamp: 1569103194500,
      modifiedTimestamp: 1569103194500,
    },
    '1': {
      id: '1',
      author: '2',
      post: '2',
      description: 'I really this this!',
      createdTimestamp: 1569103194501,
      modifiedTimestamp: 1569103194501,
    },
    '2': {
      id: '2',
      author: '0',
      post: '2',
      description: 'Thanks, guys!',
      createdTimestamp: 1569103194502,
      modifiedTimestamp: 1569103194502,
    },
  },
  hackathons: {
    '0': {
      id: '0',
      name: 'SpaceHacka',
      images: [],
      description: 'In this hackathon you will develop solutions for something space-related.',
      maxMembersPerTeam: 6,
      endTimestamp: 1569103194503,
    },
    '1': {
      id: '1',
      name: 'HackathonTest',
      images: [],
      description: 'In this hackathon you will develop solutions for something.',
      maxMembersPerTeam: 4,
      endTimestamp: 1569985140000,
    },
    '2': {
      id: '2',
      name: 'Shawee - OpenHack',
      images: [
        'https://shawee.io/images/welovehackathons.png',
      ],
      description: 'An online hackathon to develop solutions for enhancing the experience of participants in hackathons.',
      maxMembersPerTeam: 5,
      endTimestamp: 1569207540000,
    },
  },
  teams: {
    '0': {
      id: '0',
      hackathon: '2',
      avatar: '',
      name: 'Bookcademers',
      members: ['0'],
    },
    '1': {
      id: '1',
      hackathon: '2',
      avatar: '',
      name: 'Humans',
      members: ['1'],
    },
    '2': {
      id: '2',
      hackathon: '0',
      avatar: '',
      name: '',
      members: ['0'],
    },
  },
};

const api = {
  async get(url, config) {
    let matches;

    // GET /posts?page={page}
    // Requires authentication
    matches = url.match(/^\/posts\?page=(.+)/);

    if (matches) {
      const loggedInUser = DATABASE.users[config.headers.Authorization.split('_')[1]];

      const posts = [];

      for (const id in DATABASE.posts) {
        const databasePost = DATABASE.posts[id];

        const author = DATABASE.users[databasePost.author];

        posts.push(Object.assign({}, databasePost, {
          author: Object.assign({}, author, {
            likes: [...author.likes],
            dislikes: [...author.dislikes],
            hackathons: [...author.hackathons],
          }),
          images: [...databasePost.images],
          liked: loggedInUser.likes.includes(id),
          disliked: loggedInUser.dislikes.includes(id),
        }));
      }

      posts.sort((postA, postB) => postA.createdTimestamp >= postB.createdTimestamp ? -1 : 1);

      const page = parseInt(matches[1]);
      const startSlice = 2 * (page - 1);
      const endSlice = startSlice + 2;
      const isLastPage = endSlice > posts.length;

      // Toast.show(`Getting posts ${page} ${isLastPage}...`);

      return {
        data: {
          sucess: true,
          isLastPage,
          posts: posts.slice(startSlice, endSlice),
        },
      };
    }

    // GET /user/{username}/posts?page={page}
    // Requires authentication
    matches = url.match(/^\/user\/(.+?)\/posts\?page=(.+)/);

    if (matches) {
      const loggedInUser = DATABASE.users[config.headers.Authorization.split('_')[1]];

      const username = matches[1];

      const posts = [];

      for (const id in DATABASE.posts) {
        const databasePost = DATABASE.posts[id];

        const author = DATABASE.users[databasePost.author];

        if (author.username === username) {
          posts.push(Object.assign({}, databasePost, {
            author: Object.assign({}, author, {
              likes: [...author.likes],
              dislikes: [...author.dislikes],
              hackathons: [...author.hackathons],
            }),
            images: [...databasePost.images],
            liked: loggedInUser.likes.includes(id),
            disliked: loggedInUser.dislikes.includes(id),
          }));
        }
      }

      posts.sort((postA, postB) => postA.createdTimestamp >= postB.createdTimestamp ? -1 : 1);

      const page = parseInt(matches[2]);
      const startSlice = 2 * (page - 1);
      const endSlice = startSlice + 2;
      const isLastPage = endSlice >= posts.length;

      // Toast.show(`Getting posts for user ${username} ${page} ${isLastPage}...`);

      return {
        data: {
          success: true,
          isLastPage,
          posts: posts.slice(startSlice, endSlice),
        },
      };
    }

    // GET /post/{id}/comments?page={page}
    matches = url.match(/^\/post\/(.+?)\/comments\?page=(.+)/);

    if (matches) {
      const postId = matches[1];

      const databasePost = DATABASE.posts[postId];
      const databasePostAuthor = DATABASE.users[databasePost.author];

      const post = Object.assign({}, databasePost, {
        author: Object.assign({}, databasePostAuthor, {
          likes: [...databasePostAuthor.likes],
          dislikes: [...databasePostAuthor.dislikes],
          hackathons: [...databasePostAuthor.hackathons],
        }),
        images: [...databasePost.images],
        liked: databasePostAuthor.likes.includes(postId),
        disliked: databasePostAuthor.dislikes.includes(postId),
      });

      const comments = [];

      for (const id in DATABASE.comments) {
        const databaseComment = DATABASE.comments[id];

        if (databaseComment.post === postId) {
          const author = DATABASE.users[databaseComment.author];

          comments.push(Object.assign({}, databaseComment, {
            author: Object.assign({}, author, {
              likes: [...author.likes],
              dislikes: [...author.dislikes],
              hackathons: [...author.hackathons],
            }),
          }));
        }
      }

      comments.sort((commentA, commentB) => commentA.createdTimestamp >= commentB.createdTimestamp ? -1 : 1);

      const page = parseInt(matches[2]);
      const startSlice = 2 * (page - 1);
      const endSlice = startSlice + 2;
      const isLastPage = endSlice > comments.length;

      // Toast.show(`Getting comments for post ${postId} ${page} ${isLastPage}...`);

      return {
        data: {
          success: true,
          isLastPage,
          comments: comments.slice(startSlice, endSlice),
          post,
        },
      };
    }

    // GET /user/{username}
    matches = url.match(/^\/user\/(.+)/);

    if (matches) {
      const username = matches[1];

      // Toast.show(`Getting user ${username}...`);

      for (const id in DATABASE.users) {
        const databaseUser = DATABASE.users[id];

        if (databaseUser.username === username) {
          return {
            data: {
              success: true,
              user: Object.assign({}, databaseUser, {
                likes: [...databaseUser.likes],
                dislikes: [...databaseUser.dislikes],
                hackathons: [...databaseUser.hackathons],
              }),
            },
          };
        }
      }

      return {
        data: {
          success: false,
          message: 'User not found!',
        },
      };
    }

    // GET /hackathons?page={page}
    // Requires authentication
    matches = url.match(/^\/hackathons\?page=(.+)/);

    if (matches) {
      const loggedInUser = DATABASE.users[config.headers.Authorization.split('_')[1]];

      const now = Date.now();

      const hackathons = [];

      for (const id in DATABASE.hackathons) {
        const databaseHackathon = DATABASE.hackathons[id];

        hackathons.push(Object.assign({}, databaseHackathon, {
          images: [...databaseHackathon.images],
          isOpen: now < databaseHackathon.endTimestamp,
          isParticipating: loggedInUser.hackathons.includes(id),
        }));
      }

      hackathons.sort((hackathonA, hackathonB) => {
        if (hackathonA.isOpen && hackathonB.isOpen) {
          return hackathonA.endTimestamp < hackathonB.endTimestamp ? -1 : 1;
        }

        if (!hackathonA.isOpen && !hackathonB.isOpen) {
          return hackathonA.endTimestamp >= hackathonB.endTimestamp ? -1 : 1;
        }

        if (hackathonA.isOpen) {
          return -1;
        }

        return 1;
      });

      const page = parseInt(matches[1]);
      const startSlice = 2 * (page - 1);
      const endSlice = startSlice + 2;
      const isLastPage = endSlice > hackathons.length;

      // Toast.show(`Getting hackathons ${page} ${isLastPage}...`);

      return {
        data: {
          sucess: true,
          isLastPage,
          hackathons: hackathons.slice(startSlice, endSlice),
        },
      };
    }

    // GET /me/teams?page={page}
    // Requires authentication
    matches = url.match(/^\/me\/teams\?page=(.+)/);

    if (matches) {
      const userId = config.headers.Authorization.split('_')[1];
      const loggedInUser = DATABASE.users[userId];

      const now = Date.now();

      const teams = [];

      for (const id in DATABASE.teams) {
        const databaseTeam = DATABASE.teams[id];
        const databaseHackathon = DATABASE.hackathons[databaseTeam.hackathon];

        if (databaseTeam.members.includes(userId)) {
          teams.push(Object.assign({}, databaseTeam, {
            hackathon: Object.assign({}, databaseHackathon, {
              images: [...databaseHackathon.images],
              isOpen: now < databaseHackathon.endTimestamp,
              isParticipating: loggedInUser.hackathons.includes(id),
            }),
            members: databaseTeam.members.map(member => {
              const databaseMember = DATABASE.users[member];

              return Object.assign({}, databaseMember, {
                likes: [...databaseMember.likes],
                dislikes: [...databaseMember.dislikes],
                hackathons: [...databaseMember.hackathons],
              });
            }),
          }));
        }
      }

      teams.sort((teamA, teamB) => {
        if (teamA.hackathon.isOpen && teamB.hackathon.isOpen) {
          return teamA.hackathon.endTimestamp < teamB.hackathon.endTimestamp ? -1 : 1;
        }

        if (!teamA.hackathon.isOpen && !teamB.hackathon.isOpen) {
          return teamA.hackathon.endTimestamp >= teamB.hackathon.endTimestamp ? -1 : 1;
        }

        if (teamA.hackathon.isOpen) {
          return -1;
        }

        return 1;
      });

      const page = parseInt(matches[1]);
      const startSlice = 2 * (page - 1);
      const endSlice = startSlice + 2;
      const isLastPage = endSlice > teams.length;

      // Toast.show(`Getting teams for logged in user ${page} ${isLastPage}...`);

      return {
        data: {
          sucess: true,
          isLastPage,
          teams: teams.slice(startSlice, endSlice),
        },
      };
    }

    // GET /me/hackathon/{id}/team
    // Requires authentication
    matches = url.match(/^\/me\/hackathon\/(.+?)\/team/);

    if (matches) {
      const hackathonId = matches[1];
      const userId = config.headers.Authorization.split('_')[1];

      // Toast.show(`Getting team for logged in user for hackathon ${hackathonId}...`);

      for (const id in DATABASE.teams) {
        const databaseTeam = DATABASE.teams[id];

        if (databaseTeam.hackathon === hackathonId && databaseTeam.members.includes(userId)) {
          const databaseHackathon = DATABASE.hackathons[hackathonId];

          return {
            data: {
              success: true,
              team: Object.assign({}, databaseTeam, {
                hackathon: Object.assign({}, databaseHackathon, {
                  images: [...databaseHackathon.images],
                }),
                members: databaseTeam.members.map(member => {
                  const databaseMember = DATABASE.users[member];

                  return Object.assign({}, databaseMember, {
                    likes: [...databaseMember.likes],
                    dislikes: [...databaseMember.dislikes],
                    hackathons: [...databaseMember.hackathons],
                  });
                }),
              }),
            },
          };
        }
      }

      return {
        data: {
          sucess: true,
          team: null,
        },
      };
    }
  },

  async post(url, data, config) {
    let matches;

    // POST /login
    matches = url.match(/^\/login/);

    if (matches) {
      // Toast.show('Logging in...');

      for (const id in DATABASE.users) {
        const databaseUser = DATABASE.users[id];

        if (databaseUser.username === data.usernameOrEmail || databaseUser.email === data.usernameOrEmail) {
          return {
            data: {
              success: true,
              session: {
                token: `ABC_${id}`,
                username: databaseUser.username,
              },
            },
          };
        }
      }

      return {
        data: {
          success: false,
          message: 'User does not exist or invalid password!',
        },
      };
    }

    // POST /register
    matches = url.match(/^\/register/);

    if (matches) {
      // Toast.show('Registering...');

      for (const id in DATABASE.users) {
        const databaseUser = DATABASE.users[id];

        if (databaseUser.username === data.username || databaseUser.email === data.email) {
          return {
            data: {
              success: false,
              message: 'User already exists!',
            },
          };
        }
      }

      const now = Date.now();

      const newUserId = Object.keys(DATABASE.users).length.toString();

      DATABASE.users[newUserId] = {
        ...data,
        id: newUserId,
        avatar: data.avatar.uri,
        likes: [],
        dislikes: [],
        hackathons: [],
        createdTimestamp: now,
        modifiedTimestamp: now,
      };

      return {
        data: {
          success: true,
          session: {
            token: `ABC_${newUserId}`,
            username: data.username,
          },
        },
      };
    }

    // POST /logout
    // Requires authentication
    matches = url.match(/^\/logout/);

    if (matches) {
      // Toast.show('Logging out...');

      return {
        data: {
          success: true,
        },
      };
    }

    // POST /posts
    // Requires authentication
    matches = url.match(/^\/posts/);

    if (matches) {
      // Toast.show('Creating post...');

      const now = Date.now();

      const newPostId = Object.keys(DATABASE.posts).length.toString();

      DATABASE.posts[newPostId] = {
        ...data,
        id: newPostId,
        author: config.headers.Authorization.split('_')[1],
        images: data.images.map(image => image.uri),
        likes: 0,
        dislikes: 0,
        comments: 0,
        createdTimestamp: now,
        modifiedTimestamp: now,
      };

      return {
        data: {
          success: true,
        },
      };
    }

    // POST /post/{id}/{'likes'|'deslikes'}
    // Requires authentication
    matches = url.match(/^\/post\/(.+?)\/(likes|dislikes)/);

    if (matches) {
      // Toast.show('Liking / disliking post...');

      const postId = matches[1];
      const action = matches[2];

      const databasePost = DATABASE.posts[postId];
      const databaseUser = DATABASE.users[config.headers.Authorization.split('_')[1]];

      if (action === 'likes') {
        if (databaseUser.likes.includes(postId)) {
          databaseUser.likes = databaseUser.likes.filter(id => id !== postId);
          databasePost.likes -= 1;
        } else {
          databaseUser.likes.push(postId);
          databasePost.likes += 1;

          if (databaseUser.dislikes.includes(postId)) {
            databaseUser.dislikes = databaseUser.dislikes.filter(id => id !== postId);
            databasePost.dislikes -= 1;
          }
        }
      } else {
        if (databaseUser.dislikes.includes(postId)) {
          databaseUser.dislikes = databaseUser.dislikes.filter(id => id !== postId);
          databasePost.dislikes -= 1;
        } else {
          databaseUser.dislikes.push(postId);
          databasePost.dislikes += 1;

          if (databaseUser.likes.includes(postId)) {
            databaseUser.likes = databaseUser.likes.filter(id => id !== postId);
            databasePost.likes -= 1;
          }
        }
      }

      return {
        data: {
          success: true,
          post: {
            id: postId,
            likes: databasePost.likes,
            dislikes: databasePost.dislikes,
            liked: databaseUser.likes.includes(postId),
            disliked: databaseUser.dislikes.includes(postId),
          },
        },
      };
    }

    // POST /post/{id}/comments
    // Requires authentication
    matches = url.match(/^\/post\/(.+?)\/comments/);

    if (matches) {
      const postId = matches[1];

      // Toast.show(`Creating comment for post ${postId}...`);

      const now = Date.now();

      const newCommentId = Object.keys(DATABASE.comments).length.toString();

      DATABASE.comments[newCommentId] = {
        ...data,
        id: newCommentId,
        author: config.headers.Authorization.split('_')[1],
        post: postId,
        createdTimestamp: now,
        modifiedTimestamp: now,
      };

      const databasePost = DATABASE.posts[postId];

      databasePost.comments += 1;

      return {
        data: {
          success: true,
          post: {
            id: postId,
            comments: databasePost.comments,
          },
        },
      };
    }

    // POST /hackathon/{id}/join
    // Requires authentication
    matches = url.match(/^\/hackathon\/(.+?)\/join/);

    if (matches) {
      const hackathonId = matches[1];

      // Toast.show(`Joining hackathon ${hackathonId}...`);

      const databaseHackathon = DATABASE.hackathons[hackathonId];

      const now = Date.now();

      if (now >= databaseHackathon.endTimestamp) {
        return {
          data: {
            success: false,
            message: 'Hackathon has ended!',
          },
        };
      }

      const loggedInUser = DATABASE.users[config.headers.Authorization.split('_')[1]];

      loggedInUser.hackathons.push(hackathonId);

      return {
        data: {
          success: true,
        },
      };
    }
  },

  async patch(url, data, config) {
    let matches;

    // PATCH /post/{id}
    // Requires authentication
    matches = url.match(/^\/post\/(.+)/);

    if (matches) {
      const postId = matches[1];

      // Toast.show(`Editing post ${postId}...`);

      const databasePost = Object.assign({}, DATABASE.posts[postId], data, {
        author: config.headers.Authorization.split('_')[1],
        images: data.images.map(image => image.uri),
        modifiedTimestamp: Date.now(),
      });

      DATABASE.posts[postId] = databasePost;

      const databasePostAuthor = DATABASE.users[databasePost.author];

      return {
        data: {
          success: true,
          post: Object.assign({}, databasePost, {
            author: Object.assign({}, databasePostAuthor, {
              likes: [...databasePostAuthor.likes],
              dislikes: [...databasePostAuthor.dislikes],
              hackathons: [...databasePostAuthor.hackathons],
            }),
            images: [...databasePost.images],
          }),
        },
      };
    }

    // PATCH /me
    // Requires authentication
    matches = url.match(/^\/me/);

    if (matches) {
      const userId = config.headers.Authorization.split('_')[1];

      // Toast.show(`Editing profile ${userId}...`);

      const databaseUser = Object.assign({}, DATABASE.users[userId], data, {
        avatar: data.avatar.uri,
        modifiedTimestamp: Date.now(),
      });

      DATABASE.users[userId] = databaseUser;

      return {
        data: {
          success: true,
          session: {
            token: `ABC_${userId}`,
            username: data.username,
          },
          user: Object.assign({}, databaseUser, {
            likes: [...databaseUser.likes],
            dislikes: [...databaseUser.dislikes],
            hackathons: [...databaseUser.hackathons],
          }),
        },
      };
    }

    // PATCH /team/{id}
    // Requires authentication
    matches = url.match(/^\/team\/(.+)/);

    if (matches) {
      const teamId = matches[1];

      // Toast.show(`Editing team name ${teamId}...`);

      for (const id in DATABASE.teams) {
        const databaseTeam = DATABASE.teams[id];

        if (databaseTeam.name === data.name) {
          return {
            data: {
              success: false,
              message: 'Name already in use by another team!',
            },
          };
        }
      }

      const databaseTeam = Object.assign({}, DATABASE.teams[teamId], {
        ...data,
        avatar: data.avatar.uri,
      });

      DATABASE.teams[teamId] = databaseTeam;

      const databaseHackathon = DATABASE.hackathons[databaseTeam.hackathon];

      return {
        data: {
          success: true,
          team: Object.assign({}, databaseTeam, {
            hackathon: Object.assign({}, databaseHackathon, {
              images: [...databaseHackathon.images],
            }),
            members: databaseTeam.members.map(member => {
              const databaseMember = DATABASE.users[member];

              return Object.assign({}, databaseMember, {
                likes: [...databaseMember.likes],
                dislikes: [...databaseMember.dislikes],
                hackathons: [...databaseMember.hackathons],
              });
            }),
          }),
        },
      };
    }
  },
};

export { api };