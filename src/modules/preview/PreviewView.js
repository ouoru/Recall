import React, { Component } from 'react'
import {
    View,
    Dimensions,
    Text,
    TextInput,
    Image,
    Keyboard,
    Animated,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import Video from 'react-native-video'

import Action from '../components/Action'

import { hidePreview } from '../camera/CameraReducer'
import { savePhoto, saveVideo } from '../library/LibraryReducer'

const { height, width } = Dimensions.get('window')
const PHOTO_MARGIN = 15

class PhotoView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keywords: null,
            error: null,

            keyboardY: new Animated.Value(PHOTO_MARGIN),
            keyboardDidShow: false,
        }
    }

    componentDidMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
    }
    
    //keyboardDidShow is un-ideal because it occurs after keyboard is shown.
    //This is only run the first time to get keyboardHeight
    _keyboardDidShow (e) {
        if (this.state.keyboardDidShow) return
        Animated.timing(
            this.state.keyboardY, {
                toValue: -e.endCoordinates.height - PHOTO_MARGIN,
                duration: 250,
                useNativeDriver: true
            }
        ).start(
            () => this.setState({ 
                keyboardDidShow: true,
            })
        )
    }

    _onBackgroundPress = () => {
        Keyboard.dismiss()
    }

    _onChangeText = text => {
        this.setState({
            keywords: text
        })
    }

    _verifyText = (previewType) => {
        if(!this.state.keywords) return
        if (previewType === 'type/photo') {
            this._savePhoto()
        } else if (previewType === 'type/video') {
            this._saveVideo()
        }
    }

    _savePhoto = () => {
        this.props.navigation.goBack()
        this.props.savePhoto(
            this.props.photoData.uri,
            this.state.keywords,
            this.props.photoData.timestamp
        )
        this.props.hidePreview()
    }

    _saveVideo = () => {
        this.props.navigation.goBack()
        this.props.saveVideo(
            this.props.videoData.uri,
            this.state.keywords,
            this.props.videoData.timestamp
        )
        this.props.hidePreview()
    }

    render() {
        const { photoData, videoData } = this.props
        const previewType = this.props.navigation.getParam('previewType', 'type/photo');
        
        return (
            <View style={styles.container}>
                {previewType === 'type/photo' ?
                    <Image
                        source={{ uri: photoData.uri }}
                        style={styles.container}
                    />
                    :<Video
                        source={{ uri: videoData.uri }}
                        style={styles.container}
                        repeat={true}
                    />
                }
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.darken}
                    onPress={this._onBackgroundPress}
                >
                    <Animated.View
                        style={{
                            position: 'absolute',
                            bottom: 0, left: 0, right: 0,
                            transform: [{ translateY: this.state.keyboardY }],
                        }}
                    >
                        <Text style={styles.titleText}>
                            {`Tag\nyour ${previewType === 'type/photo' ? 'Photo' : 'Video'}.`}
                        </Text>
                        <View style={styles.inputStyle}>
                            <TextInput
                                ref={'textInput'}
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
                                onPress={this._verifyText.bind(this, previewType)}/>
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
        height, width,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    titleText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 28,
        color: '#fff',
        paddingLeft: PHOTO_MARGIN,
    },
    inputStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: PHOTO_MARGIN,
        marginRight: PHOTO_MARGIN,
    }
}

export default connect(
    state => ({
        photoData: state.camera.photoData,
        videoData: state.camera.videoData,
    }),
    { hidePreview, savePhoto, saveVideo }
)(PhotoView)