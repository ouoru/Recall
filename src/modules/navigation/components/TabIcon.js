import React, { Component } from 'react'
import { Animated, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

class TabIcon extends Component {
    render() {
        const { name, source, color, size, style, imageStyle, onPress } = this.props
        
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

export default TabIcon