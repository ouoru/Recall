import React, { Component } from 'react'
import { ScrollView, Text, View, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'

import OpacityIn from '../animate/OpacityIn'

const { height, width } = Dimensions.get('window')
const PHOTO_MARGIN = 5

class SearchResults extends Component {
    _renderItem = ({item, score}) => {
        return (
            <View key={item.timestamp}>
                <Image source={{ uri: item.uri }} style={[styles.photoDim, styles.imagePadding]}/>
                <View style={styles.labelStyle}>
                    <Text style={styles.keywordsStyle}>
                        {item.keywords}
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
                <ScrollView
                    style={{
                        flex: 1
                    }}
                    contentContainerStyle={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        flexWrap: 'wrap'
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
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    photoDim: {
        width: width / 3 - 2 * PHOTO_MARGIN,
        height: width / 3 - 2 * PHOTO_MARGIN,
    },
    imagePadding: {
        margin: PHOTO_MARGIN,
    },
    labelStyle: {
        width: width / 3 - 2 * PHOTO_MARGIN,
        height: 40,
        backgroundColor: 'rgba(35,45,47,1)',
        marginLeft: PHOTO_MARGIN,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    keywordsStyle: {
        fontFamily: 'Roboto-Regular',
        fontSize: 17,
        lineHeight: 20,
        color: '#fff',
    }
}

export default connect(
    state => ({
        searchText: state.search.searchText,
        searchFocused: state.search.searchFocused,
        searchResults: state.search.searchResults
    })
)(SearchResults)