import React from 'react'
import { View, Text, TextInput, StatusBar, TouchableOpacity, Image, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { AppIcon } from '../../asset'
import { height_screen, width_screen } from '../../config'
import { iconEmail, iconLock } from '../../asset'
import { Button, InputTextCustom } from '../../component'
class Home extends React.Component {
    state = {
        // name: 'test1@gmail.com',
        // pass: 'test123'
        name: '',
        pass: ''
    }
    componentDidMount() {
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
        if (num === 1) {
            this.setState({ name: text })
            return
        }
        this.setState({ pass: text })
    };

    login = async (user, success_callback, failed_callback) => {
        await firebase.auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then(success_callback, failed_callback);
    }

    onLogin = async () => {
        let user = {
            email: this.state.name,
            password: this.state.pass
        }
        this.login(user, this.loginSuccess, this.loginFailed)
    }

    loginSuccess = () => {
        console.log('SUCCESS')
        this.props.navigation.navigate('Chat')
    }

    loginFailed = (err) => {
        console.log('Failed', err)
    }

    render() {
        return (
            <View style={styles.view1}>
                <StatusBar barStyle="light-content" backgroundColor="#a74fff" />

                <Image source={AppIcon} style={styles.image} />
                <View style={{ width: '100%' }}>
                    <InputTextCustom
                        placeHoder="Tài khoản (Email)"
                        txtStyle={styles.textInput}
                        onChangeText={(tx) => this.setState({ name: tx })}
                        urlIcon={iconEmail}
                        keyboardType="email-address"
                    />

                    <InputTextCustom
                        placeHoder="Mật khẩu"
                        txtStyle={styles.textInput}
                        onChangeText={(tx) => this.setState({ pass: tx })}
                        urlIcon={iconLock}
                        viewStyle={{ marginTop: 5 }}
                    />

                </View>
                <Button title="Đăng nhập"
                    styleBtn={{ marginTop: 35 }}
                />
            </View >
        )
    }
}

const styles = StyleSheet.create({
    view1: { height: height_screen, backgroundColor: '#c991ff', alignItems: 'center', justifyContent: 'center' },
    textInput: { width: '100%', fontSize: 15, height: 42 },
    viewInput: { flexDirection: 'row', marginHorizontal: 15, borderBottomColor: "white", borderBottomWidth: 0.5, alignItems: 'center' },
    image: { height: 150, width: 150, position: 'absolute', top: 60 },
    image2: { height: 16, width: 18 },

})

export default Home