import { ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST, UPDATE_MOVIES } from "./actions"

const initialState = {
    movies: [],
    categories: [],
    currentCategory: '',
}

export const reducers = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_MOVIES:
            return {
                ...state,
                movies: [...action.movie],
            };
        case ADD_TO_WATCHLIST:
            return {
                ...state,

                watchList: [...state.watchList, action.movie],
            };
        case REMOVE_FROM_WATCHLIST:
            let newState = state.watchList.filter(movie => {
                return movie._id !== action._id;
            });

            return {
                ...state,
                watchList: newState
            }

        default:
            return state
    }
}

export default reducers;