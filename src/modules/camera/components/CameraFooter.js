import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'

const FOOTER_HEIGHT = 150
const FOOTER_COLOR = '#000'

const OPTIONS = [
    { key: 'PHOTO' },
    { key: 'VIDEO' },
    { key: 'MEMO' },
]

class CameraFooter extends Component {
    _renderItem = (item) => {
        return (
            <View
                key={item.key}
                style={styles.itemStyle}
            >
                <Text style={styles.itemTextStyle}>
                    {item.key}
                </Text>
            </View>
        )
    }

    render() {
        return (
            <View
                style={styles.footerStyle}
            >
                <ScrollView
                    horizontal
                    style={styles.footerScrollStyle}
                >
                    {OPTIONS.map(this._renderItem)}
                </ScrollView>

            </View>
        )
    }
}

const styles = {
    footerStyle: {
        height: FOOTER_HEIGHT,
        backgroundColor: FOOTER_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerScrollStyle: {
        
    },
    itemStyle: {

    },
    itemTextStyle: {
        color: '#fff',
        margin: 10,
    }
}

export default CameraFooter