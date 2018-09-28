import React, { Component } from 'react'
import { View, Animated, TouchableOpacity, SectionList } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'

import SearchResult from '../search/components/SearchResult'
import SearchTitle from '../search/components/SearchTitle'
import EmptyLibrary from '../search/components/EmptyLibrary'

import { SearchViewConfig } from '../search/SearchOptions'
import SearchBar from '../search/SearchBar';
import SearchView from '../search/SearchView'
import ActionFloat from './components/ActionFloat'
import BottomView from './BottomView';

const AnimatedOpacity = Animated.createAnimatedComponent(TouchableOpacity)

class HomeView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showBottom: false,
            bottomState: new Animated.Value(0)
        }
    }

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

    _animateBottom = (show) => {
        this.setState({
            showBottom: show
        })
        Animated.spring(
            this.state.bottomState, {
                toValue: show ? 1 : 0,
                duration: 250,
                useNativeDriver: true,
            }
        ).start()
    }

    render() {
        return (
            <View style={{backgroundColor: '#000', flex: 1}}>
                <Animated.View
                    style={{
                        transform: [
                            { scale: this.state.bottomState.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0.96] 
                            }) }
                        ],
                        flex: 1,
                        backgroundColor: '#fff',
                        borderRadius: this.state.showBottom ? 8 : 0,
                        overflow: 'hidden',
                    }}
                >
                    <SearchBar/>
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
                    {this.state.showBottom && 
                        <AnimatedOpacity 
                            style={{
                                position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
                                backgroundColor: 'rgba(0,0,0,0.4)',
                                opacity: this.state.bottomState
                            }}
                            activeOpacity={1}
                            onPress={this._animateBottom.bind(this, false)}
                        />
                    }
                    <ActionFloat/>
                </Animated.View>
                <BottomView
                    onPress={this._animateBottom.bind(this, true)}
                    bottomState={this.state.bottomState}
                />
                <SearchView/>
            </View>
        )    
    }
}

const styles = {
    container: {
        paddingBottom: 10,
        backgroundColor: '#fff',
    },
}

export default connect(
    state => ({
        library: state.library,
    })
)(HomeView)