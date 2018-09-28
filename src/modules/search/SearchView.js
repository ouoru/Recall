import React, { Component } from 'react'
import { Animated, SectionList, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'

import SearchResult from './components/SearchResult'
import SearchTitle from './components/SearchTitle'
import EmptyLibrary from './components/EmptyLibrary'

import { SearchViewConfig } from './SearchOptions'
import { components } from '../common/types'
import { statusBarMargin } from '../../services/deviceMargin'

const { height } = Dimensions.get('window')

class SearchView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sectionData: [],
            viewState: new Animated.Value(0)
        }
    }

    componentWillReceiveProps(newProps) {
        const { searchText, showSearchView, library } = newProps
        
        if (searchText !== this.props.searchText) {
            this._update(library, searchText)
        } else if (showSearchView !== this.props.showSearchView) {
            this._update(library, searchText)
            Animated.spring(
                this.state.viewState, {
                    toValue: newProps.showSearchView ? 1 : 0,
                    duration: 350,
                    useNativeDriver: true
                }
            ).start()
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
            <Animated.View
                style={[
                    styles.container,
                    {
                        transform: [{
                            translateY: this.state.viewState.interpolate({
                                inputRange: [0, 1],
                                outputRange: [height, 0]
                            })
                        }],
                    }
                ]}
            >
                <SectionList
                    renderItem={SearchResult}
                    renderSectionHeader={SearchTitle}
                    stickySectionHeadersEnabled={true}
                    sections={this.state.sectionData}
                    keyExtractor={(item, index) => item + index}
                    contentContainerStyle={styles.contentContainer}
                    pointerEvents={"box-none"}

                    ListEmptyComponent={EmptyLibrary}
                />
            </Animated.View>
        )    
    }
}

const styles = {
    container: {
        position: 'absolute',
        top: components.searchBarHeight + statusBarMargin(),
        bottom: 0, left: 0, right: 0,
        backgroundColor: '#fff',
    },
    contentContainer: {

    }
}

export default connect(
    state => ({
        searchText: state.search.searchText,
        searchResults: state.search.searchResults,
        library: state.library,
        showSearchView: state.search.showSearchView
    })
)(SearchView)