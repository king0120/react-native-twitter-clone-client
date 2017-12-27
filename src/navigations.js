import React, { Component } from 'react'
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import { FontAwesome, SimpleLineIcons, EvilIcons } from '@expo/vector-icons'
import { Keyboard } from 'react-native'
import HomeScreen from './screens/HomeScreen'
import ExploreScreen from './screens/ExploreScreen'
import NotificationsScreen from './screens/NotificationsScreen'
import ProfileScreen from './screens/ProfileScreen'
import NewTweetScreen from './screens/NewTweetScreen'
import AuthScreen from './screens/AuthScreen'
import HeaderAvatar from './components/HeaderAvatar'
import ButtonHeader from './components/ButtonHeader'

import { colors } from './utils/constants'

const Tabs = TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      headerTitle: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome size={20} color={tintColor} name="home" />
      )
    })
  },
  Explore: {
    screen: ExploreScreen,
    navigationOptions: () => ({
      headerTitle: 'Explore',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome size={20} color={tintColor} name="search" />
      )
    })
  },
  Notification: {
    screen: NotificationsScreen,
    navigationOptions: () => ({
      headerTitle: 'Notification',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome size={20} color={tintColor} name="bell" />
      )
    })
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      headerTitle: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome size={20} color={tintColor} name="user" />
      )
    })
  }
}, {
  lazy: true,
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: colors.PRIMARY,
    inactiveTintColor: colors.LIGHT_GRAY,
    style: {
      backgroundColor: colors.WHITE,
      height: 50,
      paddingVertical: 5
    }
  }
})

const NewTweetModal = StackNavigator({
  NewTweet: {
    screen: NewTweetScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderAvatar />,
      headerRight: (
        <ButtonHeader side="right" onPress={() => {
          Keyboard.dismiss()
          navigation.goBack(null)
        }}>
          <EvilIcons color={colors.PRIMARY} size={25} name="close"/>
        </ButtonHeader>
      )
    })
  }
}, {
  headerMode: 'none'
})

const AppMainNav = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <HeaderAvatar />,
      headerRight: (
        <ButtonHeader side="right" onPress={() => navigation.navigate('NewTweet')}>
          <SimpleLineIcons color={colors.PRIMARY} size={20} name="pencil" />
        </ButtonHeader>
      )
    })
  },
  NewTweet: {
    screen: NewTweetModal
  }
}, {
  cardStyle: {
    backgroundColor: '#F1F6FA'
  },
  navigationOptions: () => ({
    headerStyle: {
      backgroundColor: colors.WHITE
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: colors.SECONDARY
    }
  })
})

class AppNavigator extends Component {
  render () {
    const nav = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav
    })
    console.log(this.props)
    if (!this.props.user.isAuthenticated) {
      return <AuthScreen />
    }
    return (
      <AppMainNav navigation={nav} />
    )
  }
}

export default connect(state => ({
  nav: state.nav,
  user: state.user
}))(AppNavigator)

export const router = AppMainNav.router
