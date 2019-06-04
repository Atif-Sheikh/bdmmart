/** @format */

import React from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import styles from "./style";
import Icon from "react-native-vector-icons/Ionicons";
import { Icons, Languages, Color, withTheme } from "@common";

@withTheme
class SearchInput extends React.Component {
  render() {
    let {
      value,
      onSearch,
      onChangeText,
      isLoading
    } = this.props;

    const {
      theme: {
        colors: { text, lineColor },
      },
    } = this.props;
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: lineColor },
        ]}>
        <TextInput
          placeholder={Languages.TrackOrderPlaceHolder}
          placeholderTextColor={text}
          style={[styles.input, { color: text }]}
          underlineColorAndroid="transparent"
          value={value}
          onChangeText={onChangeText}
          returnKeyType="search"
          onSubmitEditing={onSearch}
        />

        {isLoading ?
          <ActivityIndicator /> :
          <TouchableOpacity onPress={onSearch}>
            <Icon name={Icons.Ionicons.Search} size={20} color={text} />
          </TouchableOpacity>

        }

      </View>
    );
  }
}

export default SearchInput;
