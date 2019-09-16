import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator }  from 'react-navigation-stack';

import { MainPage } from './pages/MainPage';
import { PostPage } from './pages/PostPage';

const Routes = createAppContainer(
  createDrawerNavigator({
    Home: createStackNavigator({
      MainPage,
      PostPage
    }, {
      headerMode: 'none'
    })
  })
);

export { Routes };