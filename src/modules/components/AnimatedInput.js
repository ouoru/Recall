import React, { Component } from 'react'
import { Animated, TextInput, Keyboard } from 'react-native'

import Action from './Action'

class AnimatedInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            focused: false,
            focusState: new Animated.Value(0),
        }
    }

    componentDidMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }
    componentWillUnmount () {
        this.keyboardDidHideListener.remove();
    }
    _keyboardDidHide = () => {
        this.refs.textInput.blur()
    }

    _onChangeText = (text) => {
        this.setState({
            text,
        })
    }

    _onFocus = () => {
        this.setState({
            focused: true
        })
        Animated.spring(
            this.state.focusState, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }
        ).start()
    }

    _onBlur = () => {
        this.setState({
            focused: false
        })
        if (!this.state.text) {
            Animated.spring(
                this.state.focusState, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                }
            ).start()
        }
    }

    _verifyText = () => {
        
    }

    render() {
        const showPlaceholder = this.state.focused || !this.state.text

        return (
            <Animated.View
                style={styles.inputStyle}
            >
                <TextInput
                    ref={'textInput'}
                    value={this.state.text}
                    onChangeText={this._onChangeText}
                    onFocus={this._onFocus}
                    onBlur={this._onBlur}
                    style={{
                        flex: 1,
                        color: '#fff',
                        fontFamily: 'Roboto-Regular',
                        fontSize: 16,
                    }}
                    autoFocus={false}
                    autoCorrect={false}
                    underlineColorAndroid={'#fff'}
                />
                <Animated.Text
                    style={{
                        position: 'absolute',
                        left: 5,
                        color: '#dcdcdc',
                        fontFamily: 'Roboto-Regular',
                        fontSize: 16,
                        lineHeight: 18,
                        transform: [
                            {
                                scale: this.state.focusState.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 0.8]
                                })
                            },
                            {
                                translateY: this.state.focusState.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, -22]
                                })
                            },
                            {
                                translateX: this.state.focusState.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, -8]
                                })
                            },
                        ],
                        opacity: showPlaceholder ? 1 : 0,
                    }}
                >{this.props.placeholderText}
                </Animated.Text>
                <Action name="check" color={this.state.text?'#fff':'#dcdcdc'} size={25}
                    style={{position: 'absolute', right: 5}}
                    onPress={this._verifyText}
                    disabled={!this.state.text}/>
            </Animated.View>
        )
    }
}

const styles = {
    inputStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        marginRight: 15,
    }
}

export default AnimatedInput