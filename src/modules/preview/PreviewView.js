import React, { Component } from 'react'
import { View, Dimensions, Text, TextInput, ImageBackground } from 'react-native'
import { connect } from 'react-redux'

import Action from '../components/Action'

import { hidePhotoModal } from '../camera/CameraReducer'
import { savePhoto } from '../library/LibraryReducer'

const { height, width } = Dimensions.get('window')
const LEFT_MARGIN = 30

class PreviewView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keywords: null,
            error: null,
        }
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
                            underlineColorAndroid={'#fff'}
                        />
                        <Action name="check" color='#fff' size={25} style={{position: 'absolute', right: 5}}
                            onPress={this._verifyText}/>
                    </View>
                    <View style={{ height: 200 }}/>
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