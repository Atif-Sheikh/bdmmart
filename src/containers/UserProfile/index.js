/** @format */

import React, { PureComponent } from "react";
import { View, ScrollView, Text, Switch, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import {
  UserProfileHeader,
  UserProfileItem,
  ModalBox,
  CurrencyPicker,
} from "@components";
import { Languages, Color, Tools, Config, withTheme } from "@common";
import { getNotification } from "@app/Omni";
import _ from 'lodash'
import styles from "./styles";

class UserProfile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pushNotification: false,
      isLoading: true,
    };
  }

  async componentDidMount() {
    const notification = await getNotification();
    this.setState({
      pushNotification: notification || false,
    });
  }

  /**
   * TODO: refactor to config.js file
   */
  _getListItem = () => {
    const { currency, wishListTotal, userProfile } = this.props;

    var listItem = [...Config.ProfileSettings]
    var items = []
    for (var i = 0; i < listItem.length; i++) {
      var item = listItem[i]
        if (item.label == "PushNotification") {
          item.icon = () => (
            <Switch
              onValueChange={this._handleSwitch}
              value={this.state.pushNotification}
              tintColor={Color.blackDivide}
            />
          )
        }
        if (item.label == "Currency") {
          item.value = currency.code
        }

        if (item.label == "WishList") {
          items.push({...item, label: `${Languages.WishList} (${wishListTotal})`})
        }else{
          items.push({...item, label: Languages[item.label]})
        }

    }


    if (!userProfile.user) {
      var index = _.findIndex(items,(item)=>item.label == Languages.Address)
      if (index > -1) {
        items.splice(index, 1)
      }
    }

    if (!userProfile.user || Config.HideCartAndCheckout) {
      var index = _.findIndex(items,(item)=>item.label == Languages.MyOrder)
      if (index > -1) {
        items.splice(index, 1)
      }
    }
    return items;
  };

  _handleSwitch = (value) => {
    AsyncStorage.setItem("@notification", JSON.stringify(value), () => {
      this.setState({
        pushNotification: value,
      });
    });
  };

  _handlePress = (item) => {
    const { navigation } = this.props;
    const { routeName, isActionSheet } = item;

    if (routeName && !isActionSheet) {
      navigation.navigate(routeName, item.params);
    }

    if (isActionSheet) {
      this.currencyPicker.openModal();
    }
  };

  render() {
    const { userProfile, navigation, currency, changeCurrency } = this.props;
    const user = userProfile.user || {};
    const name = Tools.getName(user);
    const listItem = this._getListItem();
    const {
      theme:{
        colors:{
          background, text, lineColor
        }
      }
    } = this.props

    return (
      <View style={[styles.container, {backgroundColor: background}]}>
        <ScrollView ref="scrollView">
          <UserProfileHeader
            onLogin={() => navigation.navigate("LoginScreen")}
            onLogout={() =>
              navigation.navigate("LoginScreen", { isLogout: true })
            }
            user={{
              ...user,
              name,
            }}
          />

          {userProfile.user && (
            <View style={[styles.profileSection, {borderColor: lineColor}]}>
              <Text style={styles.headerSection}>
                {Languages.AccountInformations.toUpperCase()}
              </Text>
              <UserProfileItem
                label={Languages.Name}
                onPress={this._handlePress}
                value={name}
              />
              <UserProfileItem label={Languages.Email} value={user.email} />
              {/*<UserProfileItem label={Languages.Address} value={user.address} />*/}
            </View>
          )}

          <View style={[styles.profileSection, {borderColor: lineColor}]}>
            {listItem.map((item, index) => {
              return (
                item && (
                  <UserProfileItem
                    icon
                    key={index}
                    onPress={() => this._handlePress(item)}
                    {...item}
                  />
                )
              );
            })}
          </View>
        </ScrollView>

        <ModalBox ref={(c) => (this.currencyPicker = c)}>
          <CurrencyPicker currency={currency} changeCurrency={changeCurrency} />
        </ModalBox>
      </View>
    );
  }
}

const mapStateToProps = ({ user, language, currency, wishList }) => ({
  userProfile: user,
  language,
  currency,
  wishListTotal: wishList.wishListItems.length,
});

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/CurrencyRedux");
  return {
    ...ownProps,
    ...stateProps,
    changeCurrency: (currnecy) => actions.changeCurrency(dispatch, currnecy),
  };
}

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(withTheme(UserProfile));
