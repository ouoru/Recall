import React, { Component } from 'react'
import { View, Animated } from 'react-native'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Explore from '../../navigation/Explore'

import Action from '../../components/Action'
import Shadow from '../../components/Shadow'

import { toggleCamera, toggleFlash } from '../CameraReducer'
import { statusBarMargin } from '../../../services/deviceMargin'
import { components } from '../../common/types'

class CameraOverlay extends Component {
    _onClose = () => {
        Explore.back()
    }

    render() {
        const { toggleCamera, toggleFlash, flash } = this.props
        
        return (
            <Shadow side="bottom" shadow="rgba(0,0,0,0.4)" style={styles.container}>
                <View style={styles.searchBar}>
                    <Action name="x" color="#fff" size={24}
                        onPress={this._onClose}/>
                    <View style={{flex: 1}}/>
                    <Action name="ios-flash" color={flash?"#fff":"#e6e6e6"} size={27}
                        style={{marginRight: 20}}
                        onPress={toggleFlash} VectorType={Ionicons}/>
                    <Action name="ios-reverse-camera" color="#fff" size={30}
                        onPress={toggleCamera} VectorType={Ionicons}/>
                </View>
            </Shadow>
        )
    }
}

const styles = { 
    container: {
        position: 'absolute',
        top: 0,
        left: 0, right: 0,
        height: components.searchBarHeight + statusBarMargin(),
        backgroundColor: 'transparent',
    },
    searchBar: {
        flexDirection: 'row',
        marginTop: statusBarMargin(),
        height: components.searchBarHeight,
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    }
}

export default connect(
    state => ({
        camera: state.camera.camera,
        flash: state.camera.flash,
    }),
    {
        toggleCamera,
        toggleFlash,
    }
)(CameraOverlay)