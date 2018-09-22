import fuseService from "../../services/fuseService";

const initialState = {
    searchText: '',
    searchFocused: false,
    showSearchView: false,
}

const UPDATE_SEARCH_TEXT = 'search/update-search-text'
const UPDATE_SEARCH_FOCUS = 'search/update-search-focus'
const SHOW_SEARCH_VIEW = 'search/show-search-view'
const HIDE_SEARCH_VIEW = 'search/hide-search/view'

export function updateSearchText(text) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_SEARCH_TEXT,
            payload: text
        })
    }
}

export function updateSearchFocus(focused) {
    return (dispatch, getState) => {
        const {library} = getState()

        if (focused) {
            fuseService.initialSearch(library)
            dispatch({ type: SHOW_SEARCH_VIEW })
        }
        
        dispatch({
            type: UPDATE_SEARCH_FOCUS,
            payload: focused
        })
    }
}

export function hideSearchView() {
    return (dispatch) => {
        dispatch({ type: HIDE_SEARCH_VIEW })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case UPDATE_SEARCH_TEXT:
            return { ...state, searchText: action.payload }
        case UPDATE_SEARCH_FOCUS:
            return { ...state, searchFocused: action.payload }
        case SHOW_SEARCH_VIEW:
            return { ...state, showSearchView: true }
        case HIDE_SEARCH_VIEW:
            return { ...state, showSearchView: false }
        default:
            return state;
    }
}