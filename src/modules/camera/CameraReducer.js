const initialState = {
    photoTaken: false,
    photoData: {},

    videoTaken: false,
    videoData: {},

    flash: false,
    camera: true, //true -> back, false -> front
}

const SHOW_PHOTO_MODAL = 'camera/show-photo-modal'
const HIDE_PHOTO_MODAL = 'camera/hide-photo-modal'
const PASS_VIDEO_DATA = 'camera/pass-video-data'

const TOGGLE_FLASH = 'camera/toggle-flash'
const TOGGLE_CAMERA = 'camera/toggle-camera'

const CAMERA_PHOTO = 'type/photo'
const CAMERA_VIDEO = 'type/video'

export function passPhotoData(data) {
    return (dispatch) => {
        dispatch({
            type: SHOW_PHOTO_MODAL,
            payload: {
                uri: data.uri,
                type: CAMERA_PHOTO,
                timestamp: Date.now()
            }
        })
    }
}

export function passVideoData(data) {
    return (dispatch) => {
        dispatch({
            type: PASS_VIDEO_DATA,
            payload: {
                uri: data.uri,
                type: CAMERA_VIDEO,
                timestamp: Date.now()
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
            return { ...state, photoTaken: true, photoData: action.payload }
        case HIDE_PHOTO_MODAL:
            return { ...state, photoTaken: false, photoData: {} }
        case PASS_VIDEO_DATA:
            return { ...state, videoTaken: true, videoData: action.payload }
        case TOGGLE_FLASH:
            return { ...state, flash: !state.flash }
        case TOGGLE_CAMERA:
            return { ...state, camera: !state.camera }
        default:
            return state;
    }
}