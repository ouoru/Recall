import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { RNCamera } from 'react-native-camera'

import SearchBar from '../search/SearchBar';
import SearchResults from '../search/SearchResults';
import Aperture from './components/Aperture'

import { showPhotoModal } from './CameraReducer'

const { height, width } = Dimensions.get('window')

class CameraView extends Component {
    _takePicture = async () => {
        if (this.refs.camera) {
            const options = {
                quality: 0.5,
                fixOrientation: true,
                skipProcessing: true
            };
            const data = await this.refs.camera.takePictureAsync(options)
            this.props.showPhotoModal(data, Date.now())
            this.props.navigation.navigate('Preview')
        }
    }

    render() {
        const { flash, camera } = this.props

        return (
            <View style={styles.container}>
                <RNCamera
                    ref={'camera'}
                    style={styles.camera}
                    type={camera ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
                    flashMode={flash ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                />
                <Aperture onPress={this._takePicture}/>
                <SearchResults/>
                <SearchBar navigation={this.props.navigation}/>
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
        flash: state.camera.flash
    }),
    { showPhotoModal }
)(CameraView)