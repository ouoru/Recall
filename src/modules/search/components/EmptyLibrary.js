import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import pictureSource from '../../../assets/images/folder.png'

class EmptyLibrary extends Component {
    render() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={pictureSource}
                    style={{ height: 60, width: 60 }}
                />
                <Text
                    style={{
                        fontFamily: 'Roboto-Medium',
                        fontSize: 13,
                        color: '#c8c8c8',
                        textAlign: 'center',
                    }}
                >
                    {`You don't have\nany files.`}
                </Text>
            </View>
        )
    }
}

export default EmptyLibrary