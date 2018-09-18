import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import TabIcon from './TabIcon'
import TabSlider from './TabSlider'

const { width } = Dimensions.get('window')
const TAB_MARGIN = 40

class CustomTabNav extends Component {
    render() {
        return (
            <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0, right: 0,
                paddingBottom: TAB_MARGIN,
                paddingTop: TAB_MARGIN,
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
            }}>
                <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.4)']}
                    start={{x: 0.5, y: 0}}
                    end={{x: 0.5, y: 1}}
                    style={{
                        position: 'absolute',
                        top: 0, bottom: 0,
                        left: 0, right: 0
                    }}
                />
                <TabSlider
                    index={this.props.scrollIndex}
                />
                <TabIcon
                    font="fontAwesome"
                    name="archive"
                    color="#fff"
                    size={30}
                    style={{
                        marginBottom: 5,
                        transform: [
                            { translateX: this.props.scrollIndex.interpolate({
                                inputRange: [-1, 0, 1, 2, 3],
                                outputRange: [-15, -15, -width/4, -15, -15]
                            })},
                            { scale: this.props.scrollIndex.interpolate({
                                inputRange: [-1, 0, 1, 2, 3],
                                outputRange: [0.8, 0.8, 1, 0.8, 0.8]
                            })}
                        ]
                    }}
                    onPress={this.props.onTabPress.bind(this, 0)}
                />
                <TabIcon
                    name="circle"
                    color="#fff"
                    size={64}
                    style={{
                        marginBottom: 5,
                        transform: [
                            { translateY: this.props.scrollIndex.interpolate({
                                inputRange: [-1, 0, 1, 2, 3],
                                outputRange: [0, 0, -20, 0, 0]
                            })},
                            { scale: this.props.scrollIndex.interpolate({
                                inputRange: [-1, 0, 1, 2, 3],
                                outputRange: [1, 1, 1.25, 1, 1]
                            })}
                        ]
                    }}
                    onPress={this.props.onTabPress.bind(this, 1)}
                />
                <TabIcon
                    font="fontAwesome"
                    name="sticky-note"
                    color="#fff"
                    size={30}
                    style={{
                        marginBottom: 5,
                        transform: [
                            { translateX: this.props.scrollIndex.interpolate({
                                inputRange: [-1, 0, 1, 2, 3],
                                outputRange: [15, 15, width/4, 15, 15]
                            })},
                            { scale: this.props.scrollIndex.interpolate({
                                inputRange: [-1, 0, 1, 2, 3],
                                outputRange: [0.8, 0.8, 1, 0.8, 0.8]
                            })}
                        ]
                    }}
                    onPress={this.props.onTabPress.bind(this, 2)}
                />
            </View>
        )
    }
}

export default CustomTabNav