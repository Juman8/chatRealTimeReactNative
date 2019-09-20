import { createStackNavigator } from 'react-navigation-stack';
import Home from '../../src/screen/home'
import Chat from '../../src/screen/chat'
import utils from '../utils'

const AppNavigator = createStackNavigator({
    Home: {screen: Home},
    Chat: {screen: Chat}
}, {
    headerMode: "none",
    initialRouteName: 'Home',
    defaultNavigationOptions: ({ navigation }) => {
        utils.setNavigation(navigation);
    }
})

export default AppNavigator;