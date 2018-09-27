import React, { Component } from 'react'
import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { stampToDate } from '../../../services/parseDate';

const { height, width } = Dimensions.get('window')
const PHOTO_SIZE = width / 5

const SearchResult = ({item}) => {
    const isVideo = item.type === 'type/video'

    return (
        <TouchableOpacity
            key={item.timestamp}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 2,
            }}
        >
            <View style={{ marginLeft: 15, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={{ uri: item.uri }}
                    style={styles.photoDim}
                />
                {isVideo && <Icon
                    name="ios-play"
                    size={30}
                    color="#fff"
                    style={{position: 'absolute'}}
                />}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.keywordsStyle}>{item.keywords}</Text>
                <Text style={styles.dateStyle}>{item.timestamp && stampToDate(item.timestamp)}</Text>
            </View>
            <Icon
                name={'md-more'}
                size={22}
                color={'#646464'}
                style={styles.iconStyle}
            />
        </TouchableOpacity>
    )
    
}

const styles = {
    container: {
        position: 'absolute',
        top: 0, bottom: 0,
        left: 0, right: 0,
        paddingTop: 65,
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    photoDim: {
        width: PHOTO_SIZE,
        height: PHOTO_SIZE,
        borderRadius: 3,

    },
    textContainer: {
        width: width / 2,
        paddingLeft: 10,
    },
    keywordsStyle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        lineHeight: 17,
        color: '#000',
        letterSpacing: 0.4,
    },
    dateStyle: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        lineHeight: 15,
        color: '#646464',
    },
    iconStyle: {
        marginLeft: 'auto',
        marginRight: 15,
    }
}

export default SearchResult