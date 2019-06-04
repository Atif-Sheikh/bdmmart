/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { TrackOrder } from '@containers';
import { View, Text } from 'react-native';
import { Color, Styles } from "@common";
import { Back, EmptyView } from "./IconNav";


export default class TrackOrderScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Track Order",
    headerLeft: Back(navigation),
    headerRight: EmptyView(),

    headerTintColor: Color.headerTintColor,
    headerStyle: Styles.Common.toolbar,
    headerTitleStyle: Styles.Common.headerTitleStyle,
  });

  static propTypes = {
    navigation: PropTypes.object,
  };

  render() {
    const { navigation } = this.props;
    return (
      <TrackOrder navigation={navigation} />
    );
  }
}
