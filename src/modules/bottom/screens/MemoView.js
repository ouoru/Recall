import React, { Component } from 'react'
import { View } from 'react-native'

import AnimatedInput from '../../components/AnimatedInput';

class MemoView extends Component {
    render() {
        return (
            <View>
                <AnimatedInput
                    placeholderText={"Create memo"}
                />
                <AnimatedInput
                    placeholderText={"Description"}
                />
            </View>
        )
    }
}

export default MemoView