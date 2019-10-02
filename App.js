import React from 'react';
import { View, Text, YellowBox } from 'react-native';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './src/navigation'
import Toast from 'react-native-easy-toast'
import utils from './src/utils'
import firebase from 'firebase';
import SplashScreen from 'react-native-splash-screen'

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
    console.disableYellowBox = true;
  }
  componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyD31kM7wX_lLFShPH10jgoRcGo1__1DXcM",
      authDomain: "myapp-860b3.firebaseapp.com",
      databaseURL: "https://myapp-860b3.firebaseio.com",
      projectId: "myapp-860b3",
      storageBucket: "myapp-860b3.appspot.com",
      messagingSenderId: "1089323216357",
      appId: "1:1089323216357:web:000618631b608bfce7930c"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    utils.setToast(this.Toast)
    SplashScreen.hide();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppContainer />
        <Toast
          ref={ref => this.Toast = ref}
          opacity={0.8}
          style={{ backgroundColor: '#5cf545', width: '90%' }}
          textStyle={{ textAlign: 'center', color: 'white', fontWeight: '500' }}
        />
      </View>
    );
  }
};


export default App;
