import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

class CloseButton extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={{
                    position: 'absolute',
                    left: 30,
                    top: 30,
                }}
            >
                <Icon
                    name="x"
                    color="#fff"
                    size={22}
                />
            </TouchableOpacity>
        )
    }
}

export default CloseButton