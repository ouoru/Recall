import React, { Component } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

class SubmitButton extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={styles.buttonStyle}
            >
                <Icon name="arrow-right" size={23} color='#fff' style={{ textAlign: 'center' }}/>
            </TouchableOpacity>
        )
    }
}

const styles = {
    buttonStyle: {
        height: 35,
        width: 50,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#fff',
        justifyContent: 'center',
    },
}

export default SubmitButton