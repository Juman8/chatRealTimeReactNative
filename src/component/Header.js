import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import utils from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

class Header extends React.PureComponent {
    render() {
        const { title, navigation } = this.props
        return (
            <View style={{ height: 50, backgroundColor: '#a74fff', alignItems: 'center', justifyContent: 'flex-end' }}>
                <StatusBar barStyle="light-content" backgroundColor="#a74fff" />
                <Text style={{ color: 'white', marginBottom: 10, fontWeight: '600' }}>{title.toUpperCase()}</Text>
                <AntDesign name={"close"} size={25} style={{ position: 'absolute', paddingLeft: 15, paddingBottom: 8, left: 0 }} color="white"
                    onPress={() => navigation.goBack()}
                />
            </View>
        )
    }
}

export default Header