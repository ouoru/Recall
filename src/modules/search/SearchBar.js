import React, { Component } from 'react'
import { View, TextInput } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'
import LinearGradient from 'react-native-linear-gradient'

import { updateSearchText, updateSearchFocus } from './SearchReducer'

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: null
        }
    }

    _onChangeText = text => {
        this.setState({
            searchText: text
        })
        this.props.updateSearchText(text)
    }

    _onFocus = () => {
        this.props.updateSearchFocus(true)
    }
    
    _onBlur = () => {
        this.props.updateSearchFocus(false)
        if (this.state.searchText) {
            
        } else {
            this._onChangeText('')
        }
    }

    render() {
        const { photoTaken, searchFocused, searchText } = this.props

        if (photoTaken) return null

        return (
            <LinearGradient 
                colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.container, searchText || searchFocused ? {} : styles.bottomBorder]}
            >
                <Icon name="search" color="#fff" size={22} style={{ marginLeft: 30 }}/>
                <TextInput
                    value={this.state.searchText}
                    onFocus={this._onFocus}
                    onBlur={this._onBlur}
                    onChangeText={this._onChangeText}
                    style={{
                        flex: 1,
                        color: '#fff',
                        fontFamily: 'Roboto-Regular',
                        fontSize: 18,
                        marginRight: 5,
                        marginLeft: 5,
                    }}
                    placeholder={'Search'}
                    placeholderTextColor={'rgba(255,255,255,0.6)'}
                    autoCorrect={false}
                    underlineColorAndroid={'transparent'}
                />
                <Icon name="grid" color="#fff" size={22} style={{ marginRight: 30 }}/>
            </LinearGradient>
        )
    }
}

const styles = {
    container: {
        position: 'absolute',
        top: 0,
        left: 0, right: 0,
        height: 65,
        paddingTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomBorder: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.4)',
    }
}

export default connect(
    state => ({
        photoTaken: state.camera.photoTaken,
        searchText: state.search.searchText,
        searchFocused: state.search.searchFocused,
    }),
    { updateSearchText, updateSearchFocus }
)(SearchBar)