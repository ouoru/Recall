import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Shadow from './Shadow'

import Explore from '../navigation/Explore'

const ICON_SIZE = 25
const ICON_COLOR = '#757575'
const ICON_SELECTED = '#000'
const { width } = Dimensions.get('window')

const TABS = [
    { index: 0, name: 'md-home', routeName: 'Search', title: 'Home' },
    { index: 1, name: 'md-create', routeName: 'Memo', title: 'Memo' },
    { name: 'ios-camera', routeName: 'Camera', size: 33, color: '#fff', extraStyle: true },
    { index: 2, name: 'ios-paper-plane', routeName: 'Paper', title: 'Paper' },
    { index: 3, name: 'md-person', routeName: 'Profile', title: 'Profile' },
]

class BottomTabs extends Component {
    _onPress(routeName) {
        Explore.navigate(routeName)
    }

    _renderItem = (item) => {
        const { state } = this.props.navigation
        const { index } = state
        const active = index === item.index

        return (
            <TouchableOpacity
                key={item.routeName}
                style={[
                    styles.tabContainer,
                    item.extraStyle && styles.extraStyle,
                ]}
                activeOpacity={0.5}
                onPress={this._onPress.bind(this, item.routeName)}
            >
                <Icon
                    name={item.name}
                    size={item.size || ICON_SIZE}
                    color={(active && ICON_SELECTED) || item.color || ICON_COLOR}
                />
                {item.title &&
                    <Text style={active ? styles.textActiveStyle : styles.textStyle}>
                        {item.title}
                    </Text>
                }
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View>
                <Shadow side="top" height={3}/>
                <View style={styles.tabStyle}>
                    {TABS.map(this._renderItem)}
                </View>
            </View>
        )
    }
}

const styles = {
    tabStyle: {
        flexDirection: 'row',
        height: 55,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    tabContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: ICON_COLOR,
    },
    textActiveStyle: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: ICON_SELECTED,
    },
    bigIconView: {
        width: width/5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    extraStyle: {
        height: 44,
        borderRadius: 22,
        backgroundColor: ICON_COLOR
    }
}

export default BottomTabs