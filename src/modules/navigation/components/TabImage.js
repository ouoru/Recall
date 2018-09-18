import React, { Component } from 'react'
import { Animated, TouchableOpacity, Image } from 'react-native'

class TabImage extends Component {
    render() {
        const { source, style, imageStyle, onPress } = this.props
        
        return (
            <Animated.View style={style}>
                <TouchableOpacity onPress={onPress}>
                    <Image
                        source={source}
                        style={imageStyle}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
            </Animated.View>
        )
    }
}

export default TabImage