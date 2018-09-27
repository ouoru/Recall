import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Shadow from './Shadow'

import Action from './Action'
import Explore from '../navigation/Explore'

const ICON_SIZE = 25
const ICON_COLOR = '#757575'
const { height, width } = Dimensions.get('window')

const TABS = [
    { name: 'md-home', routeName: 'Search', title: 'Home' },
    { name: 'md-create', routeName: 'Memo', title: 'Memo' },
    { name: 'ios-camera', routeName: 'Camera', size: 30, color: '#fff', extraStyle: {height: 44, borderRadius: 22, backgroundColor: ICON_COLOR}},
    { name: 'ios-paper-plane', routeName: 'Paper', title: 'Paper' },
    { name: 'md-person', routeName: 'Profile', title: 'Profile' },
]

class BottomTabs extends Component {
    _onPress(routeName) {
        Explore.navigate(routeName)
    }

    _renderItem = (item) => {
        return (
            <View key={item.routeName} style={[styles.tabContainer, item.extraStyle]}>
                <Action
                    name={item.name}
                    size={item.size || ICON_SIZE}
                    color={item.color || ICON_COLOR}
                    VectorType={Ionicons}
                    onPress={this._onPress.bind(this, item.routeName)}
                />
                {item.title && <Text style={styles.textStyle}>{item.title}</Text>}
            </View>
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
    bigIconView: {
        width: width/5,
        justifyContent: 'center',
        alignItems: 'center',
    },
}

export default BottomTabs