/** @format */

// @flow
/**
 * Created by InspireUI on 19/02/2017.
 */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { Constants, withTheme} from "@common";
import { HorizonList, ModalLayout, PostList } from "@components";
import styles from "./styles";

class Home extends PureComponent {
  static propTypes = {
    fetchAllCountries: PropTypes.func.isRequired,
    layoutHome: PropTypes.any,
    onViewProductScreen: PropTypes.func,
    onShowAll: PropTypes.func,
    showCategoriesScreen: PropTypes.func
  };

  componentDidMount() {
    const {fetchAllCountries, isConnected } = this.props;
    if (isConnected) {
      //alert("CHECK")
      fetchAllCountries();
    }
  }

  render() {
    const {
      layoutHome,
      onViewProductScreen,
      showCategoriesScreen,
      onShowAll,
      theme: {
        colors: { background },
      },
    } = this.props;

    const isHorizontal = layoutHome === Constants.Layout.horizon;
    return (
      <View style={[styles.container, {backgroundColor: background }]}>
        {/* <Text style={{backgroundColor: 'red', height: 200, width: 200}}>Place slider here</Text> */}
        {isHorizontal && (
          <HorizonList
            onShowAll={onShowAll}
            onViewProductScreen={onViewProductScreen}
            showCategoriesScreen={showCategoriesScreen}
          />
        )}
        {!isHorizontal && (
          <PostList onViewProductScreen={onViewProductScreen} />
        )}
        <ModalLayout />
      </View>
    );
  }
}

const mapStateToProps = ({ user, products, countries, netInfo }) => ({
  user,
  layoutHome: products.layoutHome,
  countries,
  isConnected: netInfo.isConnected
});

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const CountryRedux = require("@redux/CountryRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchAllCountries: () => CountryRedux.actions.fetchAllCountries(dispatch),
  };
}

export default withTheme(connect(
  mapStateToProps,
  undefined,
  mergeProps
)(Home));
