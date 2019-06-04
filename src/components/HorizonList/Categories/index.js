/** @format */

import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {FlatList, Text, TouchableOpacity, View, I18nManager} from "react-native";
import {Constants, Images, Languages, withTheme} from "@common";
import {HorizonLayout} from "@components";
import Item from './Item'

class Categories extends PureComponent {
  static defaultProps = {
    categories: [],
    items:[]
  }

  render() {
    let {categories, items, onPress} = this.props
    var mapping = {}

    if(categories){ 

      categories.forEach(item => { 
      mapping[item.id] = item.name
    })
     
      categories && console.log(categories.status)
     
   }
//he;;p
   

    return (
      <FlatList
        keyExtractor={(item,index)=>`${index}`}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={items}
        renderItem={({item})=><Item item={item} label={mapping[item.category]} onPress={onPress}/>}/>
    );
  }
}

export default withTheme(Categories);
