import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import Explore from '../modules/navigation/Explore'

import AppNavigator from '../modules/navigation/AppNavigator';
import AndroidHandler from '../modules/components/AndroidHandler'

class App extends Component {
    render(){
        return (
            <Provider store = {store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AppNavigator ref={Explore.setTopLevelNavigator}/>
                </PersistGate>
            </Provider>
        )
    }
}

export default App