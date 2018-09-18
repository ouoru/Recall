const initialState = {
    gallery: []
}

const SAVE_PHOTO = 'library/save-photo'

export function savePhoto(uri, timestamp) {
    return (dispatch) => {
        dispatch({
            type: SAVE_PHOTO,
            payload: {
                uri: uri,
                timestamp: timestamp
            }
        })
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