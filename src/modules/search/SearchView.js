import React, { Component } from 'react'
import { SectionList } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'

import SearchResult from './components/SearchResult'
import SearchTitle from './components/SearchTitle'
import EmptyLibrary from './components/EmptyLibrary'

import { SECTIONS } from './SearchOptions'

class SearchView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sectionData: [],
        }
    }

    componentWillReceiveProps(newProps) {
        const { searchText, showSearchView, library } = newProps
        
        if (searchText !== this.props.searchText) {
            this._update(library, searchText)
        } else if (showSearchView !== this.props.showSearchView) {
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

        //TODO empty section logic
        //currently just removes sections with data=[]
        _.remove(newData, a => !a.data.length)

        this.setState({
            sectionData: newData
        })
    }

    render() {
        return (
            <SectionList
                renderItem={SearchResult}
                renderSectionHeader={SearchTitle}
                stickySectionHeadersEnabled={true}
                sections={this.state.sectionData}
                keyExtractor={(item, index) => item + index}
                contentContainerStyle={styles.container}
                pointerEvents={"box-none"}

                ListEmptyComponent={EmptyLibrary}
            />
        )    
    }
}

const styles = {
    container: {
        flex: 1,
        paddingBottom: 20,
        backgroundColor: '#fff',
    },
}

export default connect(
    state => ({
        searchText: state.search.searchText,
        searchResults: state.search.searchResults,
        library: state.library,
        showSearchView: state.search.showSearchView
    })
)(SearchView)