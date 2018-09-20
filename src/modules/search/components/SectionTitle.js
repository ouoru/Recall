import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

class SectionTitle extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.line}/>
                <Text style={styles.text}>{this.props.children}</Text>
                <View style={styles.line}/>
            </View>
        )
    }
}

const styles = {
    container: {
        width,
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    text: {
        fontFamily: 'Roboto-Medium',
        fontSize: 12,
        lineHeight: 14,
        color: '#fff',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        letterSpacing: 0.5,
    },
}

export default SectionTitle