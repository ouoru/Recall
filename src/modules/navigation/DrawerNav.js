import React from 'react'
import { Dimensions } from 'react-native'
import { createDrawerNavigator } from 'react-navigation'

import HomeNav from './HomeNav'
import DrawerView from '../profile/DrawerView'

const { width } = Dimensions.get('window')

const DrawerNav = createDrawerNavigator(
    {
        HomeContainer: HomeNav
    },
    {   
        drawerOpenRoute:'DrawerOpen',
        drawerCloseRoute:'DrawerClose',
        drawerToggleRoute:'DrawerToggle',
        initialRouteName: 'HomeContainer',
        drawerWidth: width * 0.75,
        contentComponent: props => <DrawerView navigation={props.navigation}/>
    }
)

export default DrawerNav