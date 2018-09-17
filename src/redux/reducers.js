import { combineReducers } from 'redux'

import HomeReducer from '../modules/home/HomeReducer'
import LibraryReducer from '../modules/library/LibraryReducer'
import VaultReducer from '../modules/vault/VaultReducer'

const reducers = {
    home: HomeReducer,
    library: LibraryReducer,
    vault: VaultReducer,
}

export default combineReducers( reducers )