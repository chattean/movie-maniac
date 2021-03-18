import {
    ADD_TO_WATCHLIST,
    REMOVE_FROM_WATCHLIST,
    UPDATE_MOVIES,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
} from "./actions"

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
                movies: [...action.movies],
            };
        case ADD_TO_WATCHLIST:
            return {
                ...state,

                watchList: [...state.watchList, action.movies],
            };
        case REMOVE_FROM_WATCHLIST:
            let newState = state.watchList.filter(movie => {
                return movie._id !== action._id;
            });

            return {
                ...state,
                watchList: newState
            };
        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories],
            };

        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            }

        default:
            return state
    }
}

export default reducers;