import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')

class LibraryView extends Component {
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
        backgroundColor: 'black'
    },
}

export default LibraryView