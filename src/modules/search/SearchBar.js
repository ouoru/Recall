import React, { Component } from 'react'
import { TextInput } from 'react-native'
import { connect } from 'react-redux'

import Action from '../components/Action'
import LinearGradient from 'react-native-linear-gradient'

import { updateSearchText, updateSearchFocus } from './SearchReducer'
import { toggleCamera, toggleFlash } from '../camera/CameraReducer'

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: null
        }
    }

    _openDrawer = () => {
        this.props.navigation.openDrawer()
    }

    _onChangeText = text => {
        this.setState({
            searchText: text
        })
        this.props.updateSearchText(text)
    }

    _focus = () => {
        this.refs.textInput.focus()
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
        const { camera, flash,
            toggleCamera, toggleFlash,
            photoTaken,
            searchFocused, searchText } = this.props

        if (photoTaken) return null
        
        return (
            <LinearGradient 
                colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[styles.container, searchText || searchFocused ? {} : styles.bottomBorder]}
            >
                <Action name="user" color="#fff" size={25} style={{marginRight: 10}}
                    onPress={this._openDrawer}/>
                <Action name="search" color="#fff" size={22}
                    onPress={this._focus}/>
                <TextInput
                    ref={'textInput'}
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
                <Action name="zap" color={flash?"#fff":"#e6e6e6"} size={22} style={{marginRight: 20}}
                    onPress={toggleFlash}/>
                <Action name="camera" color="#fff" size={25}
                    onPress={toggleCamera}/>
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
        paddingLeft: 15,
        paddingRight: 15,
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
        camera: state.camera.camera,
        flash: state.camera.flash,

        photoTaken: state.camera.photoTaken,
        searchText: state.search.searchText,
        searchFocused: state.search.searchFocused,
    }),
    { updateSearchText, updateSearchFocus, toggleCamera, toggleFlash }
)(SearchBar)