import React, { Component } from 'react'
import { Animated, Text } from 'react-native'
import { connect } from 'react-redux';

class TopToast extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: new Animated.Value(0),
            show: false,
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.showToast !== this.props.showToast) {
            this.setState({
                show: true
            })

            Animated.timing(
                this.state.visible, {
                    toValue: newProps.showToast ? 1 : 0,
                    duration: 200,
                    useNativeDriver: true
                }
            ).start(this._hideToast)
        }
    }

    _hideToast = () => {
        setTimeout(() => {
            this.setState({
                show: false
            })

            Animated.timing(
                this.state.visible, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true
                }
            ).start()
        }, 2000)
    }

    render(){
        if (!this.state.show) return null
        return (
            <Animated.View
                style={[ styles.container, 
                    {
                        transform: [{
                            translateY: this.state.visible.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 65]
                            })
                        }],
                        opacity: this.state.visible
                    }
                ]}
            >
                <Text style={styles.textStyle}>
                    <Text style={{ fontFamily: 'Roboto-Bold' }}>
                        {this.props.showToast}
                    </Text>
                    {' was added to your '} 
                    <Text style={{ fontFamily: 'Roboto-Bold' }}>
                        {'Photos'}
                    </Text>
                </Text>
            </Animated.View>
        )
    }
}

const styles = {
    container: {
        position: 'absolute',
        top: 10,
        left: 15,
        right: 15,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8
    },
    textStyle: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#000'
    }
}

export default connect(
    state => ({
        showToast: state.library.showToast
    })
)(TopToast)