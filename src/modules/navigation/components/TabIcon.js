import React, { Component } from 'react'
import { Animated, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

class TabIcon extends Component {
    render() {
        const { name, color, size, style, onPress, font } = this.props
        
        return (
            <Animated.View style={style}>
                <TouchableOpacity onPress={onPress}>
                    {font === 'fontAwesome' ? 
                        <FontAwesome
                            name={name}
                            color={color}
                            size={size}
                            style={{ textAlign: 'center' }}
                        />
                        :<Icon
                            name={name}
                            color={color}
                            size={size}
                        />
                    }
                </TouchableOpacity>
            </Animated.View>
        )
    }
}

export default TabIcon