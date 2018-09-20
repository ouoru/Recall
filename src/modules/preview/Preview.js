import React, { Component } from 'react'
import { View, Dimensions, Text, TextInput, ImageBackground } from 'react-native'
import { connect } from 'react-redux'

import CloseButton from './components/CloseButton'
import SubmitButton from './components/SubmitButton'
import { hidePhotoModal } from '../camera/CameraReducer'
import { savePhoto } from '../library/LibraryReducer'

const { height, width } = Dimensions.get('window')
const LEFT_MARGIN = 30

class Preview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keywords: null,
            error: null,
        }
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
        this.props.savePhoto(
            this.props.photoData.uri,
            this.state.keywords,
            this.props.photoData.timestamp
        )
        this.props.hidePhotoModal()
        this.setState({
            keywords: null
        })
    }

    render() {
        const { photoTaken, photoData } = this.props

        if (!photoTaken) return null

        return (
            <ImageBackground
                source={{ uri: photoData.uri }}
                style={styles.container}
            >
                <View style={styles.darken}>
                    <CloseButton onPress={this.props.hidePhotoModal}/>
                    <Text style={styles.titleText}>
                        {'Tag\nyour Photo.'}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: LEFT_MARGIN,
                        marginRight: LEFT_MARGIN,
                    }}>
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
                        <SubmitButton onPress={this._verifyText}/>
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
}

export default connect(
    state => ({
        photoTaken: state.camera.photoTaken,
        photoData: state.camera.photoData,
    }),
    { hidePhotoModal, savePhoto }
)(Preview)