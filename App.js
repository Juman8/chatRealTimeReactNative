import React from 'react';
import { View, Text, YellowBox } from 'react-native';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './src/navigation'
const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
    console.disableYellowBox = true;
  }
  render(){
      return (
              <AppContainer />
      );
  }
};


export default App;
