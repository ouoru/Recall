import { combineReducers } from 'redux'

import LibraryReducer from '../modules/library/LibraryReducer'
import VaultReducer from '../modules/vault/VaultReducer'
import CameraReducer from '../modules/camera/CameraReducer'
import SearchReducer from '../modules/search/SearchReducer'

const reducers = {
    library: LibraryReducer,
    vault: VaultReducer,
    camera: CameraReducer,
    search: SearchReducer,
}

export default combineReducers( reducers )