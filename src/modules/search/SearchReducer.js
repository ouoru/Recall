import fuseService from '../../services/fuseService'

const initialState = {
    searchText: '',
    searchFocused: false,
    searchResults: [],
}

const UPDATE_SEARCH_TEXT = 'search/update-search-text'
const UPDATE_SEARCH_RESULTS = 'search/update-search-results'
const UPDATE_SEARCH_FOCUS = 'search/update-search-focus'

export function updateSearchText(text) {
    return (dispatch, getState) => {
        const { library } = getState()
        const { gallery } = library

        dispatch({
            type: UPDATE_SEARCH_TEXT,
            payload: text
        })
        dispatch({
            type: UPDATE_SEARCH_RESULTS,
            payload: fuseService.search(text, gallery)
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
        case UPDATE_SEARCH_RESULTS:
            return { ...state, searchResults: action.payload }
        case UPDATE_SEARCH_FOCUS:
            return { ...state, searchFocused: action.payload }
        default:
            return state;
    }
}