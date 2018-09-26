import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import Explore from '../modules/navigation/Explore'

import AppNavigator from '../modules/navigation/AppNavigator';
import SearchBar from '../modules/search/SearchBar'
import AndroidHandler from '../modules/components/AndroidHandler'

class App extends Component {
    render(){
        return (
            <Provider store = {store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AndroidHandler/>
                    <AppNavigator ref={Explore.setTopLevelNavigator}/>
                </PersistGate>
            </Provider>
        )
    }
}

export default App