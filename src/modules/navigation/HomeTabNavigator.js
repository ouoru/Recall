import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'

import SearchView from '../search/SearchView'
import MemoView from '../memo/MemoView'
import PaperView from '../memo/PaperView'
import ProfileView from '../memo/ProfileView'
import BottomTabs from '../components/BottomTabs'

const HomeTabNavigator = createBottomTabNavigator(
    {
        Search: SearchView,
        Memo: { screen: MemoView },
        Paper: { screen: PaperView },
        Profile: { screen: ProfileView },
    },
    {
        tabBarComponent: props => <BottomTabs {...props}/>
    }
)

export default HomeTabNavigator