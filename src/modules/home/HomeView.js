import React, { Component } from 'react'
import { SectionList } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'

import SearchResult from '../search/components/SearchResult'
import SearchTitle from '../search/components/SearchTitle'
import EmptyLibrary from '../search/components/EmptyLibrary'

import { SearchViewConfig } from '../search/SearchOptions'

class HomeView extends Component {
    _data(library, searchText = '') {
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

        return newData
    }

    render() {
        return (
            <SectionList
                renderItem={SearchResult}
                renderSectionHeader={SearchTitle}
                stickySectionHeadersEnabled={true}
                sections={this._data(this.props.library)}
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
        paddingBottom: 20,
        backgroundColor: '#fff',
    },
}

export default connect(
    state => ({
        library: state.library,
    })
)(HomeView)