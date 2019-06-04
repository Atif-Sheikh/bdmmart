/** @format */

import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {FlatList, Text, TouchableOpacity, View, I18nManager, Image} from "react-native";
import {Constants, Images, Languages, withTheme} from "@common";
import styles from "./styles";
import { LinearGradient } from '@expo';

class Item extends PureComponent {

  render() {
    const {
      item,
      label,
      onPress,
      theme: {
        colors: {
          text
        }
      }
    } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.wrap} activeOpacity={0.75} onPress={()=>onPress({...item, circle: true, name: label})}>
          <LinearGradient
            colors={item.colors}
            style={styles.button}>
            <Image source={item.image} style={styles.icon}/>
          </LinearGradient>
          <Text style={[styles.title, {color: text}]}>{label}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default withTheme(Item);
