import React, { Component } from 'react'
import { TouchableOpacity, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

const AnimatedOpacity = Animated.createAnimatedComponent(TouchableOpacity)

class Action extends Component {
    render(){
        const { name, color, size, VectorType, animated } = this.props
        if (animated) return (
            <AnimatedOpacity
                hitSlop={{ left: 5, right: 5, top: 10, bottom: 10 }}
                activeOpacity={0.5}
                {...this.props}
            >
                {VectorType ?
                    <VectorType name={name} color={color || '#fff'} size={size || 22} style={{textAlign:'center'}}/>
                    :<Icon name={name} color={color || '#fff'} size={size || 22} style={{textAlign:'center'}}/>
                }
            </AnimatedOpacity>
        )
        return (
            <TouchableOpacity
                hitSlop={{ left: 5, right: 5, top: 10, bottom: 10 }}
                activeOpacity={0.5}
                {...this.props}
            >
                {VectorType ?
                    <VectorType name={name} color={color || '#fff'} size={size || 22} style={{textAlign:'center'}}/>
                    :<Icon name={name} color={color || '#fff'} size={size || 22} style={{textAlign:'center'}}/>
                }
            </TouchableOpacity>
        )
    }
}

export default Action