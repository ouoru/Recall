import React, { Component } from 'react'
import { SectionList } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'

import SearchResult from './components/SearchResult'
import SearchTitle from './components/SearchTitle'
import EmptyLibrary from './components/EmptyLibrary'

import { SearchViewConfig } from './SearchOptions'

class SearchModal extends Component {
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

        for (var i=0; i<SearchViewConfig.length; i++) {
            newData.push({  
                title: SearchViewConfig[i].title,
                data: SearchViewConfig[i].filterUsing(library, searchText),
                renderItem: SearchViewConfig[i].renderItem || null,
            })
        }

        //TODO empty section logic
        //currently just removes SearchViewConfig with data=[]
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
                SearchViewConfig={this.state.sectionData}
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
)(SearchModal)