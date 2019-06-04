/** @format */

import React, { PureComponent } from "react";
import { TouchableOpacity, Text, View, Image, Dimensions } from "react-native";
import styles from "./styles";
import {
  Styles,
  getProductImage,
  currencyFormatter,
  warn,
  Languages,
  Images,
} from "@app/Omni";
import ChangeQuantity from "@components/ChangeQuantity";
import { connect } from "react-redux";
import {withTheme, Config} from '@common'

class ProductItem extends PureComponent {
  render() {
    const { product, quantity, viewQuantity, variation, onPress, onRemove } = this.props;
    const {
      theme:{
        colors:{
          background, text, lineColor
        }
      }
    } = this.props

    const price =
      variation === null || variation === undefined
        ? product.price
        : variation.price;

    return (
      <View style={[styles.container, {backgroundColor: background}, Config.Theme.isDark && {borderBottomColor: lineColor } ]}>
        <View style={styles.content}>
          <TouchableOpacity onPress={() => onPress({ product })}>
            <Image
              source={{ uri: getProductImage(product.images[0].src, 100) }}
              style={styles.image}
            />
           </TouchableOpacity>

          <View
            style={[
              styles.infoView,
              { width: Dimensions.get("window").width - 180 },
            ]}>
            <TouchableOpacity onPress={() => onPress({ product })}>
              <Text style={[styles.title, {color: text}]}>{product.name}</Text>
            </TouchableOpacity>
            <View style={styles.priceContainer}>
              <Text style={[styles.price, {color: text}]}>{currencyFormatter(price)}</Text>
              {variation &&
                typeof variation.attributes !== "undefined" &&
                variation.attributes.map((variant) => {
                  return (
                    <Text key={variant.name} style={styles.productVariant}>
                      {variant.option}
                    </Text>
                  );
                })}
            </View>
          </View>
          {viewQuantity && (
            <ChangeQuantity
              style={styles.quantity}
              quantity={quantity}
              onChangeQuantity={this.onChangeQuantity.bind(this)}
            />
          )}
        </View>

        {viewQuantity && (
          <TouchableOpacity style={styles.btnTrash} onPress={()=>onRemove(product, variation)}>
            <Image source={require("@images/ic_trash.png")} style={[styles.icon, {tintColor: text}]}/>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  onChangeQuantity(quantity) {
    if (this.props.quantity < quantity) {
      this.props.addCartItem(this.props.product, this.props.variation);
    } else {
      this.props.removeCartItem(this.props.product, this.props.variation);
    }
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/CartRedux");
  return {
    ...ownProps,
    ...stateProps,
    addCartItem: (product, variation) => {
      actions.addCartItem(dispatch, product, variation);
    },
    removeCartItem: (product, variation) => {
      actions.removeCartItem(dispatch, product, variation);
    },
  };
}

export default connect(
  null,
  undefined,
  mergeProps
)(withTheme(ProductItem));
