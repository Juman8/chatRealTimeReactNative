import React from 'react'
import {View, Text, Button} from 'react-native'
class ChatScreen extends React.Component{

    componentDidMount(){
        
    };

    onPress = () => {
        this.props.navigation.goBack()
    }
    render(){
        return(
            <View>
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