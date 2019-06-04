/** @format */

import React, { PureComponent } from "react";
import { TouchableOpacity, Text, View, Image, Dimensions } from "react-native";
import styles from "./styles";
import {
  Styles,
  getProductImage,
  currencyFormatter,
  warn,
  Images,
} from "@app/Omni";
import {Languages, withTheme} from '@common'

class ConfirmCheckout extends PureComponent {
  render() {
    let {discountType, couponAmount, shippingMethod, totalPrice} = this.props
    let shippingPrice = shippingMethod[0].total
    let discount = discountType == "percent" ? this.getExistCoupon() * totalPrice : this.getExistCoupon()
    let total = parseFloat(totalPrice) + parseFloat(shippingPrice) - parseFloat(discount ? discount : 0)
    const {
      theme:{
        colors:{
          background, text
        }
      }
    } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>{Languages.Subtotal}</Text>
          <Text style={[styles.value, {color: text}]}>{currencyFormatter(totalPrice)}</Text>
        </View>
        {couponAmount > 0 && (
          <View style={styles.row}>
            <Text style={styles.label}>{Languages.Discount}</Text>
            <Text style={[styles.value, {color: text}]}>{discountType == "percent" ? `${parseFloat(couponAmount)}%` : currencyFormatter(couponAmount)}</Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={styles.label}>{Languages.Shipping}</Text>
          <Text style={[styles.value, {color: text}]}>{currencyFormatter(shippingPrice)}</Text>
        </View>
        <View style={styles.divider}/>
        <View style={styles.row}>
          <Text style={styles.label}>{Languages.Total}</Text>
          <Text style={[styles.value, {color: text}]}>{currencyFormatter(total)}</Text>
        </View>
      </View>
    );
  }

  getExistCoupon = () => {
    const { couponAmount, discountType } = this.props;
      if (discountType == "percent") {
        return couponAmount / 100.0;
      }
      return couponAmount;
  };

}


export default withTheme(ConfirmCheckout)
