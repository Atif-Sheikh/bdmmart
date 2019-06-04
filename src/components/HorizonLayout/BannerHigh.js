/** @format */

import React, {PureComponent} from "react";
import {TouchableOpacity, View, Text} from "react-native";
import {Images, Styles} from "@common";
import {ImageCache, WishListIcon, TouchableScale} from "@components";
import {getProductImage, currencyFormatter} from "@app/Omni";
import {LinearGradient} from "@expo";
import css from "./style";

export default class BannerLarge extends PureComponent {
  render() {
    const {viewPost, title, product} = this.props;
    const imageURI = typeof product.images[0] !== "undefined"
      ? getProductImage(product.images[0].src, Styles.width)
      : Images.PlaceHolderURL;
    const productPrice = `${currencyFormatter(product.price)} `;
    const productPriceSale = product.on_sale
      ? `${currencyFormatter(product.regular_price)} `
      : null;

    return (
      <TouchableScale onPress={viewPost} style={css.bannerHighShadow}>
        <View activeOpacity={1} style={css.bannerHighView}>
          <ImageCache uri={imageURI} style={css.bannerHighImage}/>

          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0, 0.7)"]}
            style={css.bannerOverlay}>
            <Text style={css.bannerHighTitle}>{title}</Text>
            <View style={css.priceView}>
              <Text style={[css.price]}>{productPrice}</Text>
              <Text
                style={[
                css.price, product.on_sale && css.sale_price
              ]}>
                {productPriceSale}
              </Text>
            </View>
          </LinearGradient>

          <WishListIcon product={product}/>
        </View>
      </TouchableScale>
    );
  }
}
