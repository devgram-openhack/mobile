// import SimpleToast from 'react-native-simple-toast';

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
      teams: ['0', '2'],
      ignoredUsers: {},
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
      teams: ['1'],
      ignoredUsers: {},
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
      teams: [],
      ignoredUsers: {},
      createdTimestamp: 1569103194496,
      modifiedTimestamp: 1569103194496,
    },
    '3': {
      id: '3',
      avatar: 'https://avatars0.githubusercontent.com/u/25509364?s=460',
      name: 'Enid',
      username: 'enid',
      specialization: 'Designer',
      description: '',
      email: 'enid@gmail.com',
      passwordHash: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      likes: [],
      dislikes: [],
      hackathons: ['2'],
      teams: [],
      ignoredUsers: {},
      createdTimestamp: 1569103194496,
      modifiedTimestamp: 1569103194496,
    },
    '4': {
      id: '4',
      avatar: 'https://avatars0.githubusercontent.com/u/25509365?s=460',
      name: 'Glenn',
      username: 'glenn',
      specialization: 'Developer (React)',
      description: 'I develop with React and a little bit of React Native.',
      email: 'glenn@gmail.com',
      passwordHash: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      likes: [],
      dislikes: [],
      hackathons: ['2'],
      teams: ['0'],
      ignoredUsers: {},
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
      members: ['0', '4'],
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
  invites: {
    '0': {
      id: '0',
      hackathon: '2',
      from: '1',
      to: '0',
      status: 'pending',
    },
  },
};

function cloneIgnoredUsers(ignoredUsers) {
  const clone = {};

  for (const id in ignoredUsers) {
    clone[id] = [...ignoredUsers[id]];
  }

  return clone;
}

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
            teams: [...author.teams],
            ignoredUsers: cloneIgnoredUsers(author.ignoredUsers),
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

      // SimpleToast.show(`Getting posts ${page} ${isLastPage}...`);

      return {
        data: {
          success: true,
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
              teams: [...author.teams],
              ignoredUsers: cloneIgnoredUsers(author.ignoredUsers),
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

      // SimpleToast.show(`Getting posts for user ${username} ${page} ${isLastPage}...`);

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
          teams: [...databasePostAuthor.teams],
          ignoredUsers: cloneIgnoredUsers(databasePostAuthor.ignoredUsers),
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
              teams: [...author.teams],
              ignoredUsers: cloneIgnoredUsers(author.ignoredUsers),
            }),
          }));
        }
      }

      comments.sort((commentA, commentB) => commentA.createdTimestamp >= commentB.createdTimestamp ? -1 : 1);

      const page = parseInt(matches[2]);
      const startSlice = 2 * (page - 1);
      const endSlice = startSlice + 2;
      const isLastPage = endSlice > comments.length;

      // SimpleToast.show(`Getting comments for post ${postId} ${page} ${isLastPage}...`);

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
      const username = matches[1].toLowerCase();

      // SimpleToast.show(`Getting user ${username}...`);

      for (const id in DATABASE.users) {
        const databaseUser = DATABASE.users[id];

        if (databaseUser.username.toLowerCase() === username) {
          return {
            data: {
              success: true,
              user: Object.assign({}, databaseUser, {
                likes: [...databaseUser.likes],
                dislikes: [...databaseUser.dislikes],
                hackathons: [...databaseUser.hackathons],
                teams: [...databaseUser.teams],
                ignoredUsers: cloneIgnoredUsers(databaseUser.ignoredUsers),
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

      // SimpleToast.show(`Getting hackathons ${page} ${isLastPage}...`);

      return {
        data: {
          success: true,
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

      const teams = loggedInUser.teams.map(teamId => {
        const databaseTeam = DATABASE.teams[teamId];
        const databaseHackathon = DATABASE.hackathons[databaseTeam.hackathon];

        return Object.assign({}, databaseTeam, {
          hackathon: Object.assign({}, databaseHackathon, {
            images: [...databaseHackathon.images],
            isOpen: now < databaseHackathon.endTimestamp,
            isParticipating: true,
          }),
          members: databaseTeam.members.map(member => {
            const databaseMember = DATABASE.users[member];

            return Object.assign({}, databaseMember, {
              likes: [...databaseMember.likes],
              dislikes: [...databaseMember.dislikes],
              hackathons: [...databaseMember.hackathons],
              teams: [...databaseMember.teams],
              ignoredUsers: cloneIgnoredUsers(databaseMember.ignoredUsers),
            });
          }),
        });
      });

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

      // SimpleToast.show(`Getting teams for logged in user ${page} ${isLastPage}...`);

      return {
        data: {
          success: true,
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
      const loggedInUser = DATABASE.users[userId];

      // SimpleToast.show(`Getting team for logged in user for hackathon ${hackathonId}...`);

      const databaseTeam = loggedInUser.teams.map(teamId => DATABASE.teams[teamId]).filter(team => team.hackathon === hackathonId)[0];

      if (databaseTeam) {
        const databaseHackathon = DATABASE.hackathons[hackathonId];

        const now = Date.now();

        return {
          data: {
            success: true,
            team: Object.assign({}, databaseTeam, {
              hackathon: Object.assign({}, databaseHackathon, {
                images: [...databaseHackathon.images],
                isOpen: now < databaseHackathon.endTimestamp,
                isParticipating: true,
              }),
              members: databaseTeam.members.map(member => {
                const databaseMember = DATABASE.users[member];

                return Object.assign({}, databaseMember, {
                  likes: [...databaseMember.likes],
                  dislikes: [...databaseMember.dislikes],
                  hackathons: [...databaseMember.hackathons],
                  teams: [...databaseMember.teams],
                  ignoredUsers: cloneIgnoredUsers(databaseMember.ignoredUsers),
                });
              }),
            }),
          },
        };
      }

      return {
        data: {
          success: true,
          team: null,
        },
      };
    }

    // GET /hackathon/{id}/user?keywords={keywords}
    // Requires authentication
    matches = url.match(/^\/hackathon\/(.+?)\/user\?keywords=(.*)/);

    if (matches) {
      if (!matches[2]) {
        return {
          data: {
            success: false,
            message: 'No keywords!',
          },
        };
      }

      const hackathonId = matches[1];
      const keywords = matches[2].split(',');
      const userId = config.headers.Authorization.split('_')[1];
      const loggedInUser = DATABASE.users[userId];

      // SimpleToast.show(`Getting user ${hackathonId} ${keywords.join(',')}...`);

      const databaseHackathon = DATABASE.hackathons[hackathonId];

      const sentInvites = [];

      for (const id in DATABASE.invites) {
        const databaseInvite = DATABASE.invites[id];

        if (databaseInvite.hackathon === hackathonId) {
          if (databaseInvite.from === userId) {
            sentInvites.push(databaseInvite.to);
          } else if (databaseInvite.to === userId) {
            sentInvites.push(databaseInvite.from);
          }
        }
      }

      const results = [];

      for (const id in DATABASE.users) {
        const databaseUser = DATABASE.users[id];

        if (id !== userId && databaseUser.hackathons.includes(hackathonId) && !sentInvites.includes(id) && (!loggedInUser.ignoredUsers[hackathonId] || !loggedInUser.ignoredUsers[hackathonId].includes(id))) {
          // User is participating in hackathon + has not been sent an invite yet + is not ignored

          const databaseTeam = databaseUser.teams.map(teamId => DATABASE.teams[teamId]).filter(team => team.hackathon === hackathonId)[0];

          const missing = databaseTeam ? databaseHackathon.maxMembersPerTeam - databaseTeam.members.length : 1;

          if ((!databaseTeam || !databaseTeam.members.includes(userId)) && missing > 0) {
            let score = 0;

            const specialization = databaseUser.specialization.toLowerCase();
            const description = databaseUser.description.toLowerCase();

            for (const keyword of keywords) {
              if (specialization.match(keyword)) {
                score += 2;
              } else if (description.match(keyword)) {
                score += 1;
              }
            }

            if (score > 0) {
              results.push({
                score,
                team: databaseTeam && Object.assign({}, databaseTeam, {
                  hackathon: Object.assign({}, databaseHackathon, {
                    images: [...databaseHackathon.images],
                  }),
                  members: databaseTeam.members.map(member => {
                    const databaseMember = DATABASE.users[member];

                    return Object.assign({}, databaseMember, {
                      likes: [...databaseMember.likes],
                      dislikes: [...databaseMember.dislikes],
                      hackathons: [...databaseMember.hackathons],
                      teams: [...databaseMember.teams],
                      ignoredUsers: cloneIgnoredUsers(databaseMember.ignoredUsers),
                    });
                  }),
                  missing,
                }),
                user: Object.assign({}, databaseUser, {
                  likes: [...databaseUser.likes],
                  dislikes: [...databaseUser.dislikes],
                  hackathons: [...databaseUser.hackathons],
                  teams: [...databaseUser.teams],
                  ignoredUsers: cloneIgnoredUsers(databaseUser.ignoredUsers),
                }),
              });
            }
          }
        }
      }

      results.sort((resultA, resultB) => resultA.score >= resultB.score ? -1 : 1);

      return {
        data: {
          success: true,
          result: results[0],
        },
      };
    }

    // GET /me/invite
    // Requires authentication
    matches = url.match(/^\/me\/invite/);

    if (matches) {
      // SimpleToast.show('Getting invite for logged in user...');

      const userId = config.headers.Authorization.split('_')[1];

      for (const id in DATABASE.invites) {
        const databaseInvite = DATABASE.invites[id];

        if (databaseInvite.to === userId && databaseInvite.status === 'pending') {
          const databaseHackathon = DATABASE.hackathons[databaseInvite.hackathon];
          const databaseUser = DATABASE.users[databaseInvite.from];
          const databaseTeam = databaseUser.teams.map(teamId => DATABASE.teams[teamId]).filter(team => team.hackathon === databaseInvite.hackathon)[0];

          const missing = databaseTeam ? databaseHackathon.maxMembersPerTeam - databaseTeam.members.length : 1;

          return {
            data: {
              success: true,
              invite: Object.assign({}, databaseInvite, {
                hackathon: Object.assign({}, databaseHackathon, {
                  images: [...databaseHackathon.images],
                }),
                from: Object.assign({}, databaseUser, {
                  likes: [...databaseUser.likes],
                  dislikes: [...databaseUser.dislikes],
                  hackathons: [...databaseUser.hackathons],
                  teams: [...databaseUser.teams],
                  ignoredUsers: cloneIgnoredUsers(databaseUser.ignoredUsers),
                }),
                team: databaseTeam && Object.assign({}, databaseTeam, {
                  hackathon: Object.assign({}, databaseHackathon, {
                    images: [...databaseHackathon.images],
                  }),
                  members: databaseTeam.members.map(member => {
                    const databaseMember = DATABASE.users[member];

                    return Object.assign({}, databaseMember, {
                      likes: [...databaseMember.likes],
                      dislikes: [...databaseMember.dislikes],
                      hackathons: [...databaseMember.hackathons],
                      teams: [...databaseMember.teams],
                      ignoredUsers: cloneIgnoredUsers(databaseMember.ignoredUsers),
                    });
                  }),
                  missing,
                }),
              }),
            },
          };
        }
      }

      return {
        data: {
          success: true,
          invite: null,
        },
      };
    }
  },

  async post(url, data, config) {
    let matches;

    // POST /login
    matches = url.match(/^\/login/);

    if (matches) {
      // SimpleToast.show('Logging in...');

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
      // SimpleToast.show('Registering...');

      for (const id in DATABASE.users) {
        const databaseUser = DATABASE.users[id];

        if (databaseUser.username.toLowerCase() === data.username.toLowerCase() || databaseUser.email.toLowerCase() === data.email.toLowerCase()) {
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
        teams: [],
        ignoredUsers: {},
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
      // SimpleToast.show('Logging out...');

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
      // SimpleToast.show('Creating post...');

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
      // SimpleToast.show('Liking / disliking post...');

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

      // SimpleToast.show(`Creating comment for post ${postId}...`);

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

      // SimpleToast.show(`Joining hackathon ${hackathonId}...`);

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

    // POST /hackathon/{id}/user/{id}/invite
    // Requires authentication
    matches = url.match(/^\/hackathon\/(.+?)\/user\/(.+?)\/invite/);

    if (matches) {
      const hackathonId = matches[1];
      const fromId = config.headers.Authorization.split('_')[1];
      const toId = matches[2];

      // SimpleToast.show(`Sending invite to user ${hackathon} ${toId}...`);

      for (const id in DATABASE.invites) {
        const databaseInvite = DATABASE.invites[id];

        if (databaseInvite.hackathon === hackathonId && databaseInvite.from === fromId && databaseInvite.to === toId) {
          return {
            data: {
              success: false,
              message: 'Invite already sent, try to refresh the page.',
            },
          };
        }
      }

      const newInviteId = Object.keys(DATABASE.invites).length.toString();

      DATABASE.invites[newInviteId] = {
        id: newInviteId,
        hackathon: hackathonId,
        from: fromId,
        to: toId,
        status: 'pending',
      };

      return {
        data: {
          success: true,
        },
      };
    }

    // POST /hackathon/{id}/user/{id}/ignore
    // Requires authentication
    matches = url.match(/^\/hackathon\/(.+?)\/user\/(.+?)\/ignore/);

    if (matches) {
      const hackathonId = matches[1];
      const userToIgnoreId = matches[2];
      const userId = config.headers.Authorization.split('_')[1];
      const loggedInUser = DATABASE.users[userId];

      // SimpleToast.show(`Ignoring user ${hackathon} ${userToIgnoreId}...`);

      if (!loggedInUser.ignoredUsers[hackathonId]) {
        loggedInUser.ignoredUsers[hackathonId] = [];
      }

      if (loggedInUser.ignoredUsers[hackathonId].includes(userToIgnoreId)) {
        return {
          data: {
            success: false,
            message: 'User already ignored, try to refresh the page.',
          },
        };
      }

      loggedInUser.ignoredUsers[hackathonId].push(userToIgnoreId);

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

      // SimpleToast.show(`Editing post ${postId}...`);

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
              teams: [...databasePostAuthor.teams],
              ignoredUsers: cloneIgnoredUsers(databasePostAuthor.ignoredUsers),
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

      // SimpleToast.show(`Editing profile ${userId}...`);

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
            teams: [...databaseUser.teams],
            ignoredUsers: cloneIgnoredUsers(databaseUser.ignoredUsers),
          }),
        },
      };
    }

    // PATCH /team/{id}
    // Requires authentication
    matches = url.match(/^\/team\/(.+)/);

    if (matches) {
      const teamId = matches[1];

      // SimpleToast.show(`Editing team name ${teamId}...`);

      for (const id in DATABASE.teams) {
        const databaseTeam = DATABASE.teams[id];

        if (databaseTeam.name.toLowerCase() === data.name.toLowerCase()) {
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
                teams: [...databaseMember.teams],
                ignoredUsers: cloneIgnoredUsers(databaseMember.ignoredUsers),
              });
            }),
          }),
        },
      };
    }

    // PATCH /invite/{id}
    // Requires authentication
    matches = url.match(/^\/invite\/(.+)/);

    if (matches) {
      const inviteId = matches[1];

      // SimpleToast.show(`Modifying invite status ${inviteId}...`);

      const databaseInvite = DATABASE.invites[inviteId];

      let error = '';

      if (data.status === 'accepted') {
        const fromUser = DATABASE.users[databaseInvite.from];
        const toUser = DATABASE.users[databaseInvite.to];
        const databaseHackathon = DATABASE.hackathons[databaseInvite.hackathon];
        const fromTeam = fromUser.teams.map(teamId => DATABASE.teams[teamId]).filter(team => team.hackathon === databaseInvite.hackathon)[0];
        const toTeam = toUser.teams.map(teamId => DATABASE.teams[teamId]).filter(team => team.hackathon === databaseInvite.hackathon)[0];

        if (toTeam && fromTeam) {
          if ((fromTeam.members.length + toTeam.members.length) > databaseHackathon.maxMembersPerTeam) {
            error = 'Oops! Merging both teams would exceed the maximum number of members in this hackathon.';
          } else {
            const newTeamId = Object.keys(DATABASE.teams).length.toString();

            DATABASE.teams[newTeamId] = {
              id: newTeamId,
              hackathon: databaseInvite.hackathon,
              avatar: toTeam.avatar || fromTeam.avatar,
              name: toTeam.name || fromTeam.name,
              members: [...toTeam.members, ...fromTeam.members],
            };

            toUser.teams = toUser.teams.filter(teamId => teamId !== toTeam.id);
            toUser.teams.push(newTeamId);

            fromUser.teams = fromUser.teams.filter(teamId => teamId !== fromTeam.id);
            fromUser.teams.push(newTeamId);
          }
        } else if (toTeam) {
          if ((toTeam.members.length + 1) > databaseHackathon.maxMembersPerTeam) {
            error = 'Oops! Their team is already at the maximum number of members in this hackathon.';
          } else {
            toTeam.members.push(fromUser.id);

            fromUser.teams.push(toTeam.id);
          }
        } else if (fromTeam) {
          if ((fromTeam.members.length + 1) > databaseHackathon.maxMembersPerTeam) {
            error = 'Oops! Your team is already at the maximum number of members in this hackathon.';
          } else {
            fromTeam.members.push(toUser.id);

            toUser.teams.push(fromTeam.id);
          }
        } else {
          const newTeamId = Object.keys(DATABASE.teams).length.toString();

          DATABASE.teams[newTeamId] = {
            id: newTeamId,
            hackathon: databaseInvite.hackathon,
            avatar: '',
            name: '',
            members: [fromUser.id, toUser.id],
          };

          fromUser.teams.push(newTeamId);
          toUser.teams.push(newTeamId);
        }
      }

      DATABASE.invites[inviteId].status = error ? 'expired' : data.status;

      return {
        data: {
          success: !error,
          message: error,
        },
      };
    }
  },

  async delete(url, config) {
    let matches;

    // DELETE /me/hackathon/{id}/team
    // Requires authentication
    matches = url.match(/^\/me\/hackathon\/(.+?)\/team/);

    if (matches) {
      const hackathonId = matches[1];
      const userId = config.headers.Authorization.split('_')[1];
      const loggedInUser = DATABASE.users[userId];

      // SimpleToast.show(`Leaving team for logged in user for hackathon ${hackathonId}...`);

      const databaseTeam = loggedInUser.teams.map(teamId => DATABASE.teams[teamId]).filter(team => team.hackathon === hackathonId)[0];

      if (databaseTeam) {
        databaseTeam.members = databaseTeam.members.filter(member => member !== userId);

        loggedInUser.hackathons = loggedInUser.hackathons.filter(hackathon => hackathon !== hackathonId);
        loggedInUser.teams = loggedInUser.teams.filter(team => team !== databaseTeam.id);
      }

      return {
        data: {
          success: true,
        },
      };
    }

    // DELETE /me/hackathon/{id}/team
    // Requires authentication
    matches = url.match(/^\/user\/(.+?)\/hackathon\/(.+?)\/team/);

    if (matches) {
      const userToDeleteId = matches[1];
      const hackathonId = matches[2];

      // SimpleToast.show(`Kicking team member for hackathon ${userToDeleteId} ${hackathonId}...`);

      const userToDelete = DATABASE.users[userToDeleteId];

      const userId = config.headers.Authorization.split('_')[1];
      const loggedInUser = DATABASE.users[userId];

      const databaseTeam = loggedInUser.teams.map(teamId => DATABASE.teams[teamId]).filter(team => team.hackathon === hackathonId)[0];

      if (databaseTeam) {
        if (!databaseTeam.members.includes(userToDeleteId)) {
          return {
            data: {
              success: false,
              message: 'User not in your team, unauthorized to kick.',
            },
          };
        }

        databaseTeam.members = databaseTeam.members.filter(member => member !== userToDeleteId);

        userToDelete.hackathons = userToDelete.hackathons.filter(hackathon => hackathon !== hackathonId);
        userToDelete.teams = userToDelete.teams.filter(team => team !== databaseTeam.id);
      }

      return {
        data: {
          success: true,
        },
      };
    }
  }
};

export { api };