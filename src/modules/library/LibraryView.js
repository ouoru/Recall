import React, { Component } from 'react'
import { ScrollView, Dimensions, View, Image, Text } from 'react-native'
import { connect } from 'react-redux'

const { height, width } = Dimensions.get('window')

class LibraryView extends Component {
    _renderItem = (item) => {
        return (
            <View
                style={styles.itemStyle}
                key={item.timestamp}
            >
                <Image
                    source={{ uri: item.uri }}
                    style={ styles.itemImageStyle }
                    resizeMode={'cover'}
                />
                <Text 
                    style={styles.itemTextStyle}
                >
                    {item.timestamp}
                </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this.props.gallery.map(this._renderItem)}
                </ScrollView>
            </View>
        )
    }
}

const styles = {
    container: {
        height: 0.92 * height,
        width,
        backgroundColor: '#F4B459',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    itemStyle: {
        height: 150,
        width,
        flexDirection: 'row',
    },
    itemImageStyle: {
        height: 80,
        width: 80,
        borderRadius: 40,
    },
    itemTextStyle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 17,
        color: '#fff'
    }
}

export default connect(
    state => ({
        gallery: state.library.gallery
    })
)(LibraryView)