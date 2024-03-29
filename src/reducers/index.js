import { combineReducers } from 'redux';

import { ADD_MOVIES, 
         ADD_FAVOURITE, 
         REMOVE_FROM_FAVOURITE, 
         SET_SHOW_FAVOURITES, 
         ADD_MOVIE_TO_LIST,
         ADD_SEARCH_RESULT} 
from '../actions'; 

const initialMoviesState = {
    list : [],
    favourites : [],
    showFavourite : false
};

export function movies (state = initialMoviesState, action) {

    console.log("MOVIES REDUCER");
    // if(action.type === ADD_MOVIES){
    //     return {
    //         ...state,
    //         list : action.movies
    //     }
    // }
    // return state;

    switch(action.type){
        case ADD_MOVIES : 
            return{
                ...state,
                list: action.movies
            }

        case ADD_FAVOURITE :
            return {
                ...state,
                favourites : [action.movie, ...state.favourites]
            }
        
        case REMOVE_FROM_FAVOURITE :
            const filteredArray = state.favourites.filter(
                movie => movie.Title !== action.movie.Title
            );
            return {
                ...state,
                favourites : filteredArray
            }

        case SET_SHOW_FAVOURITES : {
            return {
                ...state,
                showFavourite : action.val
            }
        }

        case ADD_MOVIE_TO_LIST : 
            return {
                ...state,
                list : [action.movie, ...state.list]
            };

        default :
            return state;
    }
}

//Create Search Reducer 
const initialSearchState = {
    result: {},
    showSearchResults : false
};

export function search (state = initialSearchState, action) {
    
    switch(action.type){
        case ADD_SEARCH_RESULT : 
            return {
                ...state,
                result : action.movie,
                showSearchResults : true
            };
        case ADD_MOVIE_TO_LIST : 
            return {
                ...state,
                showSearchResults : false
            };
        default : 
            return state;
    }
}

//Create Root Reducer in which we will add all the child reducer so that we only have to call parent reducer

// const initialRootState = {
//     movies : initialMoviesState,
//     search : initialSearchState
// };

// export default function rootReducer (state = initialRootState, action) {
//     return {
//         movies : movies(state.movies, action),
//         search : search(state.search, action)
//     }
// }

export default combineReducers ({
    movies,
    search
});