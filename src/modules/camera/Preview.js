import React, { Component } from 'react'
import { View, Image, Dimensions, Text, TextInput, ImageBackground } from 'react-native'
import { connect } from 'react-redux'

import CloseButton from './components/CloseButton'
import SubmitButton from './components/SubmitButton'
import { hidePhotoModal } from './CameraReducer'
import { savePhoto } from '../library/LibraryReducer'

const { height, width } = Dimensions.get('window')

class PreviewModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keywords: null
        }
    }

    _onChangeText = text => {
        this.setState({
            keywords: text
        })
    }

    _savePhoto = () => {
        this.props.savePhoto(
            this.props.photoData.uri,
            this.state.keywords,
            this.props.photoData.timestamp
        )
        this.props.hidePhotoModal()
    }

    render() {
        const { photoTaken, photoData } = this.props

        if (!photoTaken) return null

        return (
            <ImageBackground
                source={{ uri: photoData.uri }}
                style={{
                    position: 'absolute',
                    height, width,
                    justifyContent: 'center',
                }}
            >
                <CloseButton onPress={this.props.hidePhotoModal}/>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <TextInput
                        value={this.state.keywords}
                        onChangeText={this._onChangeText}
                        style={{
                            flex: 0.5,
                            color: '#fff',
                            fontFamily: 'Roboto-Medium',
                            fontSize: 18,
                            marginRight: 5,
                            marginLeft: 5,
                        }}
                        placeholder={'Describe your Photo'}
                        placeholderTextColor={'#fff'}
                        autoCorrect={false}
                        underlineColorAndroid={'transparent'}
                    />
                    <SubmitButton onPress={this._savePhoto}/>
                </View>
            </ImageBackground>
        )
    }
}

export default connect(
    state => ({
        photoTaken: state.camera.photoTaken,
        photoData: state.camera.photoData,
    }),
    { hidePhotoModal, savePhoto }
)(PreviewModal)