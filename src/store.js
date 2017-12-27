import { createStore, applyMiddleware } from 'redux'
import { AsyncStorage } from 'react-native'
import { composeWithDevTools } from 'redux-devtools-extension'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import reducers from './reducers'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/graphql'
})

networkInterface.use([ {
  async applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    try {
      const token = await AsyncStorage.getItem('@twitteryoutubeclone')
      console.log(token)
      if (token != null) {
        req.options.headers.authorization = `Bearer ${token}` || null
      }
    } catch (err) {
      throw err
    }

    return next()
  }
} ])

export const client = new ApolloClient({
  networkInterface
})

const middleware = [ client.middleware(), thunk, createLogger() ]

export const store = createStore(
  reducers(client),
  undefined,
  composeWithDevTools(applyMiddleware(...middleware))
)
