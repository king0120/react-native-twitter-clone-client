import React, { Component } from 'react'
import styled from 'styled-components/native'
import { Platform } from 'react-native'
import { colors } from '../utils/constants'
import Touchable from '@appandflow/touchable'

const Root = styled.View`
  backgroundColor: ${props => props.theme.WHITE};
  flex: 1;
  alignItems: center;
`

const Wrapper = styled.View`
  height: 80%;
  width: 90%;
  paddingTop: 5;
  position: relative;
`

const Input = styled.TextInput.attrs({
  multiline: true,
  placeholder: 'What\'s Happening?',
  maxLength: 140,
  selectionColor: Platform.OS === 'ios' && colors.PRIMARY,
  autoFocus: true
})`
  height: 40%;
  width: 100%;
  fontSize: 18;
  color: ${props => props.theme.SECONDARY}
`

const TextLength = styled.Text`
  fontSize: 18;
  color: ${props => props.theme.PRIMARY};
  position: absolute;
  top:45%;
  right: 5%;
`

const TweetButton = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, left: 20, right: 20, bottom: 20 }
})`
  backgroundColor: ${props => props.theme.PRIMARY};
  justifyContent: center;
  alignItems: center;
  width: 80;
  height: 40;
  borderRadius: 20;
  position: absolute;
  right: 0;
  top: 60%;
`

const TweetButtonText = styled.Text`
  color: ${props => props.theme.WHITE};
  fontSize: 16;
`

class NewTweetScreen extends Component {
  state = {
    text: ''
  }
  onChangeText = text => this.setState({ text })

  get textLength () {
    console.log(this.state.text)
    return 140 - this.state.text.length
  }
  render () {
    return (
      <Root>
        <Wrapper>
          <Input value={this.state.text} onChangeText={this.onChangeText} />
          <TextLength>
            {this.textLength}
          </TextLength>
          <TweetButton>
            <TweetButtonText>
              Tweet
            </TweetButtonText>
          </TweetButton>
        </Wrapper>
      </Root>
    )
  }
}

export default NewTweetScreen
