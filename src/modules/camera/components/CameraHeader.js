import React, { Component } from 'react'
import { View, Animated } from 'react-native'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Explore from '../../navigation/Explore'

import Action from '../../components/Action'
import Shadow from '../../components/Shadow'

import { toggleCamera, toggleFlash } from '../CameraReducer'
import { statusBarMargin } from '../../../services/deviceMargin'

const SEARCH_BAR_HEIGHT = 55

class CameraHeader extends Component {
    constructor(props) {
        super(props)
        this.animating = false
        this.state = {
            index: 0,
            screenIndex: new Animated.Value(0),
        }
    }

    componentWillReceiveProps(newProps) {
        const { index } = newProps.navigation.state
        
        if (this.animating) return
        this.animating = true
        Animated.timing(
            this.state.screenIndex, {
                toValue: index,
                duration: 250,
                useNativeDriver: true
            }
        ).start(
            () => {
                this.animating = false
                this.setState({ index })
            }
        )
    }

    _onClose = () => {
        Explore.back()
    }

    render() {
        const { toggleCamera, toggleFlash, flash } = this.props
        const onCamera = this.state.index === 0
        const cameraActionAnim = {
            transform: [
                { translateX: this.state.screenIndex.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 30]
                }) }
            ],
            opacity: this.state.screenIndex.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0]
            })
        }
        
        return (
            <Shadow side="bottom" shadow="rgba(0,0,0,0.4)" style={styles.container}>
                <View style={styles.searchBar}>
                    <Action name="x" color="#fff" size={24}
                        onPress={this._onClose}/>
                    <View style={{flex: 1}}/>
                    <Action name="ios-flash" color={flash?"#fff":"#e6e6e6"} size={27} animated
                        style={[cameraActionAnim, {marginRight: 20}]}
                        onPress={toggleFlash} VectorType={Ionicons}
                        disabled={!onCamera}/>
                    <Action name="ios-reverse-camera" color="#fff" size={30} animated
                        style={cameraActionAnim}
                        onPress={toggleCamera} VectorType={Ionicons}
                        disabled={!onCamera}/>
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
        height: SEARCH_BAR_HEIGHT + statusBarMargin(),
        backgroundColor: 'transparent',
    },
    searchBar: {
        flexDirection: 'row',
        marginTop: statusBarMargin(),
        height: SEARCH_BAR_HEIGHT,
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
)(CameraHeader)