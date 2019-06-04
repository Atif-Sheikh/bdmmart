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
    tabBarIcon: ({ tintColor }) => (
      <TabBarIcon
        orderIcon
        css={{ width: 18, height: 18 }}
        icon={Images.IconOrder}
        tintColor={tintColor}
      />
    ),
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
