import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import Shadow from '../../components/Shadow'

const { width } = Dimensions.get('window')
const HEADER_HEIGHT = 34
const SHADOW_HEIGHT = 5

const SearchTitle = ({section: {title}}) => {
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.text}>{title}</Text>
            </View>
            <Shadow side="bottom" height={SHADOW_HEIGHT}/>
        </View>
    )
}

const styles = {
    container: {
        width,
        height: HEADER_HEIGHT + SHADOW_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#f0f0f0',
    },
    text: {
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        lineHeight: 16,
        color: '#787878',
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
    },
}

export default SearchTitle