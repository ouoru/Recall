import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'

import HomeView from '../home/HomeView'
import MemoView from '../memo/MemoView'
import PaperView from '../memo/PaperView'
import ProfileView from '../memo/ProfileView'
import BottomTabs from '../components/BottomTabs'

const HomeTabNavigator = createBottomTabNavigator(
    {
        Home: { screen: HomeView },
        Memo: { screen: MemoView },
        Paper: { screen: PaperView },
        Profile: { screen: ProfileView },
    },
    {
        initialRouteName: 'Home',
        tabBarComponent: props => <BottomTabs {...props}/>
    }
)

export default HomeTabNavigator