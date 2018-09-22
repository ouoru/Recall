const initialState = {
    showPreview: false,
    photoData: {},
    videoData: {},

    flash: false,
    camera: true, //true -> back, false -> front
}

const PASS_PHOTO_DATA = 'camera/show-photo-modal'
const PASS_VIDEO_DATA = 'camera/pass-video-data'
const HIDE_PREVIEW = 'camera/close-preview'

const TOGGLE_FLASH = 'camera/toggle-flash'
const TOGGLE_CAMERA = 'camera/toggle-camera'

const CAMERA_PHOTO = 'type/photo'
const CAMERA_VIDEO = 'type/video'

export function passPhotoData(data) {
    return (dispatch) => {
        dispatch({
            type: PASS_PHOTO_DATA,
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

export function hidePreview() {
    return (dispatch) => {
        dispatch({
            type: HIDE_PREVIEW
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
        case PASS_PHOTO_DATA:
            return { ...state, showPreview: true, photoData: action.payload }
        case PASS_VIDEO_DATA:
            return { ...state, showPreview: true, videoData: action.payload }
        case HIDE_PREVIEW:
            return { ...state, showPreview: false }

        case TOGGLE_FLASH:
            return { ...state, flash: !state.flash }
        case TOGGLE_CAMERA:
            return { ...state, camera: !state.camera }
        default:
            return state;
    }
}