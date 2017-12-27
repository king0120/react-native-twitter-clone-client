import React from 'react'
import { AppLoading } from 'expo'
import { UIManager, AsyncStorage } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'styled-components'
import {
  ActionSheetProvider
} from '@expo/react-native-action-sheet'

import { store, client } from './src/store'
import { colors } from './src/utils/constants'
import { login } from './src/actions/user'

import HomeScreen from './src/screens/HomeScreen'
import AppNavigation from './src/navigations'

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default class App extends React.Component {
  state = {
    appReady: false
  }
  componentWillMount () {
    this.checkIfToken()
  }

  checkIfToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@twitteryoutubeclone')
      if (token) {
        store.dispatch(login())
      }
    } catch (err) {
      throw err
    }

    this.setState({ appReady: true })
  }

  render () {
    if (!this.state.appReady) {
      <AppLoading />
    }
    return (
      <ApolloProvider store={store} client={client}>
        <ActionSheetProvider>
          <ThemeProvider theme={colors}>
            <AppNavigation />
          </ThemeProvider>
        </ActionSheetProvider>
      </ApolloProvider>
    )
  }
}
