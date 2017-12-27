import React, { Component } from 'react'
import styled from 'styled-components/native'
import { Platform } from 'react-native'
import { colors } from '../utils/constants'

const Root = styled.View`
  backgroundColor: ${props => props.theme.WHITE};
  flex: 1;
  alignItems: center;
`

const Wrapper = styled.View`
  height: 80%;
  width: 90%;
  paddingTop: 5;
`

const Input = styled.TextInput.attrs({
  multiline: true,
  placeholder: 'What\'s Happening?',
  maxLength: 140,
  selectionColor: Platform.OS === 'ios' && colors.PRIMARY
})`
  height: 40%;
  width: 100%;
  fontSize: 18;
  color: ${props => props.theme.SECONDARY}
`

const T = styled.Text``

class NewTweetScreen extends Component {
  state = {}

  render () {
    return (
      <Root>
        <Wrapper>
          <Input />
        </Wrapper>
      </Root>
    )
  }
}

export default NewTweetScreen
