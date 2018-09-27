import React, { Component } from 'react'
import { View, TextInput, Animated } from 'react-native'
import { connect } from 'react-redux'

import Action from '../components/Action'
import Shadow from '../components/Shadow'

import { updateSearchText, onSearchBarFocused } from './SearchReducer'
import { statusBarMargin } from '../../services/deviceMargin'

const SEARCH_BAR_HEIGHT = 55
const SHADOW_HEIGHT = 6

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: null,
        }
    }

    _onChangeText = (text = '') => {
        this.setState({ searchText: text })
        this.props.updateSearchText(text)
    }

    _focusSearchBar = () => {
        this.refs.textInput.focus()
    }

    render() {
        return (
            <View style={styles.container}>   
                <View style={styles.searchBar}>
                    <Action name="search" color="rgba(0,0,0,0.5)" size={22} style={{marginRight: 5}}
                        onPress={this._focusSearchBar}/>
                    <TextInput
                        ref={'textInput'}
                        value={this.state.searchText}
                        onFocus={this.props.onSearchBarFocused}
                        onChangeText={this._onChangeText}
                        style={{
                            flex: 1,
                            color: '#000',
                            fontFamily: 'Roboto-Regular',
                            fontSize: 16,
                            marginRight: 5,
                            marginLeft: 5,
                        }}
                        placeholder={'Search'}
                        placeholderTextColor={'rgba(0,0,0,0.4)'}
                        autoCorrect={false}
                        underlineColorAndroid={'transparent'}
                    />
                </View>
                <Shadow side="bottom" height={SHADOW_HEIGHT}/>
            </View>
        )
    }
}

const styles = {
    container: {
        height: SEARCH_BAR_HEIGHT + statusBarMargin() + SHADOW_HEIGHT,
        backgroundColor: '#fff',
    },
    searchBar: {
        flexDirection: 'row',
        marginTop: statusBarMargin(),
        height: SEARCH_BAR_HEIGHT,
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    }
}

export default connect(
    null,
    { updateSearchText, onSearchBarFocused }
)(SearchBar)