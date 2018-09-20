import React, { Component } from 'react'
import { Dimensions, View } from 'react-native'

import CameraView from '../camera/CameraView';

import Preview from '../preview/Preview';
import TopToast from './components/TopToast'

const { height, width } = Dimensions.get('window')

class HomeView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <CameraView navigation={this.props.navigation}/>
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

export default HomeView