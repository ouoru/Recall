import React, { Component } from 'react'
import { ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'

import OpacityIn from '../animate/OpacityIn'
import SectionTitle from './components/SectionTitle';
import SearchMatch from './components/SearchMatch'

const { height, width } = Dimensions.get('window')
const PHOTO_SIZE = width / 5

class SearchResults extends Component {
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
                    {this.props.searchResults.map(SearchMatch)}
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
}

export default connect(
    state => ({
        searchText: state.search.searchText,
        searchFocused: state.search.searchFocused,
        searchResults: state.search.searchResults
    })
)(SearchResults)