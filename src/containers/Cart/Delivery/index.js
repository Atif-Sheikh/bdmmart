/** @format */

import React, { PureComponent } from "react";
import { Text, View, AsyncStorage, ScrollView, TouchableOpacity } from "react-native";
import css from "@cart/styles";
import { ShippingMethod } from "@components";
import { Config, Validator, Languages, withTheme, Theme } from "@common";
import { connect } from "react-redux";
import Buttons from "@cart/Buttons";
import { toast } from "@app/Omni";
import Tcomb from "tcomb-form-native";
import { cloneDeep } from "lodash";
import styles from "./styles";
import { TextInputMask } from 'react-native-masked-text'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const Form = Tcomb.form.Form;
import CountryPicker, {
  getAllCountries
} from 'react-native-country-picker-modal'
const customStyle = cloneDeep(Tcomb.form.Form.stylesheet);
const customInputStyle = cloneDeep(Tcomb.form.Form.stylesheet);
const labelStyle = cloneDeep(Tcomb.form.Form.stylesheet);

const isDark = Config.Theme.isDark

// Customize Form Stylesheet
customStyle.textbox.normal = {
  ...customStyle.textbox.normal,
  height: 150,
  marginBottom: 200,
  color: isDark ? Theme.dark.colors.text : Theme.light.colors.text
};
customStyle.controlLabel.normal = {
  ...customStyle.controlLabel.normal,
  fontSize: 15,
  color: isDark ? Theme.dark.colors.text : Theme.light.colors.text
};
labelStyle.controlLabel.normal = {
  ...customStyle.controlLabel.normal,
  fontSize: 14,
  color: "#999",
  color: isDark ? Theme.dark.colors.text : Theme.light.colors.text
};
customInputStyle.textbox.normal = {
  ...customInputStyle.textbox.normal,
  color: isDark ? Theme.dark.colors.text : Theme.light.colors.text
};
customInputStyle.controlLabel.normal = {
  ...customInputStyle.controlLabel.normal,
  fontSize: 15,
  color: isDark ? Theme.dark.colors.text : Theme.light.colors.text
};

class Delivery extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        first_name: "",
        last_name: "",
        address_1: "",
        state: "",
        postcode: "",
        country: "",
        email: "",
        phone: "",
        note: "",
      },
      cca2: 'FR',
      countryName: ''
    };

    this.initFormValues();
  }

  componentDidMount() {
    const { getShippingMethod } = this.props;

    this.fetchCustomer(this.props);
    getShippingMethod();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user != this.props.user) {
      this.fetchCustomer(nextProps);
    }
  }

  onChange = (value) => this.setState({ value });

  onPress = () => this.refs.form.getValue();

  initFormValues = () => {
    const countries = this.props.countries;
    // override the validate method of Tcomb lib for multi validate requirement.
    const Countries = Tcomb.enums(countries);
    const Email = Tcomb.refinement(
      Tcomb.String,
      (s) => Validator.checkEmail(s) === undefined
    );
    Email.getValidationErrorMessage = (s) => Validator.checkEmail(s);
    const Phone = Tcomb.refinement(
      Tcomb.String,
      (s) => Validator.checkPhone(s) === undefined
    );
    Phone.getValidationErrorMessage = (s) => Validator.checkPhone(s);

    // define customer form
    this.Customer = Tcomb.struct({
      first_name: Tcomb.String,
      last_name: Tcomb.String,
      address_1: Tcomb.String,
      ...(Config.DefaultCountry.hideCountryList ? {} : {country: Tcomb.String}),
      state: Tcomb.String,
      city: Tcomb.String,
      postcode: Tcomb.String,
      email: Email,
      phone: Tcomb.String,
      note: Tcomb.maybe(Tcomb.String), // maybe = optional
    });

    // form options
    this.options = {
      auto: "none", // we have labels and placeholders as option here (in Engrish, ofcourse).
      // stylesheet: css,
      fields: {
        first_name: {
          label: Languages.FirstName,
          placeholder: Languages.TypeFirstName,
          error: Languages.EmptyError, // for simple empty error warning.
          underlineColorAndroid: "transparent",
          stylesheet: customInputStyle,
        },
        last_name: {
          label: Languages.LastName,
          placeholder: Languages.TypeLastName,
          error: Languages.EmptyError,
          underlineColorAndroid: "transparent",
          stylesheet: customInputStyle,
        },
        address_1: {
          label: Languages.Address,
          placeholder: Languages.TypeAddress,
          error: Languages.EmptyError,
          underlineColorAndroid: "transparent",
          stylesheet: customInputStyle,
        },
        ...(Config.DefaultCountry.hideCountryList ? {} : {
          country: {
            label: Languages.TypeCountry,
            placeholder: Languages.Country,
            error: Languages.NotSelectedError,
            stylesheet: customInputStyle,
            template: this.renderCountry,
          }
        }),
        state: {
          label: Languages.State,
          placeholder: Languages.TypeState,
          error: Languages.EmptyError,
          underlineColorAndroid: "transparent",
          stylesheet: customInputStyle,
          autoCorrect: false
        },
        city: {
          label: Languages.City,
          placeholder: Languages.TypeCity,
          error: Languages.EmptyError,
          underlineColorAndroid: "transparent",
          stylesheet: customInputStyle,
          autoCorrect: false
        },
        postcode: {
          label: Languages.Postcode,
          placeholder: Languages.TypePostcode,
          error: Languages.EmptyError,
          underlineColorAndroid: "transparent",
          stylesheet: customInputStyle,
          autoCorrect: false
        },
        email: {
          label: Languages.Email,
          placeholder: Languages.TypeEmail,
          underlineColorAndroid: "transparent",
          stylesheet: customInputStyle,
          autoCorrect: false
        },
        phone: {
          label: Languages.Phone,
          placeholder: Languages.TypePhone,
          underlineColorAndroid: 'transparent',
          error: Languages.EmptyError,
          stylesheet: customInputStyle,
          template: this.renderPhoneInput,
          autoCorrect: false
        },
        note: {
          label: Languages.Note,
          placeholder: Languages.TypeNote,
          underlineColorAndroid: "transparent",
          multiline: true,
          stylesheet: customStyle,
          autoCorrect: false
        },
      },
    };
  };

  renderPhoneInput = (locals)=>{

    const stylesheet = locals.stylesheet;
    let formGroupStyle = stylesheet.formGroup.normal;
    let controlLabelStyle = stylesheet.controlLabel.normal;
    let textboxStyle = stylesheet.textbox.normal;
    let helpBlockStyle = stylesheet.helpBlock.normal;
    const errorBlockStyle = stylesheet.errorBlock;

    if (locals.hasError) {
      formGroupStyle = stylesheet.formGroup.error;
      controlLabelStyle = stylesheet.controlLabel.error;
      textboxStyle = stylesheet.textbox.error;
      helpBlockStyle = stylesheet.helpBlock.error;
    }

    const label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
    const help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
    const error = locals.hasError && locals.error ? <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>{locals.error}</Text> : null;

    return (
      <View style={formGroupStyle}>
        {label}
        <TextInputMask
          type={'cel-phone'}
          style={textboxStyle}
          onChangeText={(value) => locals.onChange(value)}
          onChange={locals.onChangeNative}
          placeholder={locals.placeholder}
          value={locals.value}/>
       {help}
       {error}
      </View>
    );
  }

  renderCountry = (locals)=>{

    const stylesheet = locals.stylesheet;
    let formGroupStyle = stylesheet.formGroup.normal;
    let controlLabelStyle = stylesheet.controlLabel.normal;
    let textboxStyle = stylesheet.textbox.normal;
    let helpBlockStyle = stylesheet.helpBlock.normal;
    const errorBlockStyle = stylesheet.errorBlock;

    if (locals.hasError) {
      formGroupStyle = stylesheet.formGroup.error;
      controlLabelStyle = stylesheet.controlLabel.error;
      textboxStyle = stylesheet.textbox.error;
      helpBlockStyle = stylesheet.helpBlock.error;
    }

    const label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
    const help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
    const error = locals.hasError && locals.error ? <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>{locals.error}</Text> : null;

    return (
      <View style={formGroupStyle}>
        {label}
        <CountryPicker
          onChange={value => {
            this.setState({ cca2: value.cca2 })
            locals.onChange(value.name)
          }}
          cca2={this.state.cca2}
          filterable>
          <Text style={[textboxStyle, locals.value == "" && {color: "#c6c6cc"}]}>{locals.value == "" ? locals.placeholder : locals.value}</Text>
        </CountryPicker>
       {help}
       {error}
      </View>
    );
  }

  fetchCustomer = async (props) => {
    const {selectedAddress} = props
    const { user: customer } = props.user;

    var value = selectedAddress
    if (!selectedAddress && customer) {
      value = {
        first_name:
          customer.billing.first_name == ""
            ? customer.first_name
            : customer.billing.first_name,
        last_name:
          customer.billing.last_name == ""
            ? customer.last_name
            : customer.billing.last_name,
        email:
          customer.email.first_name == ""
            ? customer.email
            : customer.billing.email,
        address_1: customer.billing.address_1,
        city: customer.billing.city,
        state: customer.billing.state,
        postcode: customer.billing.postcode,
        country: customer.billing.country,
        phone: customer.billing.phone,
      }
    }

    this.setState({value})
  };

  validateCustomer = async (customerInfo) => {
    await this.props.validateCustomerInfo(customerInfo);
    if (this.props.type === "INVALIDATE_CUSTOMER_INFO") {
      toast(this.props.message);
      return false;
    }
    this.props.onNext();
  };

  saveUserData = async (userInfo) => {
    this.props.updateSelectedAddress(userInfo)
    try {
      await AsyncStorage.setItem("@userInfo", JSON.stringify(userInfo));
    } catch (error) {
      console.log("error save user data", error);
    }
  };

  selectShippingMethod = (item) => {
    this.props.selectShippingMethod(item);
  };

  nextStep = () => {
    const value = this.refs.form.getValue();
    if (value) {
      var country = ""
      if (Config.DefaultCountry.hideCountryList == true) {
        country = this.props.countries[Config.DefaultCountry.countryCode.toUpperCase()]
      }else{
        country = this.state.value.country
      }
      // if validation fails, value will be null
      this.props.onNext({...this.state.value, country});

      // save user info for next use
      this.saveUserData({...this.state.value, country});
    }
    // this.props.validateCustomerInfo(this.customerInfo);
    // this.props.onNext();
    //this.validateCustomer(this.customerInfo);
  };

  render() {
    const { shippings, shippingMethod } = this.props;
    const isShippingEmpty = typeof shippingMethod.id === "undefined";
    const {
      theme:{
        colors:{
          background, text
        }
      }
    } = this.props

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView style={styles.form}>
          {Config.shipping.visible &&
            shippings.length > 0 && (
              <View>
                <View style={css.rowEmpty}>
                  <Text style={[css.label, {color: text}]}>{Languages.ShippingType}</Text>
                </View>

                <ScrollView contentContainerStyle={styles.shippingMethod}>
                  {shippings.map((item, index) => (
                    <ShippingMethod
                      item={item}
                      key={`${index}shipping`}
                      onPress={this.selectShippingMethod.bind(this)}
                      selected={
                        (index == 0 && isShippingEmpty) ||
                        item.id == shippingMethod.id
                      }
                    />
                  ))}
                </ScrollView>
              </View>
            )}

          <View style={css.rowEmpty}>
            <Text style={[css.label, {color: text}]}>{Languages.YourDeliveryInfo}</Text>
          </View>

          <View style={styles.formContainer}>
            <Form
              ref="form"
              type={this.Customer}
              options={this.options}
              value={this.state.value}
              onChange={this.onChange}
            />
          </View>
        </KeyboardAwareScrollView>

        <Buttons
          isAbsolute
          onPrevious={this.props.onPrevious}
          onNext={this.nextStep}
        />
      </View>
    );
  }
}

Delivery.defaultProps = {
  shippings: [],
  shippingMethod: {},
  selectedAddress:{}
};

const mapStateToProps = ({ carts, user, countries, addresses }) => {
  return {
    user,
    customerInfo: carts.customerInfo,
    message: carts.message,
    type: carts.type,
    isFetching: carts.isFetching,
    shippings: carts.shippings,
    shippingMethod: carts.shippingMethod,
    countries: countries.list,
    selectedAddress: addresses.selectedAddress
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const CartRedux = require("@redux/CartRedux");
  const AddressRedux = require("@redux/AddressRedux");

  return {
    ...ownProps,
    ...stateProps,
    validateCustomerInfo: (customerInfo) => {
      CartRedux.actions.validateCustomerInfo(dispatch, customerInfo);
    },
    getShippingMethod: () => {
      CartRedux.actions.getShippingMethod(dispatch);
    },
    selectShippingMethod: (shippingMethod) => {
      CartRedux.actions.selectShippingMethod(dispatch, shippingMethod);
    },
    updateSelectedAddress: (address) => {
      AddressRedux.actions.updateSelectedAddress(dispatch, address);
    },
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(withTheme(Delivery));
