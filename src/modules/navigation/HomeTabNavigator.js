import React, { Component } from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'

import SearchView from '../search/SearchView'
import BottomTabs from '../components/BottomTabs'
import SearchBar from '../search/SearchBar'

const HomeTabNavigator = createBottomTabNavigator(
    {
        Search: { screen: SearchView },
        Search2: { screen: SearchView },
        Search3: { screen: SearchView },
        Search4: { screen: SearchView },
        Search5: { screen: SearchView },
    },
    {
        tabBarComponent: props => <BottomTabs {...props}/>
    }
)

class HomeNavigator extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <SearchBar/>
                <HomeTabNavigator/>
            </View>
        )
    }
}

export default HomeNavigator