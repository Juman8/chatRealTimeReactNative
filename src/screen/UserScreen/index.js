import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import { Header } from '../../component'
import firebaseSvc from '../../FirebaseSvc';
import firebase from 'firebase'
import { FlatList } from 'react-native-gesture-handler';
class UserScreen extends React.Component {
    constructor(props){
        super(props)
        const data = props.navigation.getParam('data')
        this.state={
            arrUser: [],
            data,
            idMe: ''
        }
    }

    componentDidMount() {
        this.setState({ messages: [] })
    };

    onPress = (item) => {
        let data = this.state.data
        data.Id = this.state.idMe
        this.props.navigation.navigate('Chat', {item, data })
    }

    componentDidMount() {
      ID = `user`
      firebaseSvc.refOn((data) => 
      this.onGetMess(data.id)
      , ID);
    }

    onGetMess = (ID) => {
        var ref = firebase.database().ref(`user/${ID}`);
        ref.once("value")
        .then((snapshot) => {
            let Id = snapshot.child("ID").val()
            let Name = snapshot.child("name").val()
            let Avatar = snapshot.child("Avatar").val()
            let email = snapshot.child("email").val()

            let arr = this.state.arrUser
            if(email===this.state.data.email){
                this.setState({idMe: Id})
                return
            }
            arr.push({Id, Name, Avatar, email})
            this.setState({arrUser: arr})
        }).catch(err=> console.log(err));
    }

    componentWillUnmount() {
      firebaseSvc.refOff();
    }
    
    render() {
        return (
            <View style={{flex: 1}}>
                <Header
                    title="Danh sách người dùng"
                    navigation={this.props.navigation}
                />
                <FlatList
                    style={{paddingTop: 15, paddingBottom: 15}}
                    data={this.state.arrUser}
                    renderItem={({item})=> {
                        return(
                            <TouchableOpacity style={styles.view1} onPress={()=> this.onPress(item)}>
                                <Image source={{uri: item.Avatar}} style={{backgroundColor: 'gray', width: 40, height: 40, marginLeft: 15, borderRadius: 50}}/>
                                <Text style={{marginHorizontal: 15, fontSize: 16, color: "#000", fontWeight: "500"}}>{item.Name}</Text>
                            </TouchableOpacity>
                        )
                    }}
                    extraData={this.state}
                    keyExtractor={(item, index)=> `${index}`}
                 />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view1: {
        height: 60, 
        backgroundColor: '#f5f5f5', 
        marginVertical: 10, 
        marginHorizontal: 15, 
        borderRadius: 8, 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
        flexDirection: 'row'
    }
})
export default UserScreen