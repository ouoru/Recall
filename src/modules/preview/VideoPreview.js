import React, { Component } from 'react'
import {
    View,
    Dimensions,
    Text,
    TextInput,
    ImageBackground,
    Keyboard,
    Animated,
    StatusBar,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import Video from 'react-native-video'

import Action from '../components/Action'

import { hidePhotoModal } from '../camera/CameraReducer'
import { savePhoto } from '../library/LibraryReducer'

const { height, width } = Dimensions.get('window')
const LEFT_MARGIN = 30
const BASE_Y = StatusBar.currentHeight + 25

class VideoPreview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keywords: null,
            error: null,

            keyboardY: new Animated.Value(BASE_Y),
            keyboardDidShow: false,
            keyboardHeight: null,
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
    
    //keyboardDidShow is un-ideal because it occurs after keyboard is shown.
    //This is only run the first time to get keyboardHeight
    _keyboardDidShow (e) {
        if (this.state.keyboardDidShow) return
        Animated.timing(
            this.state.keyboardY, {
                toValue: -e.endCoordinates.height - BASE_Y,
                duration: 250,
                useNativeDriver: true
            }
        ).start(
            () => this.setState({ 
                keyboardDidShow: true,
                keyboardHeight: e.endCoordinates.height,
            })
        )
    }

    _onFocus = () => {
        if (!this.state.keyboardDidShow) return
        Animated.timing(
            this.state.keyboardY, {
                toValue: -this.state.keyboardHeight - BASE_Y,
                duration: 250,
                useNativeDriver: true
            }
        ).start()
    }

    _onBackgroundPress = () => {
        Keyboard.dismiss()
    }

    _keyboardDidHide () {
        Animated.timing(
            this.state.keyboardY, {
                toValue: -BASE_Y,
                duration: 250,
                useNativeDriver: true
            }
        ).start()
    }

    _goBack = () => {
        this.props.navigation.goBack()
        this.props.hidePhotoModal()
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
            this.props.videoData.uri,
            this.state.keywords,
            this.props.videoData.timestamp
        )
        this.props.hidePhotoModal()
    }

    render() {
        const { videoData } = this.props

        return (
            <View style={styles.container}>
                <Video
                    source={{ uri: videoData.uri }}
                    style={styles.container}
                    repeat={true}
                />
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.darken}
                    onPress={this._onBackgroundPress}
                >
                    <Action name="x" color="#fff" size={22} style={{position: 'absolute', left: 30, top: 30}}
                        onPress={this._goBack}/>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            bottom: 0, left: 0, right: 0,
                            transform: [{ translateY: this.state.keyboardY }],
                        }}
                    >
                        <Text style={styles.titleText}>
                            {'Tag\nyour Video.'}
                        </Text>
                        <View style={styles.inputStyle}>
                            <TextInput
                                value={this.state.keywords}
                                onChangeText={this._onChangeText}
                                onFocus={this._onFocus}
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
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = {
    container: {
        position: 'absolute',
        height, width,
        justifyContent: 'center',
    },
    darken: {
        position: 'absolute',
        top: 0,
        left: 0,
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
        videoData: state.camera.videoData,
    }),
    { hidePhotoModal, savePhoto }
)(VideoPreview)