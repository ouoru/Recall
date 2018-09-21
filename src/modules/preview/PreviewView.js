import React, { Component } from 'react'
import { View, Dimensions, Text, TextInput, ImageBackground, Keyboard, Animated, StatusBar } from 'react-native'
import { connect } from 'react-redux'

import Action from '../components/Action'

import { hidePhotoModal } from '../camera/CameraReducer'
import { savePhoto } from '../library/LibraryReducer'

const { height, width } = Dimensions.get('window')
const LEFT_MARGIN = 30
const BASE_KEYBOARD_Y = 0.8 * height

class PreviewView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keywords: null,
            error: null,
            keyboardVal: new Animated.Value(0),
            keyboardY: new Animated.Value(-BASE_KEYBOARD_Y),
            caretHidden: true,
        }
    }

    componentDidMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    
    _keyboardDidShow (e) {
        Animated.timing(
            this.state.keyboardY, {
                toValue: -e.endCoordinates.height - StatusBar.currentHeight - 20,
                duration: 250,
                useNativeDriver: true
            }
        ).start()
        Animated.timing(
            this.state.keyboardVal, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true
            }
        ).start(
            () => this.setState({ caretHidden: false })
        )
    }

    _keyboardDidHide () {
        Animated.timing(
            this.state.keyboardVal, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true
            }
        ).start()
    }

    _goBack = () => {
        this.props.navigation.goBack()
    }

    _onChangeText = text => {
        this.setState({
            keywords: text
        })
    }

    _verifyText = () => {
        if(!this.state.keywords) return
        this._savePhoto()
    }

    _savePhoto = () => {
        this.props.navigation.goBack()
        this.props.savePhoto(
            this.props.photoData.uri,
            this.state.keywords,
            this.props.photoData.timestamp
        )
        this.props.hidePhotoModal()
    }

    render() {
        const { photoData } = this.props

        return (
            <ImageBackground
                source={{ uri: photoData.uri }}
                style={styles.container}
            >
                <View style={styles.darken}>
                    <Action name="x" color="#fff" size={22} style={{position: 'absolute', left: 30, top: 30}}
                        onPress={this._goBack}/>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            bottom: 0, left: 0, right: 0,
                            transform: [{
                                translateY: this.state.keyboardY
                            }],
                            opacity: this.state.keyboardVal
                        }}
                    >
                        <Text style={styles.titleText}>
                            {'Tag\nyour Photo.'}
                        </Text>
                        <View style={styles.inputStyle}>
                            <TextInput
                                value={this.state.keywords}
                                onChangeText={this._onChangeText}
                                style={{
                                    flex: 1,
                                    color: '#fff',
                                    fontFamily: 'Roboto-Regular',
                                    fontSize: 16,
                                }}
                                placeholder={'Names, Keywords ...'}
                                placeholderTextColor={'#e6e6e6'}
                                autoFocus={true}
                                autoCorrect={false}
                                caretHidden={this.state.caretHidden}
                                underlineColorAndroid={'#fff'}
                            />
                            <Action name="check" color='#fff' size={25} style={{position: 'absolute', right: 5}}
                                onPress={this._verifyText}/>
                        </View>
                    </Animated.View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = {
    container: {
        position: 'absolute',
        height, width,
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    darken: {
        height, width,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    titleText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 28,
        color: '#fff',
        paddingLeft: LEFT_MARGIN,
    },
    inputStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: LEFT_MARGIN,
        marginRight: LEFT_MARGIN,
    }
}

export default connect(
    state => ({
        photoData: state.camera.photoData,
    }),
    { hidePhotoModal, savePhoto }
)(PreviewView)