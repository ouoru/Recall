import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import Picture from '../../../assets/images/pictures.png'

class EmptyLibrary extends Component {
    render() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={Picture}
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
                    {`You don't have\nany photos.`}
                </Text>
            </View>
        )
    }
}

export default EmptyLibrary