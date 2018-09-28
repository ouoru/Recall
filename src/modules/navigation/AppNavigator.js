import { Dimensions } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import CameraNavigator from './CameraNavigator'
import HomeView from '../home/HomeView';

const { height } = Dimensions.get('window')

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
        HomeNav: {
            screen: HomeView,
        },
        CameraNav: {
            screen: CameraNavigator,
        },
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