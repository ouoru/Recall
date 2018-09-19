import React, { Component } from 'react'
import { View, TextInput } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'

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

    _onFocus = () => this.props.updateSearchFocus(true)
    _onBlur = () => this.props.updateSearchFocus(false)

    render() {
        if (this.props.photoTaken) return null

        return (
            <View style={styles.container}>
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
            </View>
        )
    }
}

const styles = {
    container: {
        position: 'absolute',
        top: 15,
        left: 0, right: 0,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.4)',
    }
}

export default connect(
    state => ({
        photoTaken: state.camera.photoTaken
    }),
    { updateSearchText, updateSearchFocus }
)(SearchBar)