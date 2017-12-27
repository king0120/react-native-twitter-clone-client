import {AsyncStorage} from 'react-native'

export function login () {
  return {
    type: 'LOGIN'
  }
}


export const getUserInfo = info => {
  return {
    type: 'GET_USER_INFO',
    info
  }
}

export const logout = () => {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem('@twitteryoutubeclone')
      return dispatch({ type: 'LOGOUT' })
    } catch (err) {
      throw err
    }
  }
}
