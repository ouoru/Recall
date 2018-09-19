import { combineReducers } from 'redux'

import LibraryReducer from '../modules/library/LibraryReducer'
import VaultReducer from '../modules/vault/VaultReducer'
import CameraReducer from '../modules/camera/CameraReducer'

const reducers = {
    library: LibraryReducer,
    vault: VaultReducer,
    camera: CameraReducer,
}

export default combineReducers( reducers )