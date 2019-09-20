import React from 'react'
import { View, Text, TextInput, TouchableOpacity,AsyncStorage } from 'react-native';
import firebase from 'firebase';
class Home extends React.Component{
    state={
        name: 'test1@gmail.com',
        pass: 'test123'
    }
    componentDidMount(){
        const firebaseConfig = {
            apiKey: "AIzaSyD31kM7wX_lLFShPH10jgoRcGo1__1DXcM",
            authDomain: "myapp-860b3.firebaseapp.com",
            databaseURL: "https://myapp-860b3.firebaseio.com",
            projectId: "myapp-860b3",
            storageBucket: "myapp-860b3.appspot.com",
            messagingSenderId: "1089323216357",
            appId: "1:1089323216357:web:000618631b608bfce7930c"
          };
        firebase.initializeApp(firebaseConfig);
    }

    onPress = () => {
        this.props.navigation.navigate('Chat')
    }

    onChangeName = (text, num) => {
        if(num===1) {
            this.setState({ name : text }) 
            return
        }
        this.setState({pass: text})
    };

    login = async(user, success_callback, failed_callback) => {
        await firebase.auth()
          .signInWithEmailAndPassword(user.email, user.password)
        .then(success_callback, failed_callback);
     }

    onLogin = async() => {
        let user = {
            email: this.state.name,
            password: this.state.pass
        }
        this.login(user, this.loginSuccess, this.loginFailed)
    }

    loginSuccess = () => {
        console.log('SUCCESS')
    }

    loginFailed = (err) => {
        console.log('Failed', err)
    }

    render(){
        return(
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 10, paddingBottom: 15 }} >
                <Text>
                    ENTER YOUR NAME :
                </Text>
                <TextInput 
                
                    value={this.state.name}
                    placeholder="" style={{
                    borderColor: "#A5A5A5",
                    borderWidth: 0.5, padding: 8, width: '100%', marginBottom: 15, marginTop: 15
                    }} 
                    onChangeText={(text) => this.onChangeName(text, 1)}
                />
                <Text>
                    ENTER YOUR PASS :
                </Text>
                <TextInput 
                    value={this.state.pass}
                    placeholder="" 
                    style={{
                        borderColor: "#A5A5A5",
                    borderWidth: 0.5, padding: 8, width: '100%', marginBottom: 15, marginTop: 15
                    }} 
                    onChangeText={(text) => this.onChangeName(text, 2)}
                />
                <TouchableOpacity onPress={() => this.onLogin()} >
                    <Text style={{ fontWeight: 'bold' }} >
                        Join Now
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Home