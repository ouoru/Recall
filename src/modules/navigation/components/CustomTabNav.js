import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import TabIcon from './TabIcon'

import boxImage from '../../../assets/images/box.png'

const { width } = Dimensions.get('window')
const TAB_MARGIN = 40

class CustomTabNav extends Component {
    render() {
        return (
            <View style={styles.tabStyle}>
                <TabIcon
                    source={boxImage}
                    name="save"
                    color="#fff"
                    size={35}
                    style={{
                        transform: [
                            { translateX: this.props.scrollIndex.interpolate({
                                inputRange: [-1, 0, 1, 2, 3],
                                outputRange: [-20, -20, -width/4, -20, -20]
                            })},
                            { scale: this.props.scrollIndex.interpolate({
                                inputRange: [-1, 0, 1, 2, 3],
                                outputRange: [0.8, 0.8, 1, 0.8, 0.8]
                            })}
                        ]
                    }}
                    imageStyle={{
                        height: 35,
                        width: 35
                    }}
                    onPress={this.props.onTabPress.bind(this, 0)}
                />
                <TabIcon
                    source={boxImage}
                    name="circle"
                    color="#fff"
                    size={70}
                    style={{
                        transform: [
                            { translateY: this.props.scrollIndex.interpolate({
                                inputRange: [-1, 0, 1, 2, 3],
                                outputRange: [0, 0, -30, 0, 0]
                            })},
                            { scale: this.props.scrollIndex.interpolate({
                                inputRange: [-1, 0, 1, 2, 3],
                                outputRange: [1, 1, 1.3, 1, 1]
                            })}
                        ]
                    }}
                    imageStyle={{
                        height: 60,
                        width: 60
                    }}
                    onPress={this.props.onTabPress.bind(this, 1)}
                />
                <TabIcon
                    source={boxImage}
                    name="calendar"
                    color="#fff"
                    size={35}
                    style={{
                        transform: [
                            { translateX: this.props.scrollIndex.interpolate({
                                inputRange: [-1, 0, 1, 2, 3],
                                outputRange: [20, 20, width/4, 20, 20]
                            })},
                            { scale: this.props.scrollIndex.interpolate({
                                inputRange: [-1, 0, 1, 2, 3],
                                outputRange: [0.8, 0.8, 1, 0.8, 0.8]
                            })}
                        ]
                    }}
                    imageStyle={{
                        height: 35,
                        width: 35
                    }}
                    onPress={this.props.onTabPress.bind(this, 2)}
                />
            </View>
        )
    }
}

const styles = {
    tabStyle: {
        position: 'absolute',
        bottom: TAB_MARGIN,
        left: 0, right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
}

export default CustomTabNav