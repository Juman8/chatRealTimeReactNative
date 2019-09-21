import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'

const Button = (props) => {
    const { title, bgrColor = "white", onPress, styleBtn, txtColor = "#000", isLoading } = props
    return (

        <TouchableOpacity style={[styles, { backgroundColor: bgrColor }, styleBtn]}
            onPress={onPress && onPress}
        >{isLoading ?
            <ActivityIndicator size="small" color={txtColor} />
            :
            <Text style={{ color: txtColor, fontWeight: '500' }}>{title}</Text>
            }
        </TouchableOpacity>
    )
}

const styles = {
    height: 47,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
}

export default Button