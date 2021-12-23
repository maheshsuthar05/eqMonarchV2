import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import * as userActions from 'app/auth/store/actions';
import { contextInfo } from 'app/common/helpers/common-helper';
import {
  contextResourceStart,
  navigationResourceStart
} from 'app/common/store/actions';
import * as Actions from 'app/store/actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import history from '@history';
import { forgerock } from 'app/config/api';

class Auth extends Component {
  state = {
    waitAuthCheck: true
  };

  componentDidMount() {
    const contextData = contextInfo();
    if (contextData.jwtToken !== '') {
      this.props.navigationResourceStart({
        tenantCode: contextData.tenantCode,
        realm: this.props.realm,
        from: 'AUTH'
      });
      const pathName = this.props.children?.props?.history?.location?.pathname;
      this.props.contextResourceStart({
        tenantCode: contextData.tenantCode,
        realm: this.props.realm,
        url: pathName
      });
    }
    const url = this.props.realm
      ? forgerock.api.PostLogoutUrl(
          this.props.realm.slice(1),
          window.location.host,
          window.location.protocol
        )
      : '/login';
    if (
      contextData.iPlanetDirectoryPro === '' ||
      contextData.iPlanetDirectoryPro === undefined
    ) {
      history.push(url);
    }

    return Promise.all([]).then(() => {
      this.setState({ waitAuthCheck: false });
    });
  }

  render() {
    return this.state.waitAuthCheck ? (
      <FuseSplashScreen />
    ) : (
      <>{this.props.children}</>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: userActions.logoutUser,
      setUserData: userActions.setUserData,
      showMessage: Actions.showMessage,
      hideMessage: Actions.hideMessage,
      navigationResourceStart: navigationResourceStart,
      contextResourceStart: contextResourceStart
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    realm: state.auth.user.realm
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
