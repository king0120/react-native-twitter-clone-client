import React from 'react';
import styled from 'styled-components/native';

import FeedCardHeader from './FeedCardHeader';
import FeedCardBottom from './FeedCardBottom';

const Root = styled.View`
  minHeight: 180;
  backgroundColor: ${props => props.theme.WHITE};
  width: 100%;
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

const text = 'Lorem ipsum dolor, sit amet consectetur. Lorem ipsum dolor, sit amet consectetur. Lorem ipsum dolor, sit amet consectetur';
const FeedCard = () => {
  return (
    <Root>
      <FeedCardHeader/>
      <CardContentContainer>
        <CardContentText>
          {text}
        </CardContentText>
      </CardContentContainer>
      <FeedCardBottom />
    </Root>
  );
};

export default FeedCard;
