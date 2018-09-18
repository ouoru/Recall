import React, { Component } from 'react'
import { View, Animated, TouchableOpacity, Image } from 'react-native'
const AnimatedOpacity = Animated.createAnimatedComponent(TouchableOpacity)
import { connect } from 'react-redux'

import cameraPng from '../../../assets/images/camera.png'

class PreviewModal extends Component {
    constructor(props){ 
        super(props)
        this.state = {
            visibility: new Animated.Value(0)
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.photoTaken !== this.props.photoTaken) {
            Animated.timing(
                this.state.visibility, {
                    toValue: newProps.photoTaken ? 1 : 0,
                    duration: 300,
                    useNativeDriver: true
                }
            ).start()
        }
    }

    _discardPhoto = () => {
        //show extra alert
    }

    render() {
        if (!this.props.photoTaken) return null

        return (
            <AnimatedOpacity
                style={{
                    position: 'absolute',
                    left: 0, right: 0,
                    top: 0, bottom: 0,
                    opacity: this.state.visibility,
                    backgroundColor: 'rgba(0,0,0,0.7)'
                }}
                activeOpacity={1}
                onPress={this._discardPhoto}
            >
                <View
                    style={{ 
                        position: 'absolute',
                        left: 20, right: 20,
                        top: 250, bottom: 250,
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={cameraPng}
                        style={{
                            height: 40,
                            width: 40,
                        }}
                    />
                    <Image
                        source={{ uri: this.props.photoData.uri || null }}
                        style={{
                            height: 200,
                            width: 200,
                            transform: [{ rotate: '90deg' }]
                        }}
                    />
                    <View />
                </View>
            </AnimatedOpacity>
        )
    }
}

export default connect(
    state => ({
        photoTaken: state.camera.photoTaken,
        photoData: state.camera.photoData
    })
)(PreviewModal)