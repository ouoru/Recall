import React, { Component } from 'react' 
import { View } from 'react-native'

const HEADER_HEIGHT = 30
const HEADER_COLOR = '#000'

class CameraHeader extends Component {
    render() {
        return (
            <View
                style={styles.headerStyle}
            >

            </View>
        )
    }
}

const styles = {
    headerStyle: {
        height: HEADER_HEIGHT,
        backgroundColor: HEADER_COLOR,
    }
}

export default CameraHeader