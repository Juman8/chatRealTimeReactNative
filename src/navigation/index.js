import { createStackNavigator } from 'react-navigation-stack';
import Home from '../../src/screen/home'
import Chat from '../../src/screen/chat'
import utils from '../utils'
import RegisterScreen from '../../src/screen/register'

const AppNavigator = createStackNavigator({
    Home: { screen: Home },
    Chat: { screen: Chat },
    RegisterScreen: { screen: RegisterScreen }
}, {
        headerMode: "none",
        initialRouteName: 'Home',
        defaultNavigationOptions: ({ navigation }) => {
            utils.setNavigation(navigation);
        }
    })

export default AppNavigator;