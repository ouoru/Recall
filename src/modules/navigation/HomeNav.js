import { createStackNavigator } from 'react-navigation'

import HomeView from '../home/HomeView'

const HomeNav = createStackNavigator(
    {
        Home: { screen: HomeView }
    },
    {
        headerMode: 'none'
    }
)

export default HomeNav