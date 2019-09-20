import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const Button = (props) => {
    const { title, bgrColor = "white", onPress, styleBtn } = props
    return (

        <TouchableOpacity style={[styles, { backgroundColor: bgrColor }, styleBtn]}
            onPress={onPress && onPress}
        >
            <Text>{title}</Text>
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