import { types } from './LibraryTypes'

const initialState = {
    photos: [],
    videos: [],
    showToast: null,
}

const SAVE_PHOTO = 'library/save-photo'
const SAVE_VIDEO = 'library/save-video'
const SHOW_TOAST = 'library/show-toast'

export function savePhoto(uri, keywords, timestamp) {
    return (dispatch) => {
        dispatch({
            type: SAVE_PHOTO,
            payload: {
                uri,
                keywords,
                timestamp,
                type: types.photo
            }
        })
    }
}

export function saveVideo(uri, keywords, timestamp) {
    return (dispatch) => {
        dispatch({
            type: SAVE_VIDEO,
            payload: {
                uri,
                keywords,
                timestamp,
                type: types.video,
            }
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case SAVE_PHOTO:
            return { ...state, photos: [ ...state.photos, action.payload ] }
        case SAVE_VIDEO:
            return { ...state, videos: [ ...state.videos, action.payload ] }
        case SHOW_TOAST:
            return { ...state, showToast: action.payload }
        default:
            return state;
    }
}