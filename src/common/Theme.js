/** @format */
import {DefaultTheme, DarkTheme } from "react-native-paper";

const dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: 'rgba(255, 255, 255, 0.9)',
    primary: "tomato",
    accent: "yellow",
    lineColor: '#222229',
    background: '#1B1920' // '#242424' // '#232D4C'
  },
};

const light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    lineColor: "#f9f9f9",
    background: '#fff',
    accent: "yellow",
  },
};

export default {dark, light}