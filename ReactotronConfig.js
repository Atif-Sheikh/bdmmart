import Reactotron from 'reactotron-react-native'
import { reactotronRedux as reduxPlugin } from 'reactotron-redux'
import Expo from 'expo'

console.disableYellowBox = true

if (Expo.Constants.isDevice) {
  // test on real device: change to your local config
  Reactotron.configure({name: "Listable",host: "192.168.0.151"});
}
else {
  Reactotron.configure({name: 'Listable'})
}
Reactotron.useReactNative({
  asyncStorage: { ignore: ['secret'] }
})

Reactotron.use(reduxPlugin())

if (__DEV__) { 
  Reactotron.connect()
  Reactotron.clear()
}

console.tron = Reactotron