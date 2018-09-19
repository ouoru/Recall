import React, { Component } from 'react'
import { TouchableOpacity, Image } from 'react-native'
import icon from '../../../assets/images/checked.png'

class SubmitButton extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
            >
                <Image source={icon} style={{ height: 30, width: 30 }}/>
            </TouchableOpacity>
        )
    }
}

export default SubmitButton