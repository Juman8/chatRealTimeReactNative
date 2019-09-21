import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Header, InputTextCustom, Button } from '../../component'
import { AppIcon } from '../../asset'
import { height_screen } from '../../config'
import AntDesign from 'react-native-vector-icons/AntDesign'
import utils from '../../utils'
import firebase from 'firebase'
class RegisterScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
        this.mEmail = ""
        this.mPass = ""
        this.mConfirm = ""
    }

    componentDidMount() {
        // console.log(utils)
        // utils.showToast('ALo')
    };

    onPress = () => {
        this.props.navigation.goBack()
    }

    checkEmail = () => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.mEmail)) {
            return true
        }
        return false
    }

    onRegister = async () => {
        if (!this.mEmail || !this.mPass) {
            return utils.showToast("Thông tin tài khoản không được trống")
        }
        if (!this.checkEmail()) {
            return utils.showToast("Email không đúng định dạng")
        }
        if (this.mPass.length < 6) {
            return utils.showToast("Độ dài của mật khẩu phải tối thiểu 6 kí tự")
        }

        if (this.mPass !== this.mConfirm) {
            return utils.showToast("Xác nhận mật khẩu không trùng khớp")
        }
        this.setState({ isLoading: true })
        firebase.auth()
            .createUserWithEmailAndPassword(this.mEmail, this.mPass).then(da => {
                this.setState({ isLoading: false })
                let mUser = {
                    email: this.mEmail,
                    password: this.mPass
                }
                utils.onLogin(mUser, this.onSuccess, this.onFailed)
            }).catch(er => {
                this.setState({ isLoading: false })
                utils.showToast(er.message, 2000)
            })
    }
    onSuccess = (e) => {
        console.log(e)
        // this.props.navigation.replace('Chat')
        this.props.navigation.navigate('Chat')

    }

    onFailed = (e) => {
        console.log(e)
        this.props.navigation.goBack()
    }
    render() {
        const { navigation } = this.props
        return (
            <View style={styles.view1}>
                <Image source={AppIcon} style={styles.image} />
                <InputTextCustom
                    placeHoder="Tài khoản (Email)"
                    txtStyle={styles.textInput}
                    onChangeText={(tx) => this.mEmail = tx}
                    keyboardType="email-address"
                    viewStyle={{ marginHorizontal: 10 }}
                    numOfType={1}
                    nameIcon="user"
                />

                <InputTextCustom
                    placeHoder="Mật khẩu (tối thiểu 6 kí tự)"
                    lable="Mật khẩu"
                    txtStyle={styles.textInput}
                    onChangeText={(tx) => this.mPass = tx}
                    viewStyle={{ marginTop: 5, marginHorizontal: 10 }}
                    numOfType={3}
                    nameIcon="unlocked"
                    isPassWord
                />
                <InputTextCustom
                    lable="Xác nhận mật khẩu"
                    placeHoder="Xác nhận mật khẩu"
                    txtStyle={styles.textInput}
                    onChangeText={(tx) => this.mConfirm = tx}
                    viewStyle={{ marginTop: 5, marginHorizontal: 10 }}
                    numOfType={2}
                    nameIcon="unlock"
                    isPassWord
                />

                <Button
                    title="Đăng ký"
                    styleBtn={{
                        marginTop: 35,
                    }}
                    onPress={this.onRegister}
                    isLoading={this.state.isLoading}
                />

                <AntDesign name={"close"} size={25} style={{ position: 'absolute', paddingLeft: 15, paddingBottom: 8, left: 0, top: 15 }} color="white"
                    onPress={this.onPress}
                />
            </View>
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

export default RegisterScreen