import React, { Component } from 'react'
import { TouchableOpacity, Keyboard } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Explore from '../../navigation/Explore'
import { components } from '../../common/types'

const SIZE = components.actionButtonSize

//TODO for iOS

export default class ActionFloat extends Component {
    state = {
        visible: true
    }

    componentDidMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardEvent.bind(this, false));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardEvent.bind(this, true));
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    
    _keyboardEvent (show) {
        this.setState({
            visible: show
        })
    }

    onPress = () => {
        Explore.navigate('CameraNav')
    }

    render() {
        if (!this.state.visible) return null
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