import React from 'react'

import { Dimensions } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import CameraView from '../camera/CameraView'
import PreviewView from '../preview/PreviewView'
import CameraHeader from '../camera/components/CameraHeader'

const { height } = Dimensions.get('window')

const opacity = (index, position) => {
    const inputRange = [index - 1, index, index + 1];
    const opacity = position.interpolate({
        inputRange,
        outputRange: [0, 1, 1],
    });

    return {
        opacity
    };
};

const config = () => {
    return {
        // Define scene interpolation, eq. custom transition
        screenInterpolator: (sceneProps) => {
            const {position, scene} = sceneProps
            const {index} = scene
            
            return opacity(index, position)
        }
    }
};

const AppNavigator = createStackNavigator(
    {
        Camera: { screen: CameraView, },
        Preview: { screen: PreviewView },
    },
    {
        navigationOptions: {
            header: props => <CameraHeader {...props}/>
        },
        transitionConfig: config,
        cardStyle: {
            backgroundColor: 'transparent'
        }
    }
)

export default AppNavigator