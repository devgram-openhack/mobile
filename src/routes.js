import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator }  from 'react-navigation-stack';

import { Drawer } from './components/Drawer';

import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { MainPage } from './pages/MainPage';
import { ProfilePage } from './pages/ProfilePage';
import { EditProfilePage } from './pages/EditProfilePage';
import { PostPage } from './pages/PostPage';
import { EditPostPage } from './pages/EditPostPage';
import { HackathonsPage } from './pages/HackathonsPage';
import { NewPostPage } from './pages/NewPostPage';
import { TeamsPage } from './pages/TeamsPage';
import { TeamPage } from './pages/TeamPage';
import { EditTeamPage } from './pages/EditTeamPage';
import { TeamMateSearchPage } from './pages/TeamMateSearchPage';
import { PendingInvitesPage } from './pages/PendingInvitesPage';
import { AboutPage } from './pages/AboutPage';
import { LogoutPage } from './pages/LogoutPage';

import { sizes } from './styles/sizes';

const DrawerNavigator = routes => createDrawerNavigator(routes, {
  contentComponent: Drawer,
  drawerWidth: sizes['200'],
});

const StackNavigator = routes => createStackNavigator(routes, {
  headerMode: 'none'
});

const Routes = createAppContainer(
  createSwitchNavigator({
    LandingPage,
    Auth: StackNavigator({
      AuthPage,
      LoginPage,
      RegisterPage,
    }),
    App: DrawerNavigator({
      Home: StackNavigator({
        MainPage,
        ProfilePage,
        EditProfilePage,
        PostPage,
        EditPostPage,
        HackathonsPage,
        NewPostPage,
        TeamsPage,
        TeamPage,
        EditTeamPage,
        TeamMateSearchPage,
        PendingInvitesPage,
        AboutPage,
        LogoutPage,
      }),
    }),
  })
);

export { Routes };