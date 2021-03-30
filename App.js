/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';
import NavBar from './src/utils/Navbar';
import Chats from './src/containers/Chats';
import Calls from './src/containers/Calls';
import Events from './src/containers/Events';
import Meet from './src/containers/Meet';
import Login from './src/containers/Login';
import Register from './src/containers/Register';
import SingleChat from './src/containers/SingleChat';
import GeorgianContacts from './src/containers/GeorgianContacts';
import SplashScreen from './src/containers/SplashScreen';
import CreateEvent from './src/containers/CreateEvent';

export default class App extends Component {
  render() {
    return (
      <Router
        titleStyle={{
          color: '#fff',
          fontSize: 20,
          fontWeight: 'bold',
        }}
        navigationBarStyle={{
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: 'green',
          height: 50,
        }}>
        <Stack navTransparent={1} navBar={NavBar}>
          <Scene key="splash" component={SplashScreen} hideNavBar={true} />
          <Scene key="login" component={Login} hideNavBar={true} />
          <Scene key="register" component={Register} hideNavBar={true} />
          <Scene key="singlechat" component={SingleChat} hideNavBar={true} />
          <Scene key="contacts" component={GeorgianContacts} />
          <Scene key="createEvent" component={CreateEvent} hideNavBar={true} />
          <Scene
            key="home"
            tabs={true}
            default="Chats"
            animationEnabled={true}
            activeTintColor="green"
            inactiveTintColor="black"
            tabBarStyle={{elevation: 0, backgroundColor: '#fff', height: 50}}
            tabBarPosition="top"
            indicatorStyle={{
              borderBottomColor: 'green',
              borderBottomWidth: 4,
            }}
            labelStyle={{
              fontSize: 14,
              fontWeight: 'bold',
            }}>
            <Scene
              key="chats"
              component={Chats}
              hideNavBar={true}
              title="Chats"
            />
            <Scene
              key="events"
              initial={true}
              component={Events}
              hideNavBar={true}
              title="Events"
            />
            <Scene
              key="calls"
              component={Calls}
              hideNavBar={true}
              title="Calls"
            />
            <Scene key="meet" component={Meet} hideNavBar={true} title="Meet" />
          </Scene>
        </Stack>
      </Router>
    );
  }
}
