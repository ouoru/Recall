import { createStackNavigator } from 'react-navigation'

import CameraView from '../camera/CameraView'
import PhotoView from '../preview/PhotoView'
import VideoPreview from '../preview/VideoPreview'

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
            const {position, scene} = sceneProps;
            const {index} = scene;

            return opacity(index, position);
        }
    }
};

const HomeNav = createStackNavigator(
    {
        Camera: { screen: CameraView },
        Photo: { screen: PhotoView },
        Video: { screen: VideoPreview },
    },
    {
        headerMode: 'none',
        transitionConfig: config,
        cardStyle: {
            backgroundColor: 'transparent'
        }
    }
)

export default HomeNav