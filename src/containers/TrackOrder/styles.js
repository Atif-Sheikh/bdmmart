/** @format */

import { StyleSheet, Platform, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { Color, Config, Constants, Device, Theme } from "@common";
const isDark = Config.Theme.isDark

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
  },
  orderDetailContainer: {
    padding: 20
  },
  header: {
    backgroundColor: 'green',
    padding: 5
  },
  headerText: {
    color: 'white',
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'blue',

  },
  leftColumn: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: 'blue',
    padding: 5
  },
  rightColumn: {
    flex: 1,
    padding: 5
  },
  activityHeader: {
    backgroundColor: 'blue',
    padding: 5
  },
  activityHeaderText: {
    color: '#ccc',
  },
});
