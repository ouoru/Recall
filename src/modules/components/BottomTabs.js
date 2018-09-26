import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Action from './Action'

import Explore from '../navigation/Explore'

const ICON_SIZE = 20
const { height, width } = Dimensions.get('window')

class BottomTabs extends Component {

    _on3Press = () => {
        Explore.navigate('Camera')
    }

    render() {
        console.log('dlk', this.props)
        return (
            <View style={styles.tabStyle}>
                <Action name="md-image" size={ICON_SIZE} color="#000" style={styles.iconView}
                    VectorType={Ionicons}/>
                <Action name="md-image" size={ICON_SIZE} color="#000" style={styles.iconView}
                    VectorType={Ionicons}/>
                <Action name="md-image" size={25} color="#000" style={styles.iconView}
                    VectorType={Ionicons} onPress={this._on3Press}/>
                <Action name="md-image" size={ICON_SIZE} color="#000" style={styles.iconView}
                    VectorType={Ionicons}/>
                <Action name="md-image" size={ICON_SIZE} color="#000" style={styles.iconView}
                    VectorType={Ionicons}/>
            </View>
        )
    }
}

const styles = {
    tabStyle: {
        elevation: 1,
        flexDirection: 'row',
    },
    iconView: {
        width: width/5,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    }
}

export default BottomTabs