import React, { Component } from 'react'
import { View, Animated, Dimensions } from 'react-native'
import { RNCamera } from 'react-native-camera'
import SearchBar from '../search/SearchBar';
import SearchResults from '../search/SearchResults';

const { height, width } = Dimensions.get('window')

class CameraView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={'camera'}
                    style={styles.camera}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                />
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

export default CameraView