import React, { Component } from 'react'
import { View, Animated, Dimensions } from 'react-native'
import BottomIcon from './components/BottomIcon';

const { height, width } = Dimensions.get('window')
const REST_HEIGHT = 45
const MODAL_HEIGHT = 0.8 * height

class BottomView extends Component {
    render() {
        const { onPress, bottomState } = this.props

        return (
            <Animated.View
                style={[
                    styles.bottomContainer,
                    {
                        transform: [
                            { translateY: bottomState.interpolate({
                                inputRange: [0 ,1],
                                outputRange: [height - REST_HEIGHT, height - MODAL_HEIGHT]
                            }) }
                        ]
                    }
                ]}
            >
                <View style={styles.bottomBar}>
                    <BottomIcon
                        name="md-apps"
                        size={20}
                        color="#fff"
                        onPress={onPress}
                    />
                    <View style={{ flex: 1 }}/>
                    <BottomIcon
                        name="md-create"
                        size={20}
                        color="#fff"
                        onPress={onPress}
                    />
                    <BottomIcon
                        name="md-calendar"
                        size={20}
                        color="#fff"
                        onPress={onPress}
                    />
                </View>
            </Animated.View>
        )
    }
}

const styles = {
    bottomContainer: {
        position: 'absolute',
        top: 0, height: MODAL_HEIGHT + 15,
        left: 0, width,
        backgroundColor: '#2a3743',
    },
    bottomBar: {
        height: REST_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    }
}

export default BottomView