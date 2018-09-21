import React, { Component } from 'react'
import { SectionList } from 'react-native'
import { connect } from 'react-redux'

import OpacityIn from '../animate/OpacityIn'
import SearchResult from './components/SearchResult'
import SearchTitle from './components/SearchTitle'

import { SECTIONS } from './SearchOptions'

class SearchResults extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sectionData: []
        }
    }

    componentWillReceiveProps(newProps) {
        const { searchText, library } = newProps
        if (newProps.searchText !== this.props.searchText) {
            this._update(library, searchText)
        }
    }

    _update(library, searchText) {
        var newData = []

        for (var i=0; i<SECTIONS.length; i++) {
            newData.push({  
                title: SECTIONS[i].title,
                data: SECTIONS[i].filterUsing(library, searchText),
                renderItem: SECTIONS[i].renderItem || null,
            })
        }

        this.setState({
            sectionData: newData
        })
    }

    render() {
        return (
            <OpacityIn
                visible={this.props.searchFocused || this.props.searchText}
                style={styles.container}
            >
                <SectionList
                    renderItem={SearchResult}
                    renderSectionHeader={SearchTitle}
                    stickySectionHeadersEnabled={true}
                    sections={this.state.sectionData}
                    keyExtractor={(item, index) => item + index}
                    contentContainerStyle={{alignItems: 'center'}}
                    pointerEvents={"box-none"}
                />
            </OpacityIn>
        )    
    }
}

const styles = {
    container: {
        position: 'absolute',
        top: 0, bottom: 0,
        left: 0, right: 0,
        paddingTop: 50,
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
}

export default connect(
    state => ({
        searchText: state.search.searchText,
        searchFocused: state.search.searchFocused,
        searchResults: state.search.searchResults,
        library: state.library,
    })
)(SearchResults)