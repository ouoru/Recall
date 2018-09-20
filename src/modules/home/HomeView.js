import React, { Component } from 'react'
import { Dimensions, View } from 'react-native'
import { connect } from 'react-redux'

import CameraView from '../camera/CameraView';

import { savePhoto } from '../library/LibraryReducer'
import { showPhotoModal } from '../camera/CameraReducer'
import Aperture from '../camera/components/Aperture';
import Preview from '../preview/Preview';
import TopToast from './components/TopToast'

const { height, width } = Dimensions.get('window')

class HomeView extends Component {
    _takePicture = async () => {
        this.camera = this.refs.test.refs.camera

        if (this.camera) {
            const options = {
                quality: 0.5,
                fixOrientation: true,
                skipProcessing: true
            };
            const data = await this.camera.takePictureAsync(options)
            this.props.showPhotoModal(data, Date.now())
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <CameraView ref='test' navigation={this.props.navigation}/>
                <Aperture onPress={this._takePicture}/>
                <Preview/>
                <TopToast/>
            </View>
        )
    }
}

const styles = {
    container: {
        height,
        width
    },
    scrollView: {
        position: 'absolute',
        height, width,
    }
}

export default connect(
    null,
    { savePhoto, showPhotoModal }
)(HomeView)