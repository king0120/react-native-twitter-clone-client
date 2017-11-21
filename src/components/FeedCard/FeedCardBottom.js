import React from 'react';
import styled from 'styled-components/native';
import { SimpleLineIcons, Entypo } from '@expo/vector-icons';
import Touchable from '@appandflow/touchable';
import { colors } from '../../utils/constants';
const Root = styled.View`
  height: 40;
  flexDirection: row;
`;

const Button = styled(Touchable).attrs({
  feedback: 'opacity'
})`
  flex: 1;
  flexDirection: row;
  justifyContent: space-around;
  paddingHorizontal: 32px;
  alignItems: center;
`;

const ButtonText = styled.Text`
  fontSize: 14;
  fontWeight: 500;
  color: ${props => props.theme.LIGHT_GRAY}
`;

const favoriteCount = 3;
const isFavorited = true;

const FeedCardBottom = () => {
  return (
    <Root>
      <Button>
        <SimpleLineIcons name="bubble" size={20} color={colors.LIGHT_GRAY}/>
        <ButtonText>
          {favoriteCount}
        </ButtonText>
      </Button>
      <Button>
        <Entypo name="retweet" size={20} color={colors.LIGHT_GRAY}/>
        <ButtonText>
          {favoriteCount}
        </ButtonText>
      </Button>
      <Button>
        <Entypo name={isFavorited ? 'heart' : 'heart-outlined'} size={20} color={isFavorited ? 'red' : colors.LIGHT_GRAY}/>
        <ButtonText>
          {favoriteCount}
        </ButtonText>
      </Button>
    </Root>
  );
};

export default FeedCardBottom;
