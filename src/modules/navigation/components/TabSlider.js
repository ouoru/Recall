import React, { Component } from 'react'
import { Animated } from 'react-native'

const SLIDER_HEIGHT = 4
const SLIDER_WIDTH = 30
const dSLIDER = 30 + 15 + 15 

class TabSlider extends Component {
    render() {
        const { index } = this.props
        
        return (
            <Animated.View style={{
                opacity: index.interpolate({
                    inputRange: [-1, 0, 1, 2, 3],
                    outputRange: [1, 1, 0, 1, 1]
                }),
                transform: [
                    { translateX: index.interpolate({
                        inputRange: [-1, 0, 1, 2, 3],
                        outputRange: [-dSLIDER, -dSLIDER, 0, dSLIDER, dSLIDER]
                    })}
                ],
                height: SLIDER_HEIGHT,
                width: SLIDER_WIDTH,
                borderRadius: SLIDER_HEIGHT/2,
                backgroundColor: '#fff',
                position: 'absolute',
                bottom: 40,
            }}/>
        )
    }
}

export default TabSlider