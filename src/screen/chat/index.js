import React from 'react'
import { View, Text, Button } from 'react-native'
import { Header } from '../../component'
class ChatScreen extends React.Component {

    componentDidMount() {

    };

    onPress = () => {
        this.props.navigation.goBack()
    }
    render() {
        return (
            <View>
                <Header
                    title="Đăng nhập"
                />
                <Text>Man Hinh Chat</Text>
                <Button
                    title="Next Chat"
                    onPress={this.onPress}
                />
            </View>
        )
    }
}

export default ChatScreen