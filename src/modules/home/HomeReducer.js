const initialState = {
    showBottomView: false,
}

const TOGGLE_BOTTOMVIEW = 'home/toggle-bottomview'

export function toggleBottomView() {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_BOTTOMVIEW
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case TOGGLE_BOTTOMVIEW:
            return { ...state, showBottomView: !state.showBottomView }
        default:
            return state;
    }
}