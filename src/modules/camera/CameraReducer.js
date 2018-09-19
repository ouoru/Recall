const initialState = {
    photoTaken: false,
    photoData: {},
}

const SHOW_PHOTO_MODAL = 'camera/show-photo-modal'
const HIDE_PHOTO_MODAL = 'camera/hide-photo-modal'

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



export default (state = initialState, action) => {
    switch(action.type){
        case SHOW_PHOTO_MODAL:
            return { ...state, photoTaken: true, photoData: action.payload }
        case HIDE_PHOTO_MODAL:
            return { ...state, photoTaken: false, photoData: {} }
        default:
            return state;
    }
}