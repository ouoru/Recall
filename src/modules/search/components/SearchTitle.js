import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')
const HEADER_HEIGHT = 34

const SearchTitle = ({section: {title}}) => {
    return (
        <View style={styles.container}>
            <View style={styles.line}/>
            <Text style={styles.text}>{title}</Text>
            <View style={styles.line}/>
        </View>
    )
}

const styles = {
    container: {
        width,
        height: HEADER_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#f0f0f0',
    },
    text: {
        fontFamily: 'Roboto-Medium',
        fontSize: 12,
        lineHeight: 14,
        color: '#787878',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        letterSpacing: 0.5,
    },
}

export default SearchTitle