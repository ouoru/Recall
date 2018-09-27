import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const { width } = Dimensions.get('window')

class Shadow extends Component {
    render() {
        const { height, side, shadow, style } = this.props

        return (
            <LinearGradient
                colors={['rgba(0,0,0,0)', shadow || `rgba(0,0,0,0.1)`]}
                start={{x: 0, y: side === 'bottom' ? 1 : 0}}
                end={{x: 0, y: side === 'top' ? 1 : 0}}
                style={[{width, height}, style]}
            >
                {this.props.children}
            </LinearGradient>
        )
    }
}

export default Shadow