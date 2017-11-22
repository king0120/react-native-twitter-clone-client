import React from 'react';
import styled from 'styled-components/native';

import FeedCardHeader from './FeedCardHeader';
import FeedCardBottom from './FeedCardBottom';

const Root = styled.View`
  minHeight: 180;
  backgroundColor: ${props => props.theme.WHITE};
  width: 100%;
  alignSelf: stretch;
  padding: 7px;
  shadowColor: ${props => props.theme.SECONDARY};
  shadowOffset: 0 2px;
  shadowRadius: 2;
  shadowOpacity: 0.1;
  marginVertical: 5;
`;

const CardContentContainer = styled.View`
  flex: 1;
`;

const CardContentText = styled.Text`
  fontSize: 14;
  textAlign: left;
  fontWeight: 500;
  color: ${props => props.theme.SECONDARY}
`;

const FeedCard = ({text, createdAt, user, favoriteCount}) => {
  return (
    <Root>
      <FeedCardHeader createdAt={createdAt} {...user} />
      <CardContentContainer>
        <CardContentText>
          {text}
        </CardContentText>
      </CardContentContainer>
      <FeedCardBottom favoriteCount={favoriteCount} />
    </Root>
  );
};

export default FeedCard;
