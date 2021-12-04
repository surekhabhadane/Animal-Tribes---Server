import {
    FILTER_BRAND,
    FILTER_COLOR,
    FILTER_PRICE,
    SORT_BY,
    SEARCH_BY,
    FILTER
} from '../constant/actionTypes';

const filtersReducerDefaultState = {
    brand: [],
    value: { min: 0, max: 950 },
    sortBy: "",
    searchBy:"",
    filter:{}
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case FILTER_BRAND:
            return {
                ...state,
                brand: action.brand
            };
        case FILTER:
            return {
                ...state,
                filter: action.payload
            };
        case FILTER_COLOR:
            return {
                ...state,
                color: action.color
            };
        case FILTER_PRICE:
            return {
                ...state,
                value: { min: action.value.value.min, max: action.value.value.max }
            };
        case SORT_BY:
            return {
                ...state,
                sortBy: action.sort_by
            };
            case SEARCH_BY:
                return {
                    ...state,
                    searchBy: action.search
            };
        default:
            return state;
    }
}

export default filtersReducer;