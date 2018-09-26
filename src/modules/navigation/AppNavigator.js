import { Dimensions } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import HomeTabNavigator from './HomeTabNavigator';
import CameraNavigator from './CameraNavigator'

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

const slideUp = (index, position) => {
    const inputRange = [index - 1, index, index + 1];
    const transform = [{
        translateY: position.interpolate({
            inputRange,
            outputRange: [height, 0, 0],
        })
    }]

    return {
        transform
    };
}


const config = () => {
    return {
        // Define scene interpolation, eq. custom transition
        screenInterpolator: (sceneProps) => {
            const {position, scene} = sceneProps;
            const {index} = scene;

            return slideUp(index, position);
        },
        transitionSpec: {
            duration: 300
        }
    }
};

const AppNavigator = createStackNavigator(
    {
        HomeTabNav: { screen: HomeTabNavigator },
        CameraNav: { screen: CameraNavigator },
    },
    {
        headerMode: 'none',
        transitionConfig: config,
        cardStyle: {
            backgroundColor: 'transparent'
        }
    }
)

export default AppNavigator