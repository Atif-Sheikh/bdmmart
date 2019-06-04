/** @format */

import Images from "./Images";
import Constants from "./Constants";
import Icons from "./Icons";

export default {
  /**
     Step 1: change to your website URL and the wooCommerce API consumeKey
     */
  WooCommerce: {
    url: "https://bdmmart.in/",
    consumerKey: "ck_e70293b7b50dd60a623dcab14666fa0b6ecd416b",
    consumerSecret: "cs_0f4f60a4e195d6807400f4881c8bd0f750d6910e",
  },

  /**
     Step 2: Setting Product Images
     - ProductSize: Explode the guide from: update the product display size: https://mstore.gitbooks.io/mstore-manual/content/chapter5.html
     The default config for ProductSize is disable due to some problem config for most of users.
     If you have success config it from the Wordpress site, please enable to speed up the app performance
     - HorizonLayout: Change the HomePage horizontal layout - https://mstore.gitbooks.io/mstore-manual/content/chapter6.html
       Update Oct 06 2018: add new type of categories
       NOTE: name is define value --> change field in Language.js
     */
  ProductSize: {
    enable: false,
    CatalogImages: { width: 300, height: 360 },
    SingleProductImage: { width: 600, height: 720 },
    ProductThumbnails: { width: 180, height: 216 },
  },
  HorizonLayout: [
    // Update 07 Oct 2018: support more Banner layout, HTML, category
    //{ category: 30, layout: Constants.Layout.Banner },
    {
      layout: Constants.Layout.circle,
      items: [
        // {image : require("@images/banner/bag.png"), colors: ["#4facfe", "#00f2fe" ]},
        { category: 30, image: require("@images/categories_icon/ic_shorts.png"), colors: ["#4facfe", "#00f2fe"] },
        { category: 31, image: require("@images/categories_icon/ic_tshirt.png"), colors: ["#43e97b", "#38f9d7"] },
        { category: 32, image: require("@images/categories_icon/ic_panties.png"), colors: ["#fa709a", "#fee140"] },
        { category: 33, image: require("@images/categories_icon/ic_dress.png"), colors: ["#7F00FF", "#E100FF"] },
        { category: 34, image: require("@images/categories_icon/ic_glasses.png"), colors: ["#30cfd0", "#330867"] },
        { category: 35, image: require("@images/categories_icon/ic_shoes.png"), colors: ["#2af598", "#009efd"] },
        { category: 30, image: require("@images/categories_icon/ic_tie.png"), colors: ["#6a11cb", "#2575fc"] },
        { category: 34, image: require("@images/categories_icon/ic_socks.png"), colors: ["#c471f5", "#fa71cd"] },
        { category: 36, image: require("@images/categories_icon/ic_woman_shoes.png"), colors: ["#f43b47", "#453a94"] },
      ]
    },
    {
      name: "mensjeans",
      category: 30,
      image: Images.Banner.Feature,
      layout: Constants.Layout.threeColumn,
    },
    {
      name: "bagsCollections",
      category: 31,
      image: Images.Banner.Bag,
      layout: Constants.Layout.twoColumn,
    },
    {
      name: "womanBestSeller",
      category: 36,
      image: Images.Banner.Woman,
      layout: Constants.Layout.twoColumnHigh,
    },
    {
      name: "manCollections",
      category: 33,
      image: Images.Banner.Man,
      layout: Constants.Layout.twoColumn,
    },
  ],

  /**
     step 3: Config image for the Payment Gateway
     Notes:
     - Only the image list here will be shown on the app but it should match with the key id from the WooCommerce Website config
     - It's flexible way to control list of your payment as well
     Ex. if you would like to show only cod then just put one cod image in the list
     * */
  Payments: {
    // bacs: require("@images/payment_logo/PayPal.png"),
    cod: require("@images/payment_logo/cash_on_delivery.png"),
    paypal: require("@images/payment_logo/PayPal.png"),
    stripe: require("@images/payment_logo/stripe.png"),
    razorpay: require("@images/payment_logo/razorpay.png"),
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
     - CategoryListView: default layout for category (true/false)
     - intro: The on boarding intro slider for your app
     - menu: config for left menu side items (isMultiChild: This is new feature from 3.4.5 that show the sub products categories)
     * */
  shipping: {
    visible: true,
    time: {
      free_shipping: "4 - 7 Days",
      flat_rate: "1 - 4 Days",
      local_pickup: "1 - 4 Days",
    },
  },
  showStatusBar: true,
  LogoImage: require("@images/logo-main.png"),
  LogoWithText: require("@images/logo_with_text.png"),
  LogoLoading: require("@images/logo.png"),

  showAdmobAds: false,
  AdMob: {
    deviceID: "pub-2101182411274198",
    unitID: "ca-app-pub-2101182411274198/4100506392",
    unitInterstitial: "ca-app-pub-2101182411274198/8930161243",
    isShowInterstital: true,
  },
  appFacebookId: "669761036821342",
  CustomPages: { contact_id: 10941 },
  WebPages: { marketing: "https://bdmmart.in" },


  intro: [
    {
      key: "page1",
      title: "Lorem Ipsum Dolor Sit Ame",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      icon: "ios-basket-outline",
      colors: ["#0FF0B3", "#036ED9"],
    },
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
    },
  ],

  /**
   * Config For Left Menu Side Drawer
   * @param goToScreen 3 Params (routeName, params, isReset = false)
   * BUG: Language can not change when set default value in Config.js ==> pass string to change Languages
   */
  menu: {
    // has child categories
    isMultiChild: true,
    // Unlogged
    listMenuUnlogged: [
      {
        text: "Login",
        routeName: "LoginScreen",
        params: {
          isLogout: false,
        },
        icon: Icons.MaterialCommunityIcons.SignIn,
      },
    ],
    // user logged in
    listMenuLogged: [
      {
        text: "Logout",
        routeName: "LoginScreen",
        params: {
          isLogout: true,
        },
        icon: Icons.MaterialCommunityIcons.SignOut,
      },
    ],
    // Default List
    listMenu: [
      {
        text: "Shop",
        routeName: "Default",
        icon: Icons.MaterialCommunityIcons.Home,
      },
      {
        text: "News",
        routeName: "NewsScreen",
        icon: Icons.MaterialCommunityIcons.News,
      },
      {
        text: "contactus",
        routeName: "CustomPage",
        params: {
          id: 10941,
          title: "contactus",
        },
        icon: Icons.MaterialCommunityIcons.Pin,
      },
      {
        text: "About",
        routeName: "CustomPage",
        params: {
          url: "http://inspireui.com",
        },
        icon: Icons.MaterialCommunityIcons.Email,
      },
      // {
      //   text: "Setting",
      //   routeName: "SettingScreen",
      //   icon: Icons.MaterialCommunityIcons.Setting,
      // },
    ],
  },

  //define menu for profile tab
  ProfileSettings: [
    {
      label: "WishList",
      routeName: "WishListScreen",
    },
    {
      label: "MyOrder",
      routeName: "MyOrders",
    },
    {
      label: "Address",
      routeName: "Address",
    },
    {
      label: "Currency",
      isActionSheet: true,
    },
    // only support mstore pro
    //   {
    //     label: Languages.Languages,
    //     routeName: 'SettingScreen',
    //     value: language.lang,
    //   },
    {
      label: "PushNotification",
    },
    {
      label: "contactus",
      routeName: "CustomPage",
      params: {
        id: 10941,
        title: "contactus",
      },
    },
    {
      label: "Privacy",
      routeName: "CustomPage",
      params: {
        url: "https://inspireui.com/privacy",
      },
    },
    {
      label: "termCondition",
      routeName: "CustomPage",
      params: {
        url: "https://inspireui.com/term-of-service",
      },
    },
    {
      label: "About",
      routeName: "CustomPage",
      params: {
        url: "http://inspireui.com",
      },
    },
  ],

  // Layout select
  layouts: [
    {
      layout: Constants.Layout.card,
      image: Images.icons.iconCard,
      text: "cardView",
    },
    {
      layout: Constants.Layout.simple,
      image: Images.icons.iconRight,
      text: "simpleView",
    },
    {
      layout: Constants.Layout.twoColumn,
      image: Images.icons.iconColumn,
      text: "twoColumnView",
    },
    {
      layout: Constants.Layout.threeColumn,
      image: Images.icons.iconThree,
      text: "threeColumnView",
    },
    {
      layout: Constants.Layout.horizon,
      image: Images.icons.iconHorizal,
      text: "horizontal",
    },
    {
      layout: Constants.Layout.advance,
      image: Images.icons.iconAdvance,
      text: "advanceView",
    },
  ],

  // Default theme loading, this could able to change from the user profile (reserve feature)
  Theme: {
    isDark: false
  },

  // new list category design
  CategoryListView: true,

  DefaultCurrency: {
    symbol: "₹",
    name: "indian_rupees",
    code: "INR",
    name_plural: "indian_rupees",
    decimal: ".",
    thousand: ",",
    precision: 2,
    format: "%s%v", // %s is the symbol and %v is the value
  },

  DefaultCountry: {
    code: 'en',
    RTL: false, // em move config tu ben Constanst qua day de user ho de su dung
    language: 'English',
    countryCode: "IN",
    hideCountryList: false // when this option is try we will hide the country list from the checkout page, default select by the above 'countryCode'
  },
  HideCartAndCheckout: false,
  ShipwayIn: {
    url: "https://shipway.in/api",
    username: "bdmart",
    password: "af5bc7561b7b2b6120ec1207aa71a8b1"
  },
};
