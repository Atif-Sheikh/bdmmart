/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { FlatList, Text, Image, Animated, View, RefreshControl, TouchableOpacity, StyleSheet } from "react-native";
import { HorizonLayouts, Styles, Config, withTheme, withNavigation } from "@common";
import { connect } from "react-redux";
import { makeGetCollections } from "@selectors/LayoutSelector";
import HList from "./HList";
import moment from "moment";
import styles from './styles';
import ImageSlider from 'react-native-image-slider';


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

@withNavigation
@withTheme
class HorizonList extends PureComponent {
  static propTypes = {
    fetchAllProductsLayout: PropTypes.func.isRequired,
    fetchProductsByCollections: PropTypes.func,
    list: PropTypes.array,
    onShowAll: PropTypes.func,
    onViewProductScreen: PropTypes.func,
    collections: PropTypes.array,
    setSelectedCategory: PropTypes.func,
    isFetching: PropTypes.bool.isRequired,
    showCategoriesScreen: PropTypes.func
  };

  scrollAnimation = new Animated.Value(0);
  state = {
    currentDate: moment().format("dddd DD MMM"),
  };

  componentWillMount() {
    this.props.navigation.setParams({
      animatedHeader: this.scrollAnimation.interpolate({
        inputRange: [0, 170],
        outputRange: [-1, 1],
        extrapolate: "clamp",
      }),
    });
  }

  componentDidMount() {
    this._fetchAllPost();
  }

  /**
   * Fetch all products based on layouts
   */
  _fetchAllPost = () => {
    if (this.props.isConnected) {
      this.props.fetchAllProductsLayout();
    }
  };

  _fetchPost = ({ config, index, page }) => {
    const { fetchProductsByCollections } = this.props;
    fetchProductsByCollections(config.category, config.tag, page, index);
  };

  _renderHeader = () => {
    const {
      theme: {
        colors: {
          text
        }
      }
    } = this.props;

    const configs = [
      { 
        category: 35, 
        image : 50, 
        colors: ["#2af598", "#009efd"],
        // layout: Constants.Layout.Banner,
        circle:true,
        name:'Shoes'
       },
       { 
        category: 34, 
        image : 50, 
        colors: ["#2af598", "#009efd"],
        // layout: Constants.Layout.Banner,
        circle:true,
        name:'Tshirts'
       },
       { 
        category: 32, 
        image : 50, 
        colors: ["#2af598", "#009efd"],
        // layout: Constants.Layout.Banner,
        circle:true,
        name:'Bags'
       }
    ]
     const _index = 1;

     const images = [
       require('../../../assets/banner_1.png'),
       require('../../../assets/banner_2.png'),
       require('../../../assets/banner_3.jpg'),
     ];

    return (
      <View style={styles.headerLogo}>
        <Image source={Config.LogoImage} style={[styles.logo, Config.Theme.isDark && {tintColor: '#eee'} ]} />
        <Text style={[styles.headerDate, {color: text}]}>{this.state.currentDate.toUpperCase()}</Text>

        <ImageSlider
          // loopBothSides
          autoPlayWithInterval={2000}
          style={myStyles.banner}
          onPress={(img) => {
            // alert(img.index);
            const categ = configs[img.index]
            this.props.setSelectedCategory(categ.category);
            this.props.fetchProductsByCollections(categ.category, categ.name, 1, _index);
            this.props.onShowAll(categ, _index);
          }}
          images={images}
        />

        {/* Banners */}
        {/* <TouchableOpacity
          onPress={() => {
            // this._fetchPost(item, index, 1)
            this.props.setSelectedCategory(shoesCateg.category);
            this.props.fetchProductsByCollections(shoesCateg.category, shoesCateg.name, 1, index);
            this.props.onShowAll(shoesCateg, index);
          }}>
            <Image 
              source={require('../../../assets/banner_1.png')}
              style={myStyles.banner}
              resizeMode='contain' />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            // this._fetchPost(item, index, 1)
            this.props.setSelectedCategory(secCateg.category);
            this.props.fetchProductsByCollections(secCateg.category, secCateg.name, 1, index);
            this.props.onShowAll(secCateg, index);
          }}>
            <Image 
              source={require('../../../assets/banner_2.png')}
              style={myStyles.banner}
              resizeMode='contain' />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            // this._fetchPost(item, index, 1)
            this.props.setSelectedCategory(thirdCateg.category);
            this.props.fetchProductsByCollections(thirdCateg.category, thirdCateg.name, 1, index);
            this.props.onShowAll(thirdCateg, index);
          }}>
            <Image 
              source={require('../../../assets/banner_3.jpg')}
              style={myStyles.banner}
              resizeMode='contain' />
        </TouchableOpacity> */}
      </View>
    );
  };

  _renderItem = ({ item, index }) => {
    const {
      list,
      onShowAll,
      onViewProductScreen,
      collections,
      setSelectedCategory,
      fetchProductsByCollections,
      showCategoriesScreen
    } = this.props;

    return (
      <HList
        horizontal
        onViewProductScreen={onViewProductScreen}
        onShowAll={onShowAll}
        key={`taglist-${index}`}
        config={item}
        index={index}
        collection={collections[index]}
        list={list}
        fetchPost={this._fetchPost}
        fetchProductsByCollections={fetchProductsByCollections}
        setSelectedCategory={setSelectedCategory}
        showCategoriesScreen={showCategoriesScreen}
      />
    );
  };

  render() {
    const { isFetching } = this.props;
    const onScroll = Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              y: this.scrollAnimation,
            },
          },
        },
      ],
      { useNativeDriver: true }
    );

    return (
      <AnimatedFlatList
        data={HorizonLayouts}
        keyExtractor={(item, index) => `h_${item.layout}` || `h_${index}`}
        renderItem={this._renderItem}
        ListHeaderComponent={this._renderHeader}
        scrollEventThrottle={1}
        refreshing={isFetching}
        {...{ onScroll }}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={this._fetchAllPost}
          />
        }
      />
    );
  }
}

const makeMapStateToProps = () => {
  const getCollections = makeGetCollections();
  const mapStateToProps = (state, props) => {
    return {
      collections: getCollections(state, props),
      // collections: state.layouts.layout,
      isFetching: state.layouts.isFetching,
      list: state.categories.list,
      isConnected: state.netInfo.isConnected
    };
  };
  return mapStateToProps;
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions: LayoutActions } = require("@redux/LayoutRedux");
  const { actions: CategoryActions } = require("@redux/CategoryRedux");
  return {
    ...ownProps,
    ...stateProps,
    setSelectedCategory: (category) =>
      dispatch(CategoryActions.setSelectedCategory(category)),

    fetchProductsByCollections: (categoryId, tagId, page = 1, index) => {
      LayoutActions.fetchProductsLayoutTagId(
        dispatch,
        categoryId,
        tagId,
        page,
        index
      );
    },
    fetchAllProductsLayout: () => {
      LayoutActions.fetchAllProductsLayout(dispatch);
    },
  };
};

export default connect(
  makeMapStateToProps,
  null,
  mergeProps
)(HorizonList);

const myStyles = StyleSheet.create({
  banner:{
    width: '100%', 
    height: 150, 
    marginLeft: -5,
    marginBottom: 20,
    marginTop: 15,
  }
});
