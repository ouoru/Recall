import React, { Component } from 'react'
import { Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { stampToDate } from '../../../services/parseDate';

const { height, width } = Dimensions.get('window')
const PHOTO_SIZE = width / 5

const SearchResult = ({item}) => {
    return (
        <TouchableOpacity
            key={item.timestamp}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 2,
            }}
        >
            <View>
                <Image
                    source={{ uri: item.uri }}
                    style={styles.photoDim}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.keywordsStyle}>{item.keywords}</Text>
                <Text style={styles.dateStyle}>{item.timestamp && stampToDate(item.timestamp)}</Text>
            </View>
            <Icon
                name={'more-vertical'}
                size={22}
                color={'#fff'}
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
        margin: 2,
    },
    textContainer: {
        width: width / 2,
        paddingLeft: 10,
    },
    keywordsStyle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        lineHeight: 17,
        color: '#fff',
        letterSpacing: 0.4,
    },
    dateStyle: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        lineHeight: 15,
        color: '#e6e6e6',
    }
}

export default SearchResult