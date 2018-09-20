import fuseService from '../../services/fuseService'

const initialState = {
    photos: [],
    showToast: null,
}

const SAVE_PHOTO = 'library/save-photo'
const SHOW_TOAST = 'library/show-toast'

export function savePhoto(uri, keywords, timestamp) {
    return (dispatch, getState) => {
        const { library } = getState()
        const { photos } = library
        
        dispatch({
            type: SAVE_PHOTO,
            payload: {
                uri,
                keywords,
                timestamp,
            }
        })
        fuseService.update({uri, keywords, timestamp}, photos)
        dispatch({
            type: SHOW_TOAST,
            payload: keywords
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case SAVE_PHOTO:
            return { ...state, photos: [ ...state.photos, action.payload ] }
        case SHOW_TOAST:
            return { ...state, showToast: action.payload }
        default:
            return state;
    }
}