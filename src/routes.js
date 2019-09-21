import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator }  from 'react-navigation-stack';

import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { MainPage } from './pages/MainPage';
import { LogoutPage } from './pages/LogoutPage';
import { ProfilePage } from './pages/ProfilePage';
import { EditProfilePage } from './pages/EditProfilePage';
import { PostPage } from './pages/PostPage';
import { EditPostPage } from './pages/EditPostPage';
import { HackathonsPage } from './pages/HackathonsPage';
import { NewPostPage } from './pages/NewPostPage';
import { TeamsPage } from './pages/TeamsPage';

import { colors } from './styles/colors';

const Routes = createAppContainer(
  createSwitchNavigator({
    LandingPage,
    Auth: createStackNavigator({
      AuthPage,
      LoginPage,
      RegisterPage,
    }, {
      headerMode: 'none',
    }),
    App: createDrawerNavigator({
      Home: createStackNavigator({
        MainPage,
        ProfilePage,
        EditProfilePage,
        PostPage,
        EditPostPage,
        HackathonsPage,
        NewPostPage,
        TeamsPage,
      }, {
        headerMode: 'none',
      }),
      Logout: LogoutPage,
    }, {
      drawerBackgroundColor: colors.input,
    })
  })
);

export { Routes };