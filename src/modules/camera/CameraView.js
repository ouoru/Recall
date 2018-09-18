import React, { Component } from 'react'
import { View, Animated, Dimensions } from 'react-native'
import { RNCamera } from 'react-native-camera'

const { height, width } = Dimensions.get('window')

class CameraView extends Component {

    render() {
        const { scrollIndex } = this.props

        return (
            <View style={styles.container}>
                <RNCamera
                    ref={'camera'}
                    style={styles.camera}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                    fixOrientation={true}
                    forceUpOrientation={true}
                />
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 0, bottom: 0,
                        left: 0, right: 0,
                        backgroundColor: '#334D5D',
                        opacity: scrollIndex.interpolate({
                            inputRange: [-1, 0, 1, 2, 3],
                            outputRange: [1, 1, 0, 1, 1]
                        })
                    }}
                />
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