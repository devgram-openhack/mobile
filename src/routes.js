import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator }  from 'react-navigation-stack';

import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { MainPage } from './pages/MainPage';
import { ProfilePage } from './pages/ProfilePage';
import { PostPage } from './pages/PostPage';
import { NewPostPage } from './pages/NewPostPage';
import { LogoutPage } from './pages/LogoutPage';
import { EditProfilePage } from './pages/EditProfilePage';

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
        PostPage,
        NewPostPage,
        EditProfilePage,
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