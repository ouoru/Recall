import { Dimensions, Platform } from 'react-native'
const { height, width } = Dimensions.get('window')

const baseHeight = 970
const baseWidth = 375

const wScale = s => Math.round(width / baseWidth * s)
const hScale = s => Math.round(height / baseHeight * s)

export default {
    wScale,
    hScale
}