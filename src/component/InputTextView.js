import React from 'react'
import { View, Text, TextInput, StyleSheet, Image, Animated, Easing } from 'react-native'
import Icon1 from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Icon3 from 'react-native-vector-icons/Fontisto'

class InputTextCustom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            txtName: '',
            txtColor: props.txtColor || '#000',
            path: props.urlIcon,
            opacity: 0
        }
    }

    getIcon = () => {
        const { numOfType, nameIcon, colorIcon = "white" } = this.props
        switch (numOfType) {
            case 1: {
                return <Icon1 name={nameIcon} size={20} color={colorIcon} style={{marginLeft: 15}}/>
            }
            case 2: {
                return <Icon2 name={nameIcon} size={20} color={colorIcon} style={{marginLeft: 15}} />
            }
            case 3: {
                return <Icon3 name={nameIcon} size={20} color={colorIcon} style={{marginLeft: 15}} />
            }
        }
    }

    // onAnimate = () => {
    //     return Animated.timing(
    //         this.spinValue,
    //         {
    //             toValue: 1,
    //             duration: 4000,
    //             easing: Easing.linear
    //         })
    // }

    onChangeText = (tx) => {
        const { onChangeText } = this.props
        this.setState({ txtName: tx }, () => {
            onChangeText(tx)
        })
    }
    onForcus = (status) => {
        const { txtName } = this.state
        const { txtColor } = this.props
        if (status) {
            this.setState({ txtColor: '#2e4aff', opacity: 1 })
        } else {
            this.setState({ txtColor: txtColor || 'white', opacity: 0 })
        }
    }
    render() {
        const { txtName, txtColor, opacity, path } = this.state
        const { placeHoder, txtStyle, viewStyle, keyboardType = "default", isPassWord = false, lable } = this.props
        let isCheck = opacity > 0
        return (
            <View style={[viewStyle]}>
                <Text style={[styles.textLable, { opacity }]}>{isPassWord && lable ? lable : placeHoder}</Text>
                <View style={styles.viewInput}>
                    {/* <Image source={path} style={styles.image2} /> */}
                    {this.getIcon()}
                    <TextInput
                        value={txtName}
                        placeholder={isCheck ? '' : placeHoder}
                        onChangeText={this.onChangeText}
                        style={[{ color: txtColor, fontSize: 17, paddingLeft: 10 }, txtStyle]}
                        placeholderTextColor="rgba(120, 120, 120, 0.9)"
                        onFocus={() => this.onForcus(true)}
                        onBlur={() => this.onForcus(false)}
                        autoCapitalize="none"
                        scrollEnabled={false}
                        keyboardType={keyboardType}
                        secureTextEntry={isPassWord}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: { width: '100%', fontSize: 17 },
    viewInput: { flexDirection: 'row', marginHorizontal: 15, borderBottomColor: "white", borderBottomWidth: 0.5, alignItems: 'center', backgroundColor: '#dbdbdb', borderRadius: 25 },
    image2: { height: 16, width: 18 },
    textLable: { marginLeft: 15, color: 'rgba(120, 120, 120, 0.9)', fontSize: 16, fontWeight: '400' }
})


export default InputTextCustom