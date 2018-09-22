import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import Explore from '../modules/navigation/Explore'

import AndroidHandler from '../modules/components/AndroidHandler'
import HomeNav from '../modules/navigation/HomeNav';

class App extends Component {
    render(){
        return (
            <Provider store = {store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AndroidHandler/>
                    <HomeNav ref={navigatorRef => {
                        Explore.setTopLevelNavigator(navigatorRef)
                    }}/>
                </PersistGate>
            </Provider>
        )
    }
}

export default App