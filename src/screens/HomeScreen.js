import React, { Component } from 'react';
import styled from 'styled-components/native';
import { graphql } from 'react-apollo';
import FeedCard from '../components/FeedCard/FeedCard';
import { ActivityIndicator, FlatList } from 'react-native';
import GET_TWEETS_QUERY from '../graphql/queries/getTweets';

const Root = styled.View`
  backgroundColor: #f2f2f2;
  flex: 1;
`;

const List = styled.ScrollView``;

class HomeScreen extends Component {
  state = {}

  renderItem = ({item}) => <FeedCard {...item} />
  render () {
    const {data} = this.props;
    if (data.loading) {
      return (
        <Root>
          <ActivityIndicator size="large"/>
        </Root>
      );
    }
    return (
      <Root>
        <FlatList
          contentContainerStyle={{alignSelf: 'stretch'}}
          data={data.getTweets}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
        />
      </Root>
    );
  }
}

export default graphql(GET_TWEETS_QUERY)(HomeScreen);
