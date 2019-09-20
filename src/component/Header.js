import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import utils from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class Header extends React.PureComponent {
    render() {
        const { title } = this.props
        return (
            <View style={{ height: 50, backgroundColor: '#a74fff', alignItems: 'center', justifyContent: 'flex-end' }}>
                <StatusBar barStyle="light-content" backgroundColor="#a74fff" />
                <Text style={{ color: 'white', marginBottom: 10, fontWeight: '600' }}>{title.toUpperCase()}</Text>
            </View>
        )
    }
}

export default Header