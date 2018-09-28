import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { RNCamera } from 'react-native-camera'

import Aperture from './components/Aperture'

import { passPhotoData, passVideoData } from './CameraReducer'
import Explore from '../navigation/Explore'
import { types } from '../library/LibraryTypes'
import CameraOverlay from './components/CameraOverlay';

const { height, width } = Dimensions.get('window')

class CameraView extends Component {
    constructor(props) {
        super(props)
        this.cameraRef = React.createRef();
        this.isLongPress = false
    }

    _takePicture = async () => {
        this.isLongPress = false
        if (this.cameraRef) {
            const options = {
                quality: 0.5,
                fixOrientation: true,
                skipProcessing: true,
                mirrorImage: !this.props.camera,
            };
            const data = await this.cameraRef.current.takePictureAsync(options)
            //this.cameraRef.current.pausePreview()
            this.props.passPhotoData(data)
            Explore.navigate('Preview', { previewType: types.photo })
        }
    }

    _startVideo = async () => {
        this.isLongPress = true
        if (this.cameraRef) {
            const options = {
                maxDuration: 8,
                mirrorVideo: !this.props.camera,
            };
            const data = await this.cameraRef.current.recordAsync(options)
            this.props.passVideoData(data)
            Explore.navigate('Preview', { previewType: types.video })
        }
    }

    _onPressOut = () => {
        if (this.isLongPress) {
            this.cameraRef.current.stopRecording()
        }
    }

    render() {
        const { flash, camera } = this.props

        return (
            <View style={styles.container}>
                <RNCamera
                    ref={this.cameraRef}
                    style={styles.camera}
                    type={camera ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
                    flashMode={flash ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                />
                <CameraOverlay/>
                <Aperture onPress={this._takePicture} onLongPress={this._startVideo} onPressOut={this._onPressOut}/>
            </View>
        )
    }
}

const styles = {
    container: {
        height, width,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
}

export default connect(
    state => ({
        camera: state.camera.camera,
        flash: state.camera.flash,
    }),
    { passPhotoData, passVideoData }
)(CameraView)