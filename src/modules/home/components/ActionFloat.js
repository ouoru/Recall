import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Explore from '../../navigation/Explore'

const SIZE = 60

//TODO for iOS

export default class ActionFloat extends Component {
    onPress = () => {
        Explore.navigate('CameraNav')
    }

    render() {
        return (
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    right: 10,
                    bottom: 55,
                    backgroundColor: '#f0f0f0',
                    height: SIZE,
                    width: SIZE,
                    borderRadius: SIZE/2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 3,
                }}
                onPress={this.onPress}
            >
                <Icon
                    name="camera-retro"
                    size={30}
                    color="rgba(0,0,0,0.6)"
                />
            </TouchableOpacity>
        )
    }
}