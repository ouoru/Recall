import { combineReducers } from 'redux'

import HomeReducer from '../modules/home/HomeReducer'
import LibraryReducer from '../modules/library/LibraryReducer'
import VaultReducer from '../modules/vault/VaultReducer'
import CameraReducer from '../modules/camera/CameraReducer'

const reducers = {
    home: HomeReducer,
    library: LibraryReducer,
    vault: VaultReducer,
    camera: CameraReducer,
}

export default combineReducers( reducers )