import React, { Component } from 'react'
import { View, TextInput, Animated } from 'react-native'
import { connect } from 'react-redux'

import Action from '../components/Action'
import Shadow from '../components/Shadow'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { updateSearchText, onSearchBarFocused, hideSearchView } from './SearchReducer'
import { toggleCamera, toggleFlash } from '../camera/CameraReducer'
import { statusBarMargin } from '../../services/deviceMargin'

const ANIM_START = 0.13
const ANIM_END = 0.4
const SEARCH_BAR_HEIGHT = 55
const SHADOW_HEIGHT = 6

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: null,
            animProgress: new Animated.Value(ANIM_START),
            searchBar: new Animated.Value(1)
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.showSearchView !== this.props.showSearchView) {
            Animated.timing(
                this.state.animProgress, {
                    toValue: newProps.showSearchView ? ANIM_END : ANIM_START,
                    duration: 400,
                    useNativeDriver: true
                }
            ).start()
            if (!newProps.showSearchView) {
                this._onChangeText()
                this.refs.textInput.blur()
            }
        }

        if(newProps.showPreview !== this.props.showPreview) {
            Animated.timing(
                this.state.searchBar, {
                    toValue: newProps.showPreview ? 0 : 1,
                    duration: 250,
                    useNativeDriver: true
                }
            ).start()
        }
    }

    _onChangeText = (text = '') => {
        this.setState({
            searchText: text
        })
        this.props.updateSearchText(text)
    }

    _onOptionPress = () => {
        if (this.props.showSearchView) {
            return this.props.hideSearchView()
        }
        //TODO menu logic
    }

    _focusSearchBar = () => {
        this.refs.textInput.focus()
    }

    render() {
        const { camera, flash,
            toggleCamera, toggleFlash,
        } = this.props
        
        return (
            <Animated.View
                style={[
                    styles.container,
                    {
                        transform: [
                            { translateY: this.state.searchBar.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-SEARCH_BAR_HEIGHT, 0]
                            })}
                        ]
                    }
                ]}
            >   
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
                    <Action name="ios-flash" color={flash?"#FFDC64":"#e6e6e6"} size={25} style={{marginRight: 20}}
                        onPress={toggleFlash} VectorType={Ionicons}/>
                    <Action name="ios-reverse-camera" color="#fff" size={28}
                        onPress={toggleCamera} VectorType={Ionicons}/>
                </View>
                <Shadow side="bottom" height={SHADOW_HEIGHT}/>
            </Animated.View>
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
    state => ({
        camera: state.camera.camera,
        flash: state.camera.flash,
        showSearchView: state.search.showSearchView,
        showPreview: state.camera.showPreview,
    }),
    { updateSearchText, onSearchBarFocused, hideSearchView, toggleCamera, toggleFlash }
)(SearchBar)