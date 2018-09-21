const initialState = {
    photoData: {},

    flash: false,
    camera: true, //true -> back, false -> front
}

const SHOW_PHOTO_MODAL = 'camera/show-photo-modal'
const HIDE_PHOTO_MODAL = 'camera/hide-photo-modal'
const TOGGLE_FLASH = 'camera/toggle-flash'
const TOGGLE_CAMERA = 'camera/toggle-camera'

export function showPhotoModal(data, timestamp) {
    return (dispatch) => {
        dispatch({
            type: SHOW_PHOTO_MODAL,
            payload: {
                uri: data.uri,
                width: data.width,
                height: data.height,
                timestamp
            }
        })
    }
}

export function hidePhotoModal() {
    return (dispatch) => {
        dispatch({
            type: HIDE_PHOTO_MODAL
        })
    }
}

export function toggleFlash() {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_FLASH
        })
    }
}

export function toggleCamera() {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_CAMERA
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case SHOW_PHOTO_MODAL:
            return { ...state, photoData: action.payload }
        case HIDE_PHOTO_MODAL:
            return { ...state, photoData: {} }
        case TOGGLE_FLASH:
            return { ...state, flash: !state.flash }
        case TOGGLE_CAMERA:
            return { ...state, camera: !state.camera }
        default:
            return state;
    }
}