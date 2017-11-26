import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';

const Root = styled.View`
  flex: 1;
  backgroundColor: ${props => props.theme.SECONDARY};
  position: relative;
`;

const ButtonText = styled.Text`
  color: ${props => props.theme.WHITE};
  fontWeight: bold;
  fontSize: 20;
`;

const ButtonLogin = styled(Touchable).attrs({
  feedback: 'opacity'
})`
  height: 75;
  width: 150;
  backgroundColor: ${props => props.theme.PRIMARY};
  justifyContent: center;
  alignItems: center;
  position: absolute;
  top: 30%;
  right: 0;
  borderTopLeftRadius: 20;
  borderBottomLeftRadius: 20;
  shadowOpacity: 0.4;
  shadowRadius: 5;
  shadowOffset: 0px 4px;
  shadowColor: #000;
`;

const BottomTextContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200;
  justifyContent: center;
  alignItems: center;
`;

const Button = styled(Touchable).attrs({
  feedback: 'opacity'
})`
  justifyContent: center;
  alignItems: center;
`;

const ButtonLoginText = styled.Text`
  color: ${props => props.theme.WHITE};
  fontWeight: 400;
  fontSize: 16;
`;

class AuthScreen extends Component {
  state = {}

  render () {
    return (
      <Root>
        <ButtonLogin>
          <ButtonText>Get Started</ButtonText>
        </ButtonLogin>
        <BottomTextContainer>
          <Button>
          <ButtonLoginText> Already have an account? </ButtonLoginText>
          </Button>
        </BottomTextContainer>
      </Root>
    );
  }
}

export default AuthScreen;
