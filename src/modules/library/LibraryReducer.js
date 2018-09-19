import fuseService from '../../services/fuseService'

const initialState = {
    gallery: []
}

const SAVE_PHOTO = 'library/save-photo'

export function savePhoto(uri, keywords, timestamp) {
    return (dispatch, getState) => {
        const { library } = getState()
        const { gallery } = library
        
        dispatch({
            type: SAVE_PHOTO,
            payload: {
                uri,
                keywords,
                timestamp,
            }
        })
        fuseService.update({uri, keywords, timestamp}, gallery)
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case SAVE_PHOTO:
            return { ...state, gallery: [ ...state.gallery, action.payload ] }
        default:
            return state;
    }
}