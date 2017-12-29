import React, { Component } from 'react'
import styled from 'styled-components/native'
import { Platform, Keyboard } from 'react-native'
import { colors } from '../utils/constants'
import Touchable from '@appandflow/touchable'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'

import CREATE_TWEET_MUTATION from '../graphql/mutations/createTweet'
import GET_TWEETS_QUERY from '../graphql/queries/getTweets'

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

  onCreateTweetPress = async () => {
    await this.props.mutate({
      variables: {
        text: this.state.text
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createTweet: {
          __typename: 'Tweet',
          text: this.state.text,
          favoriteCount: 0,
          _id: Math.round(Math.random() * -1000000000),
          createdAt: new Date(),
          user: {
            __typename: 'User',
            ...this.props.user
          }
        }
      },
      update: (store, { data: { createTweet } }) => {
        const data = store.readQuery({ query: GET_TWEETS_QUERY })
        if (!data.getTweets.find(t => t._id === createTweet._id)) {
          store.writeQuery({ query: GET_TWEETS_QUERY, data: { getTweets: [ { ...createTweet }, ...data.getTweets ] } })
        }
      }
    })
    Keyboard.dismiss()
    this.props.navigation.goBack(null)
  }

  get textLength () {
    console.log(this.state.text)
    return 140 - this.state.text.length
  }

  get buttonDisabled () {
    return this.state.text.length < 5
  }
  render () {
    return (
      <Root>
        <Wrapper>
          <Input value={this.state.text} onChangeText={this.onChangeText} />
          <TextLength>
            {this.textLength}
          </TextLength>
          <TweetButton onPress={this.onCreateTweetPress} disabled={this.buttonDisabled}>
            <TweetButtonText>
              Tweet
            </TweetButtonText>
          </TweetButton>
        </Wrapper>
      </Root>
    )
  }
}

export default compose(
  graphql(CREATE_TWEET_MUTATION),
  connect(state => ({ user: state.user.info }))
)(NewTweetScreen)
