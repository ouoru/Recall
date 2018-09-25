import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'

import Action from '../../components/Action'

const { height, width } = Dimensions.get('window')

class Aperture extends Component {
    render() {
        const { onPress, onLongPress, onPressOut } = this.props

        return (
            
            <LinearGradient 
                colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={styles.container}
            >
                <Action name="circle" color="#fff" size={80}
                    onPress={onPress} onLongPress={onLongPress} delayLongPress={200} onPressOut={onPressOut}/>
            </LinearGradient>
        )
    }
}

const styles = {
    container: {
        position: 'absolute',
        bottom: 0,
        height: 0.22 * height,
        width,
        justifyContent: 'center',
        alignItems: 'center',
    }
}

export default connect(
    state => ({
        searchText: state.search.searchText,
    })
)(Aperture)