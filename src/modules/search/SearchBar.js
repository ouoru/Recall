import React, { Component } from 'react'
import { TextInput, Animated } from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'

import Action from '../components/Action'
import LottiePress from '../components/LottiePress'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { updateSearchText, onSearchBarFocused, hideSearchView } from './SearchReducer'
import { toggleCamera, toggleFlash } from '../camera/CameraReducer'
import { statusBarMargin } from '../../services/deviceMargin'
import menuAndClose from '../../assets/animations/menuAndClose.json'

const ANIM_START = 0.13
const ANIM_END = 0.4
const SEARCH_BAR_HEIGHT = 75

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
                <LottiePress source={menuAndClose} progress={this.state.animProgress}
                    style={{height: 30, width: 30, marginRight: 10}}
                    animStyle={{height: 180, width: 180}}
                    onPress={this._onOptionPress}
                />
                <Action name="search" color="#fff" size={22}
                    onPress={this._focusSearchBar}/>
                <TextInput
                    ref={'textInput'}
                    value={this.state.searchText}
                    onFocus={this.props.onSearchBarFocused}
                    onChangeText={this._onChangeText}
                    style={{
                        flex: 1,
                        color: '#fff',
                        fontFamily: 'Roboto-Regular',
                        fontSize: 16,
                        marginRight: 5,
                        marginLeft: 5,
                    }}
                    placeholder={'Search'}
                    placeholderTextColor={'rgba(255,255,255,0.6)'}
                    autoCorrect={false}
                    underlineColorAndroid={'transparent'}
                />
                <Action name="ios-flash" color={flash?"#FFDC64":"#e6e6e6"} size={25} style={{marginRight: 20}}
                    onPress={toggleFlash} VectorType={Ionicons}/>
                <Action name="ios-reverse-camera" color="#fff" size={28}
                    onPress={toggleCamera} VectorType={Ionicons}/>
            </Animated.View>
        )
    }
}

const styles = {
    container: {
        position: 'absolute',
        top: 0,
        left: 0, right: 0,
        height: SEARCH_BAR_HEIGHT,
        paddingTop: statusBarMargin()/2,
        paddingLeft: 6,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000',
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
        showSearchView: state.search.showSearchView,
        showPreview: state.camera.showPreview,
    }),
    { updateSearchText, onSearchBarFocused, hideSearchView, toggleCamera, toggleFlash }
)(SearchBar)