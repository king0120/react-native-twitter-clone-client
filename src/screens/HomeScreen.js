import React, { Component } from 'react'
import styled from 'styled-components/native'
import { graphql, compose, withApollo } from 'react-apollo'
import FeedCard from '../components/FeedCard/FeedCard'
import { ActivityIndicator, FlatList } from 'react-native'
import { connect } from 'react-redux'

import { getUserInfo } from '../actions/user'

import GET_TWEETS_QUERY from '../graphql/queries/getTweets'
import ME_QUERY from '../graphql/queries/me'

const Root = styled.View`
  backgroundColor: #f2f2f2;
  flex: 1;
`

class HomeScreen extends Component {
  state = {}
  componentDidMount () {
    this.getUserInfo()
  }
  getUserInfo = async () => {
    const { data: { me } } = await this.props.client.query({ query: ME_QUERY })
    this.props.getUserInfo(me)
  }
  renderItem = ({ item }) => <FeedCard {...item} />
  render () {
    const { data } = this.props
    if (data.loading) {
      return (
        <Root>
          <ActivityIndicator size="large"/>
        </Root>
      )
    }
    return (
      <Root>
        <FlatList
          contentContainerStyle={{ alignSelf: 'stretch' }}
          data={data.getTweets}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
        />
      </Root>
    )
  }
}

export default withApollo(compose(
  connect(undefined, { getUserInfo }),
  graphql(ME_QUERY),
  graphql(GET_TWEETS_QUERY)
)(HomeScreen))
