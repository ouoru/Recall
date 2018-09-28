import React, { Component } from 'react'
import { View, TextInput } from 'react-native'
import { connect } from 'react-redux'

import Action from '../components/Action'

import { updateSearchText, onSearchBarFocused } from './SearchReducer'
import { statusBarMargin } from '../../services/deviceMargin'
import { components } from '../common/types'

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
            </View>
        )
    }
}

const styles = {
    container: {
        height: components.searchBarHeight + statusBarMargin(),
        backgroundColor: '#000',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    searchBar: {
        flexDirection: 'row',
        marginTop: statusBarMargin(),
        height: components.searchBarHeight,
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    }
}

export default connect(
    null,
    { updateSearchText, onSearchBarFocused }
)(SearchBar)