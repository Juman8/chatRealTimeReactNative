import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screen/home'
import Chat from '../screen/chat'
import utils from '../utils'
import UserScreen from '../screen/UserScreen'
import RegisterScreen from '../../src/screen/register'

const AppNavigator = createStackNavigator({
    Home: { screen: Home },
    Chat: { screen: Chat },
    RegisterScreen: { screen: RegisterScreen },
    UserScreen: {screen: UserScreen}
}, {
        headerMode: "none",
        initialRouteName: 'Home',
        defaultNavigationOptions: ({ navigation }) => {
            utils.setNavigation(navigation);
        }
    })

export default AppNavigator;