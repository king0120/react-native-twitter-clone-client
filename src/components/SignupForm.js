import React, { Component } from 'react'
import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'
import { Platform, Keyboard, AsyncStorage } from 'react-native'
import Touchable from '@appandflow/touchable'
import { colors } from '../utils/constants'
import {connect} from 'react-redux'
import { graphql, compose } from 'react-apollo'
import { login } from '../actions/user'
import Loading from './Loading'

import SIGNUP_MUTATION from '../graphql/mutations/signup'

const Root = styled(Touchable).attrs({
  feedback: 'none'
})`
  flex: 1;
  position: relative;
  alignItems: center;
`

const Wrapper = styled.View`
  alignSelf: center;
  alignItems: center;
  justifyContent: center;
  width: 90%;
  height: 100%;
`

const BackButton = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, bottom: 20, right: 20, left: 20 }
})`
  justifyContent: center;
  alignItems: center;
  position: absolute;
  top: 5%;
  left: 5%;
  zIndex: 1;
`

const ButtonConfirm = styled(Touchable).attrs({
  feedback: 'opacity'
})`
  position: absolute;
  bottom: 15%;
  width: 70%;
  height: 50;
  backgroundColor: ${props => props.theme.PRIMARY};
  borderRadius: 10;
  justifyContent: center;
  alignItems: center;
  shadowColor: #000;
  shadowRadius: 5;
  shadowOffset: 0px 2px;
  shadowOpacity: 0.2;
  elevation: 2;
`

const ButtonConfirmText = styled.Text`
  color: ${props => props.theme.WHITE};
  fontWeight: 600;
`

const InputWrapper = styled.View`
  height: 50;
  width: 80%;
  borderBottomWidth: 2;
  borderBottomColor: ${props => props.theme.LIGHT_GRAY};
  marginVertical: 5;
  justifyContent: flex-end;
`

const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.LIGHT_GRAY,
  selectionColor: Platform.OS === 'ios' ? colors.PRIMARY : undefined,
  autoCorrect: false,
  autoCapitalize: 'none'
})`
  height: 30;
  width: 100%;
  color: ${props => props.theme.LIGHT_GRAY};
`

class SignupForm extends Component {
  state = {
    fullName: '',
    email: '',
    password: '',
    username: '',
    loading: false
  }

  onOutsidePress = () => Keyboard.dismiss();

  onChangeText = (text, type) => this.setState({[type]: text});

  checkIfDisabled () {
    const {fullName, email, password, username} = this.state

    return (!fullName || !email || !password || !username)
  }

  onSignupPress = async () => {
    this.setState({loading: true})
    const { fullName, email, password, username } = this.state
    const avatar = 'http://www.fillmurray.com/100/100'

    try {
      const { data } = await this.props.mutate({
        variables: {
          fullName,
          email,
          password,
          username,
          avatar
        }
      })

      await AsyncStorage.setItem('@twitteryoutubeclone', data.signup.token)
      const keys = await AsyncStorage.getAllKeys()
      console.log(keys)
      this.setState({loading: false})
      return this.props.login()
    } catch (err) {
      throw err
    }
  }

  render () {
    if (this.state.loading) {
      return <Loading />
    }
    return (
      <Root onPress={this.onOutsidePress}>
        <BackButton onPress={this.props.onBackPress}>
          <MaterialIcons color={colors.WHITE} size={30} name="arrow-back"/>
        </BackButton>
        <Wrapper>
          <InputWrapper>
            <Input
              placeholder="Full Name"
              autoCapitalize="words"
              onChangeText={text => this.onChangeText(text, 'fullName')}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="E-Mail"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => this.onChangeText(text, 'email')}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="Password"
              secureTextEntry
              onChangeText={text => this.onChangeText(text, 'password')}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="Username"
              onChangeText={text => this.onChangeText(text, 'username')}
            />
          </InputWrapper>
          <ButtonConfirm onPress={this.onSignupPress} disabled={this.checkIfDisabled()}>
            <ButtonConfirmText>
              Sign Up
            </ButtonConfirmText>
          </ButtonConfirm>
        </Wrapper>
      </Root>
    )
  }
}

export default compose(
  graphql(SIGNUP_MUTATION),
  connect(undefined, { login })
)(SignupForm)
