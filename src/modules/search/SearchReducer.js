const initialState = {
    searchText: '',
    searchFocused: false,
}

const UPDATE_SEARCH_TEXT = 'search/update-search-text'
const UPDATE_SEARCH_FOCUS = 'search/update-search-focus'

export function updateSearchText(text) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_SEARCH_TEXT,
            payload: text
        })
    }
}

export function updateSearchFocus(focused) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_SEARCH_FOCUS,
            payload: focused
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case UPDATE_SEARCH_TEXT:
            return { ...state, searchText: action.payload }
        case UPDATE_SEARCH_FOCUS:
            return { ...state, searchFocused: action.payload }
        default:
            return state;
    }
}