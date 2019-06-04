/** @format */

import React, { Component } from "react";
import { Images, Styles, Color, Languages } from "@common";
import { ProductList } from "@components";
import { Back, NavBarText } from "./IconNav";

export default class ListAllScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: Back(navigation, Images.icons.backs),

    headerStyle: Styles.Common.toolbarFloat,
    headerTransparent: true
    // header: null
  });

  render() {
    const { state, navigate } = this.props.navigation;
    const params = state.params;
    let circle = state.params.config.circle == true

    let config = {...state.params.config, name: circle ?  state.params.config.name : Languages[state.params.config.name]}
    return (
      <ProductList
        headerImage={circle ? null : params.config.image}
        config={params.config}
        page={1}
        navigation={this.props.navigation}
        index={params.index}
        onViewProductScreen={(item) => navigate("DetailScreen", item)}
      />
    );
  }
}
