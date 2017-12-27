import React, { Component } from 'react'
import styled from 'styled-components/native'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import { connectActionSheet } from '@expo/react-native-action-sheet'
import Loading from './Loading'
import ButtonHeader from './ButtonHeader'

import { logout } from '../actions/user'

const AVATAR_SIZE = 30
const AVATAR_RADIUS = AVATAR_SIZE / 2

const Avatar = styled.Image`
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
  borderRadius: ${AVATAR_RADIUS}
`



class HeaderAvatar extends Component {
  state = {}

  onOpenActionSheet = () => {
    const destructiveButtonIndex = 0
    const cancelButtonIndex = 1
    this.props.showActionSheetWithOptions({
      options: [ 'Log Out', 'Cancel' ],
      destructiveButtonIndex,
      cancelButtonIndex
    }, buttonIndex => {
      if (buttonIndex === destructiveButtonIndex) {
        this.props.client.resetStore()
        this.props.logout()
      }
    })
  }
  render () {

    if (!this.props.info) {
      return (
        <ButtonHeader side="left" disabled>
          <Loading size="small" />
        </ButtonHeader>
      )
    }
    return (
      <ButtonHeader side="left" onPress={this.onOpenActionSheet}>
        <Avatar source={{ uri: this.props.info.avatar }} />
      </ButtonHeader>
    )
  }
}


function mapStateToProps (state) {
  return {
    info: state.user.info
  }
}

export default withApollo(connect(
  mapStateToProps,
  { logout }
)(connectActionSheet(HeaderAvatar)))
