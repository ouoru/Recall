import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

class Action extends Component {
    render(){
        const { name, color, size } = this.props
        return (
            <TouchableOpacity
                hitSlop={{ left: 5, right: 5, top: 10, bottom: 10 }}
                activeOpacity={0.5}
                {...this.props}
            >
                <Icon name={name} color={color || '#fff'} size={size || 22} style={{textAlign:'center'}}/>
            </TouchableOpacity>
        )
    }
}

export default Action