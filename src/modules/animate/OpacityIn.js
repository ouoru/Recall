import React, { Component } from 'react'
import { Animated } from 'react-native'

export default class OpacityIn extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            val: new Animated.Value(props.visible ? 1 : 0)
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.visible !== this.props.visible) {
            Animated.timing(
                this.state.val, {
                    toValue: newProps.visible ? 1 : 0,
                    duration: 300,
                    useNativeDriver: true
                }
            ).start()
        }
    }

    render() {
        const { visible, style, children } = this.props
        
        if (!visible) return null
        return (
            <Animated.View
                style={[
                    {
                        opacity: this.state.val
                    },
                    style
                ]}
            >
                {children}
            </Animated.View>
        )
    }
}