import { Platform, StatusBar } from 'react-native'

export const androidStatusBarMargin = () => {
    if (Platform.OS === 'android') {
        return StatusBar.currentHeight
    }
    return 0
}