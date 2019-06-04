/** @format */

import React from "react";
import {
  View,
  Platform,
  Image,
  TouchableOpacity,
  I18nManager,
  Animated
} from "react-native";
import { isEmpty } from "lodash";
import { Styles, Events, Images, Config } from "@common";
import { NavigationBarIcon, CartIcons } from "@components";
import { toggleDrawer } from "@app/Omni";

const isDark = Config.Theme.isDark

const NavBarLogo = (props) => {
  const scrollAnimation =
    props && !isEmpty(props.navigation)
      ? props.navigation.getParam("animatedHeader")
      : new Animated.Value(1);

  return (
    <Animated.Image
      source={Config.LogoImage}
      style={[Styles.Common.logo, { opacity: scrollAnimation }, isDark && {tintColor: '#fff'}]}
    />
  );
};

const NavBarText = (props) => {
  const scrollAnimation =
    props && !isEmpty(props.navigation)
      ? props.navigation.getParam("animatedHeader")
      : new Animated.Value(1);

  return (
    <Animated.Text
      style={[Styles.Common.headerText, { opacity: scrollAnimation }, isDark ? {color: '#fff'} : {color: '#333'}]}>
        {props.text}
      </Animated.Text>
  );
};

// Icons for HeaderBar
const Logo = () => (
  <Image source={Config.LogoImage} style={Styles.Common.logo} />
);

const hitSlop = { top: 20, right: 20, bottom: 20, left: 20 };
const Menu = () => (
  <TouchableOpacity hitSlop={hitSlop} onPress={toggleDrawer}>
    <Image
      source={Images.icons.home}
      style={[
        Styles.Common.toolbarIcon,
        isDark && {tintColor: '#fff'},
        I18nManager.isRTL && {
          transform: [{ rotate: "180deg" }],
        },
      ]}
    />
  </TouchableOpacity>
);

const EmptyView = () => (
  <View
    style={[
      Styles.Common.Row,
      I18nManager.isRTL ? { left: -10 } : { right: -5 },
      Platform.OS !== "ios" && { right: -12 },
    ]}
  />
);

const HeaderRight = (navigation) => (
  <View
    style={[
      Styles.Common.Row,
      I18nManager.isRTL ? { left: -10 } : { right: -5 },
      Platform.OS !== "ios" && { right: -12 },
    ]}>
    <NavigationBarIcon
      icon={Images.IconSearch}
      size={17}
      onPress={() => navigation.navigate("Search")}
    />
  </View>
);

const HeaderHomeRight = (navigation, item) => (
  <View
    style={[
      Styles.Common.Row,
      // I18nManager.isRTL ? { left: -10 } : { right: 5 },
      Platform.OS !== "ios" && { right: -12 },
    ]}>
    <NavigationBarIcon
      icon={Images.IconGrid}
      size={17}
      onPress={Events.openModalLayout}
    />
  </View>
);

const CartWishListIcons = (navigation) => <CartIcons navigation={navigation} />;

const Back = (navigation, iconBack) => (
  <TouchableOpacity
    hitSlop={hitSlop}
    onPress={() => {
      navigation.goBack(null);
    }}>
    <Image
      source={iconBack || Images.icons.back}
      style={[
        Styles.Common.toolbarIcon,
        iconBack && Styles.Common.iconBack,
        isDark && {tintColor: '#fff'},
        I18nManager.isRTL && {
          transform: [{ rotate: "180deg" }],
        },
      ]}
    />
  </TouchableOpacity>
);

const RightIcon = (icon, onPress) => (
  <View
    style={[
      Styles.Common.Row
    ]}>
    <NavigationBarIcon
      icon={icon}
      size={24}
      onPress={onPress}
      color={isDark ? "#fff" : "#000"}
    />
  </View>
);

export {
  Logo,
  Menu,
  HeaderRight,
  EmptyView,
  CartWishListIcons,
  HeaderHomeRight,
  Back,
  NavBarLogo,
  RightIcon,
  NavBarText
};
