/** @format */

import Images from "./Images";
import Constants from "./Constants";
export default {
  /**
     Step 1: change to your website URL and the wooCommerce API consumeKey
     */
    WooCommerce: {
      url: "https://bdmmart.in/",
      consumerKey: "ck_e70293b7b50dd60a623dcab14666fa0b6ecd416b",
      consumerSecret: "cs_0f4f60a4e195d6807400f4881c8bd0f750d6910e",
 },
//hhhhj
  /**
     Step 2: Setting Product Images
     - ProductSize: Explode the guide from: update the product display size: https://mstore.gitbooks.io/mstore-manual/content/chapter5.html
     - HorizonLayout: Change the HomePage horizontal layout - https://mstore.gitbooks.io/mstore-manual/content/chapter6.html
     */
  ProductSize: {
    enable: false,
    CatalogImages: { width: 348, height: 445 },
    SingleProductImage: { width: 568, height: 725 },
    ProductThumbnails: { width: 78, height: 99 },
  },
  HorizonLayout: [
    { tag: 29, paging: true, layout: Constants.Layout.BannerLarge },
    {
      
  /**
     step 3: Config image for the Payment Gateway
     Notes:
     - Only the image list here will be shown on the app but it should match with the key id from the WooCommerce Website config
     - It's flexible way to control list of your payment as well
     Ex. if you would like to show only cod then just put one cod image in the list
     * */
  Payments: {
    cod: require("@images/payment_logo/cash_on_delivery.png"),
    bacs: require("@images/payment_logo/bacs.png"),
    paypal: require("@images/payment_logo/PayPal.png"),
    stripe: require("@images/payment_logo/stripe.png"),
    authorize: require("@images/payment_logo/authorize.png"),
    gourlpayments: require("@images/payment_logo/gourl.png"),
  },

  /**
     Step 4: Advance config:
     - showShipping: option to show the list of shipping method
     - showStatusBar: option to show the status bar, it always show iPhoneX
     - LogoImage: The header logo
     - LogoWithText: The Logo use for sign up form
     - LogoLoading: The loading icon logo
     - appFacebookId: The app facebook ID, use for Facebook login
     - CustomPages: Update the custom page which can be shown from the left side bar (Components/Drawer/index.js)
     - WebPages: This could be the id of your blog post or the full URL which point to any Webpage (responsive mobile is required on the web page)
     * */
  shipping: {
    visible: true,
    time: {
      free_shipping: "4 - 7 Days",
      flat_rate: "1 - 4 Days",
      local_pickup: "1 - 4 Days",
    },
  },
  showStatusBar: false,
  LogoImage: require("@images/new_logo.png"),
  LogoWithText: require("@images/logo_with_text.png"),
  LogoLoading: require("@images/logo.png"),
  appFacebookId: "669761036821342",
  CustomPages: { contact_id: 10941 },
  WebPages: { marketing: "http:/bdmmart.in"},
  intro: [
    {
      key: "page122222222222222222222222222222",
      title: "Lorem Ipsum Dol"
    {
      key: "page2",
      title: "Consectetur Adipisicing Elit Sed Do Eiusmod",
      text:
        "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna",
      icon: "ios-card-outline",
      colors: ["#13f1fc", "#0470dc"],
    },
    {
      key: "page3",
      title: "Adipisicing Elit Sed Do",
      text: "Usage Consectetur adipisicing elit, sed do eiusmod",
      icon: "ios-finger-print-outline",
      colors: ["#b1ea4d", "#459522"],
    }
    