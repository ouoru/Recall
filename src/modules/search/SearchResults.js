import React, { Component } from 'react'
import { ScrollView, Text, View, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'

import OpacityIn from '../animate/OpacityIn'
import SectionTitle from './components/SectionTitle';

const { height, width } = Dimensions.get('window')
const PHOTO_SIZE = width / 5

class SearchResults extends Component {
    _renderItem = ({item, score}) => {
        return (
            <View key={item.timestamp} style={{
                flexDirection: 'row',
                marginBottom: 2,
            }}>
                <Image source={{ uri: item.uri }} style={[styles.photoDim, styles.imagePadding]}/>
                <View style={{
                    width: width * 3 / 5,
                    justifyContent: 'center',
                }}>
                    <Text
                        style={styles.keywordsStyle}
                    >
                        {item.keywords}
                    </Text>
                    <Text
                        style={styles.dateStyle}
                    >
                        Taken on Sept 13, 2018
                    </Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <OpacityIn
                visible={this.props.searchFocused || this.props.searchText}
                style={styles.container}
            >
                <SectionTitle>MY PHOTOS</SectionTitle>
                <ScrollView
                    style={{
                        flex: 1,
                    }}
                    contentContainerStyle={{
                        alignItems: 'center',
                    }}
                    pointerEvents="box-none"
                >
                    {this.props.searchResults.map(this._renderItem)}
                </ScrollView>
            </OpacityIn>
        )
    }
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
    imagePadding: {
        margin: 2,
    },
    keywordsStyle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        lineHeight: 17,
        color: '#fff',
        marginLeft: 10,
        letterSpacing: 0.4,
    },
    dateStyle: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        lineHeight: 15,
        color: '#e6e6e6',
        marginLeft: 10,
        letterSpacing: 0.4,
    }
}

export default connect(
    state => ({
        searchText: state.search.searchText,
        searchFocused: state.search.searchFocused,
        searchResults: state.search.searchResults
    })
)(SearchResults)