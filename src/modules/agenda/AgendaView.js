import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')

class AgendaView extends Component {
    render() {
        return (
            <View style={styles.container}>
            
            </View>
        )
    }
}

const styles = {
    container: {
        height: 0.9 * height,
        width,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
}

export default AgendaView