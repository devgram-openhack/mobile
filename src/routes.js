import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator }  from 'react-navigation-stack';

import { MainPage } from './pages/MainPage';
import { PostPage } from './pages/PostPage';
import { NewPostPage } from './pages/NewPostPage';
import { ProfilePage } from './pages/ProfilePage';

const Routes = createAppContainer(
  createDrawerNavigator({
    Home: createStackNavigator({
      MainPage,
      PostPage,
      NewPostPage,
      ProfilePage
    }, {
      headerMode: 'none'
    })
  })
);

export { Routes };