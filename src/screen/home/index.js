import React from 'react'
import { View, Text, TextInput, StatusBar, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { AppIcon } from '../../asset'
import { height_screen, width_screen } from '../../config'
import { Button, InputTextCustom } from '../../component'
import utils from '../../utils'
class Home extends React.Component {
    state = {
        // name: 'test1@gmail.com',
        // pass: 'test123'
        name: '',
        pass: '',
        isLoading: false
    }
    componentDidMount() {
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

    onLogin = async () => {
        this.setState({ isLoading: true })
        let user = {
            email: this.state.name,
            password: this.state.pass
        }
        utils.onLogin(user, this.loginSuccess, this.loginFailed)
    }

    loginSuccess = () => {
        console.log('SUCCESS')
        this.setState({ isLoading: false })
        this.props.navigation.navigate('Chat')
    }

    loginFailed = (err) => {
        this.setState({ isLoading: false })
        utils.showToast(err.message, 1500)
        console.log('Failed', err.message)
    }

    onRegister = () => {
        this.props.navigation.navigate('RegisterScreen')
    }

    render() {
        return (
            <View style={styles.view1}>
                <StatusBar barStyle="light-content" backgroundColor="#a74fff" />
                <View style={{ flex: 3, alignItems: 'center', justifyContent: 'center'  }}>
                    <Image source={AppIcon} style={styles.image} />
                </View>
                <View style={{ width: '100%', flex: 4, alignItems: 'center',  }}>
                    <InputTextCustom
                        placeHoder="Tài khoản (Email)"
                        txtStyle={styles.textInput}
                        onChangeText={(tx) => this.setState({ name: tx })}
                        keyboardType="email-address"
                        numOfType={1}
                        nameIcon="user"
                        txtColor="#000"
                    />

                    <InputTextCustom
                        placeHoder="Mật khẩu"
                        txtStyle={styles.textInput}
                        onChangeText={(tx) => this.setState({ pass: tx })}
                        viewStyle={{ marginTop: 5 }}
                        numOfType={3}
                        nameIcon="unlocked"
                        txtColor="#000"
                        isPassWord
                    />
                    <Button title="Đăng nhập"
                        styleBtn={{ marginTop: 35, width: '80%' }}
                        onPress={this.onLogin}
                        isLoading={this.state.isLoading}
                        bgrColor="#031cfc"
                        txtColor="white"
                    />
                    <Text style={{ color: '#000', marginTop: 15, textDecorationLine: 'underline' }} onPress={this.onRegister}>Đăng ký</Text>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view1: { height: height_screen, backgroundColor: '#ffffff', alignItems: 'center',marginHorizontal: 15,  },
    textInput: { width: '100%', fontSize: 15, height: 42 },
    viewInput: { flexDirection: 'row', marginHorizontal: 15, borderBottomColor: "white", borderBottomWidth: 0.5, alignItems: 'center' },
    image: { height: 150, width: 150},
    image2: { height: 16, width: 18 },

})

export default Home