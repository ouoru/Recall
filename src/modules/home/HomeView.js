import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import { RNCamera } from 'react-native-camera'

const { height, width } = Dimensions.get('window')

class HomeView extends Component {
    render() {
        return (
            <View style={styles.container}>
            
            </View>
        )
    }
}

const styles = {
    container: {
        height, width,
        flexDirection: 'column',
        backgroundColor: 'transparent'
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}

export default HomeView