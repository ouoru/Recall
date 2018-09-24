import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import LottieView from 'lottie-react-native'

class Action extends Component {
    render(){
        const { source, progress, style, animStyle, onPress } = this.props
        return (
            <TouchableOpacity
                hitSlop={{ left: 5, right: 5, top: 10, bottom: 10 }}
                activeOpacity={0.5}
                style={[
                    style,
                    {
                        alignItems: 'center',
                        justifyContent: 'center',
                    }
                ]}
                onPress={onPress}
            >
                <LottieView
                    source={source}
                    progress={progress}
                    style={[
                        animStyle,
                        {
                            position: 'absolute'
                        }
                    ]}
                />
            </TouchableOpacity>
        )
    }
}

export default Action