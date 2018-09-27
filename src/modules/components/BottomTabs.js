import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Shadow from './Shadow'

import Action from './Action'
import Explore from '../navigation/Explore'

const ICON_SIZE = 25
const ICON_COLOR = '#757575'
const { height, width } = Dimensions.get('window')

const TABS = [
    { name: 'md-image', routeName: 'Search' },
    { name: 'md-document', routeName: 'Memo' },
    { name: 'ios-camera', routeName: 'Camera' },
    { name: 'ios-paper-plane', routeName: 'Paper' },
    { name: 'md-person', routeName: 'Profile' },
]

class BottomTabs extends Component {
    _onPress(routeName) {
        Explore.navigate(routeName)
    }

    _renderItem = (item) => {
        return (
            <Action
                key={item.routeName}
                name={item.name}
                size={ICON_SIZE}
                color={ICON_COLOR}
                style={styles.iconView}
                VectorType={Ionicons}
                onPress={this._onPress.bind(this, item.routeName)}
            />
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
    },
    iconView: {
        width: width/5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bigIconView: {
        width: width/5,
        justifyContent: 'center',
        alignItems: 'center',
    }
}

export default BottomTabs