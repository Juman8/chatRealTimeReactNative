import React from 'react'
import { View, Text, Button } from 'react-native'
import { Header } from '../../component'
import { GiftedChat } from 'react-native-gifted-chat'
import firebaseSvc from '../../FirebaseSvc';
class ChatScreen extends React.Component {
  constructor(props){
    super(props)
    const item = props.navigation.getParam('item')
    const data = props.navigation.getParam('data')
    this.state={
      messages: [],
      data,
      item
    }
  }
   

    componentDidMount() {
        this.setState({
          messages: [],
        })
    };

    onPress = () => {
        this.props.navigation.goBack()
    }
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }

    componentDidMount() {
      const {data, item} = this.state
      ID = "Messages"
      let key = `${data.Id}${item.Id}`
      let key2 = `${item.Id}${data.Id}`
      firebaseSvc.getIdGroup((dat)=> {
        if(dat.hasChild(key)){
          this.setState({ID: key},()=>{
            this.onGetId()
          })
        }else{
          this.setState({ID: key2},()=>{
            this.onGetId()
          })
        }
      })
    }

    onGetId = () => {
      ID = `Messages/${this.state.ID}`
      firebaseSvc.refOn((message) =>
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, message),
        })), ID
      );
    }
    componentWillUnmount() {
      firebaseSvc.refOff();
    }

    get user() {
      const {data} = this.state
      return {
        email: data.email,
        avatar: '',
        id: data.Id,
        _id: data.Id, // need for gifted-chat
      };
    }
    
    render() {
      const {item} = this.state
        return (
            <View style={{flex: 1}}>
                <Header
                    title={item.Name || ''}
                    navigation={this.props.navigation}
                    back
                />
               <GiftedChat
                  messages={this.state.messages}
                  onSend={firebaseSvc.send}
                  user={this.user}
                />
            </View>
        )
    }
}

export default ChatScreen