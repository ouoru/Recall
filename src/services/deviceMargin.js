import { Platform, StatusBar } from 'react-native'

export const statusBarMargin = () => {
    if (Platform.OS === 'android') {
        return StatusBar.currentHeight
    }
    return 20
}