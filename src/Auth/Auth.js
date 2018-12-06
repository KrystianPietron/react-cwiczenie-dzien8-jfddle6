import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'

import Forms from './Forms'

import { connect } from 'react-redux'
import {
  initAuthChangeAsyncAction,
  logOutAsyncAction,
  onLogInByGoogleAsyncAction,
  logInAsyncAction,
  onEmailChangeAction,
  onPasswordChangeAction
} from '../State/auth';

class Auth extends React.Component {

  componentDidMount() {
    this.props._initAuthChangeAsyncAction()
  }

  render() {
    return (
      this.props._isUserLoggedIn ?
        <div>
          <FloatingActionButton
            style={{
              position: 'fixed',
              top: 10,
              right: 10,
              zIndex: 9999,
              color: 'white'
            }}
            secondary={true}
            onClick={this.props._logOutAsyncAction}
          >
            X
          </FloatingActionButton>
          {this.props.children}
        </div>
        :
        <Forms
          email={this.props._email}
          onEmailChangeHandler={this.props._onEmailChangeAction}
          password={this.props._password}
          onPasswordChangeHandler={this.props._onPasswordChangeAction}
          onLogInClick={this.props._logInAsyncAction}
          onLogInByGoogleClick={this.props._onLogInByGoogleAsyncAction}
        />
    )
  }
}
const mapStateToProps = (state) => ({
  _isUserLoggedIn: state.auth.isUserLoggedIn,
  _email: state.auth.email,
  _password: state.auth.password
})

const mapDispatchToProps = dispatch => ({
  _initAuthChangeAsyncAction: () => dispatch(initAuthChangeAsyncAction()),
  _logOutAsyncAction: () => dispatch(logOutAsyncAction()),
  _onLogInByGoogleAsyncAction: () => dispatch(onLogInByGoogleAsyncAction()),
  _logInAsyncAction: () => dispatch(logInAsyncAction()),
  _onEmailChangeAction: (event) => dispatch(onEmailChangeAction(event.target.value)),
  _onPasswordChangeAction: (event) => dispatch(onPasswordChangeAction(event.target.value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)