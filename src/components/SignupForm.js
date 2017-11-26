import React, { Component } from 'react';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform, Keyboard } from 'react-native';
import Touchable from '@appandflow/touchable';
import { colors } from '../utils/constants';

const Root = styled(Touchable).attrs({
  feedback: 'none'
})`
  flex: 1;
  position: relative;
  alignItems: center;
`;

const Wrapper = styled.View`
  alignSelf: center;
  alignItems: center;
  justifyContent: center;
  width: 90%;
  height: 100%;
`;

const BackButton = styled(Touchable).attrs({
  feedback: 'opacity'
})`
  justifyContent: center;
  alignItems: center;
  position: absolute;
  top: 5%;
  left: 5%;
`;

const ButtonConfirm = styled(Touchable).attrs({
  feedback: 'opacity'
})`
  position: absolute;
  bottom: 15%;
  width: 70%;
  height: 50;
  backgroundColor: ${props => props.theme.PRIMARY};
  borderRadius: 10;
  justifyContent: center;
  alignItems: center;
  shadowColor: #000;
  shadowRadius: 5;
  shadowOffset: 0px 2px;
  shadowOpacity: 0.2;
  elevation: 2;
`;

const ButtonConfirmText = styled.Text`
  color: ${props => props.theme.WHITE};
  fontWeight: 600;
`;

const InputWrapper = styled.View`
  height: 50;
  width: 80%;
  borderBottomWidth: 2;
  borderBottomColor: ${props => props.theme.LIGHT_GRAY};
  marginVertical: 5;
  justifyContent: flex-end;
`;

const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.LIGHT_GRAY,
  selectionColor: Platform.OS === 'ios' ? colors.PRIMARY : undefined,
  autoCorrect: false,
  autoCapitalize: 'none'
})`
  height: 30;
  width: 100%;
  color: ${props => props.theme.LIGHT_GRAY};
`;

class SignupForm extends Component {

  onOutsidePress = () => Keyboard.dismiss();

  render () {
    return (
      <Root onPress={this.onOutsidePress}>
        <BackButton onPress={this.props.onBackPress}>
          <MaterialIcons color={colors.WHITE} size={30} name="arrow-back"/>
        </BackButton>
        <Wrapper>
          <InputWrapper>
            <Input placeholder="Full Name" />
          </InputWrapper>
          <InputWrapper>
            <Input placeholder="E-Mail" />
          </InputWrapper>
          <InputWrapper>
            <Input placeholder="Password" />
          </InputWrapper>
          <InputWrapper>
            <Input placeholder="Username" />
          </InputWrapper>
          <ButtonConfirm>
            <ButtonConfirmText>
              Sign Up
            </ButtonConfirmText>
          </ButtonConfirm>
        </Wrapper>
      </Root>
    );
  }
}

export default SignupForm;
