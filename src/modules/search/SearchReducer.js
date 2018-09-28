import fuseService from "../../services/fuseService";

const initialState = {
    searchText: '',
    showSearchView: false,
}

const UPDATE_SEARCH_TEXT = 'search/update-search-text'

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

export function onSearchBarFocus() {
    return (dispatch, getState) => {
        const {library} = getState()

        fuseService.initialSearch(library)
        dispatch({ type: SHOW_SEARCH_VIEW })
    }
}

export function onSearchBarBlur() {
    return (dispatch) => {
        dispatch({ type: HIDE_SEARCH_VIEW })
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
        case SHOW_SEARCH_VIEW:
            return { ...state, showSearchView: true }
        case HIDE_SEARCH_VIEW:
            return { ...state, showSearchView: false }
        default:
            return state;
    }
}