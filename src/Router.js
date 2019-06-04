/**
 * Created by InspireUI on 19/02/2017.
 *
 * @format
 */

import React from "react";
import PropTypes from "prop-types";
import { View, StatusBar, NetInfo } from "react-native";
import { Config, Device, Styles, withTheme } from "@common";
import { MyToast, MyNetInfo } from "@containers";
import { AppIntro, ModalReview } from "@components";
import Navigation from "@navigation";
import { connect } from "react-redux";

import MenuSide from "@components/LeftMenu/MenuOverlay";
// import MenuSide from '@components/LeftMenu/MenuSmall';
// import MenuSide from '@components/LeftMenu/MenuWide';

import { toast, closeDrawer } from "./Omni";

@withTheme
class Router extends React.PureComponent {
  state = {
    loading: true
  }

  static propTypes = {
    introStatus: PropTypes.bool,
  };

  goToScreen = (routeName, params) => {
    if (!this.navigator) {
      return toast("Cannot navigate");
    }
    this.navigator.dispatch({ type: "Navigation/NAVIGATE", routeName, params });
    closeDrawer();
  };

  render() {
    const {
      theme: {
        colors: { background },
      },
    } = this.props;

    if (!this.props.introStatus) {
      return <AppIntro />;
    }

    if (this.state.loading) {
      return <View />
    }

    return (
      <MenuSide
        goToScreen={this.goToScreen}
        routes={
          <View style={[Styles.app, {backgroundColor: background} ]}>
            <StatusBar
              barStyle={Config.Theme.isDark ?"light-content" : "dark-content"}
              animated={true}
              hidden={Device.isIphoneX ? false : !Config.showStatusBar}
            />
            <MyToast />
            <Navigation ref={(comp) => (this.navigator = comp)} />
            <ModalReview />
            <MyNetInfo />
          </View>
        }
      />
    );
  }

  componentWillMount(){
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      this.props.updateConnectionStatus(connectionInfo.type != "none")
      this.setState({loading: false})
    });
  }
}

const mapStateToProps = (state) => {
  return {
    netInfo: state.netInfo,
    introStatus: state.user.finishIntro,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("@redux/NetInfoRedux");

  return {
    updateConnectionStatus: (isConnected) =>
      dispatch(actions.updateConnectionStatus(isConnected)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Router);
