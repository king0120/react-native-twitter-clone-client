import React from 'react';
import styled from 'styled-components/native';

const AVATAR_SIZE = 40;
const AVATAR_RADIUS = AVATAR_SIZE/2;
const AVATAR = "https://pbs.twimg.com/profile_images/897192565363154947/OIQGaywa_bigger.jpg";
const Root = styled.View`
  height: 50;
  flex-direction: row;
  align-items: center;
`;

const AvatarContainer = styled.View`
  flex: 0.2;
  justifyContent: center;
  alignSelf: stretch;
`;

const Avatar = styled.Image`
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
  borderRadius: ${AVATAR_RADIUS};
`;

const MetaContainer = styled.View`
  flex: 1;
  alignSelf: stretch;
`;

const MetaTopContainer = styled.View`
  flex: 1;
  flex-direction: row;
  alignItems: center;
  justify-content: flex-start;
  alignSelf: stretch;
`;

const MetaBottomContainer = styled.View`
  flex: 0.8;
  alignSelf: stretch;
  alignItems: flex-start;
  justifyContent: center;
`;

const MetaFullName = styled.Text`
  fontSize: 16;
  fontWeight: bold;
  color: ${props => props.theme.SECONDARY}
`;

const MetaText = styled.Text`
  fontSize: 14;
  fontWeight: 600;
  color: ${props => props.theme.LIGHT_GRAY}
`;

const FeedCardHeader = () => {
  return (
    <Root>
      <AvatarContainer>
        <Avatar source={{uri: AVATAR}}/>
      </AvatarContainer>
      <MetaContainer>
        <MetaTopContainer>
          <MetaFullName>
            Jamie King
          </MetaFullName>
          <MetaText style={{marginLeft: 5}}>
            @jamieking
          </MetaText>
        </MetaTopContainer>
        <MetaBottomContainer>
          <MetaText>
            2 Days Ago
          </MetaText>
        </MetaBottomContainer>
      </MetaContainer>
    </Root>
  );
};

export default FeedCardHeader;
