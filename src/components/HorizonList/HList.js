/** @format */

import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {FlatList, Text, TouchableOpacity, View, I18nManager} from "react-native";
import {Constants, Images, Languages, withTheme} from "@common";
import Icon from "react-native-vector-icons/Entypo";
import {HorizonLayout} from "@components";
import {find} from "lodash";
import styles from "./styles";
import Categories from './Categories'

class HorizonList extends PureComponent {
  static propTypes = {
    config: PropTypes.object,
    index: PropTypes.number,
    fetchPost: PropTypes.func,
    onShowAll: PropTypes.func,
    list: PropTypes.array,
    fetchProductsByCollections: PropTypes.func,
    setSelectedCategory: PropTypes.func,
    onViewProductScreen: PropTypes.func,
    showCategoriesScreen: PropTypes.func,
    collection: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.page = 1;
    this.limit = Constants.pagingLimit;
    this.defaultList = [
      {
        id: 1,
        name: Languages.loading,
        images: [Images.PlaceHolder]
      }, {
        id: 2,
        name: Languages.loading,
        images: [Images.PlaceHolder]
      }, {
        id: 3,
        name: Languages.loading,
        images: [Images.PlaceHolder]
      }
    ];
  }

  /**
   * handle load more
   */
  _nextPosts = () => {
    const {config, index, fetchPost, collection} = this.props;
    this.page += 1;
    if (!collection.finish) {
      fetchPost({config, index, page: this.page});
    }
  };

  _viewAll = () => {
    const {
      config,
      onShowAll,
      index,
      list,
      fetchProductsByCollections,
      setSelectedCategory
    } = this.props;
    const selectedCategory = find(list, (category) => category.id === config.category);
    setSelectedCategory(selectedCategory);
    fetchProductsByCollections(config.category, config.tag, this.page, index);
    onShowAll(config, index);
  };

  showProductsByCategory = (config) => {
    const {
      onShowAll,
      index,
      list,
      fetchProductsByCollections,
      setSelectedCategory
    } = this.props;
    const selectedCategory = find(list, (category) => category.id === config.category);
    setSelectedCategory(selectedCategory);
    fetchProductsByCollections(config.category, config.tag, this.page, index);
    onShowAll(config, index);
  };

  onViewProductScreen = (product, type) => {
    this
      .props
      .onViewProductScreen({product, type});
  };

  renderItem = ({item, index}) => {
    const {layout} = this.props.config;

    if (item === null)
      return <View key="post_"/>;
    return (<HorizonLayout
      product={item}
      key={`post-${index}`}
      onViewPost={() => this.onViewProductScreen(item, index)}
      layout={layout}/>);
  };

  render() {
    const {
      showCategoriesScreen,
      collection,
      config,
      theme: {
        colors: {
          text
        }
      }
    } = this.props;


    const list = typeof collection.list !== "undefined" && collection.list.length !== 0
      ? collection.list
      : this.defaultList;
    const isPaging = !!config.paging;

    const renderHeader = () => (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.tagHeader, {color: text}]}>{Languages[config.name]}</Text>
        </View>
        <TouchableOpacity onPress={config.layout != Constants.Layout.circle ? this._viewAll : showCategoriesScreen} style={styles.headerRight}>
          <Text style={[styles.headerRightText, {color: text}]}>{Languages.seeAll}</Text>
          <Icon
            style={styles.icon}
            color={text}
            size={20}
            name={I18nManager.isRTL
            ? "chevron-small-left"
            : "chevron-small-right"}/>
        </TouchableOpacity>
      </View>
    );

    return (
      <View
        style={[
        styles.flatWrap, config.color && {
          backgroundColor: config.color
        }
      ]}>
        {config.name && renderHeader()}
        {config.layout != Constants.Layout.circle && (
          <FlatList
            contentContainerStyle={styles.flatlist}
            data={list}
            keyExtractor={(item) => `post__${item.id}`}
            renderItem={this.renderItem}
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled={isPaging}
            onEndReached={false && this._nextPosts}/>
        )}
        {config.layout == Constants.Layout.circle && <Categories categories={this.props.list} items={config.items} onPress={this.showProductsByCategory}/>}
      </View>
    );
  }
}

export default withTheme(HorizonList);
