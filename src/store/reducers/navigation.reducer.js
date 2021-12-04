import {
    SET_MENU_ITEM,
    SET_NAVIGATIONS_LOADIND,
    SET_NAVIGATIONS_DATA,
    SET_USER_ROLE,
    SET_OPERATION_NAVIGATIONS_LOADING,
    SET_ADD_ERROR,
    SET_ADD_NAVIGATIONS_MODAL_VISIBILITY,
    SET_UPDATE_NAVIGATIONS_MODAL_VISIBILITY,
    SET_REMOVE_NAVIGATIONS_MODAL_VISIBILITY,
    SET_NAVIGATIONS_SUCCESS_MESSAGE
} from '../constant/actionTypes';

const INIT_STATE = {
    menuItem: [],
    navigationMenuError: '',
    navigationsLoading: false,
    navigationsData: [],
    userRoles: [],
    navigationOperationLoading: false,
    addError: null,

    addNavigationModalVisibility: false,
    updateNavigationModalVisibility: false,
    removeNavigationModalVisibility: false,
    successMessage: null
};

export default (state = INIT_STATE, action) => {

    switch (action.type) {
        case SET_MENU_ITEM:
            return {
                ...state,
                menuItem: action.payload.menuItem,
                navigationMenuError: action.payload.navigationMenuError,
            }
        case SET_NAVIGATIONS_LOADIND:
            return { ...state, navigationsLoading: action.payload }
        case SET_NAVIGATIONS_DATA:
            return { ...state, navigationsData: action.payload }
        case SET_USER_ROLE:
            return { ...state, userRoles: action.payload }
        case SET_OPERATION_NAVIGATIONS_LOADING:
            return { ...state, navigationOperationLoading: action.payload }
        case SET_ADD_ERROR:
            return { ...state, addError: action.payload }
        case SET_ADD_NAVIGATIONS_MODAL_VISIBILITY:
            return { ...state, addNavigationModalVisibility: action.payload }
        case SET_UPDATE_NAVIGATIONS_MODAL_VISIBILITY:
            return { ...state, updateNavigationModalVisibility: action.payload }
        case SET_REMOVE_NAVIGATIONS_MODAL_VISIBILITY:
            return { ...state, removeNavigationModalVisibility: action.payload }
        case SET_NAVIGATIONS_SUCCESS_MESSAGE:
            return { ...state, successMessage: action.payload }
        default:
            return state;
    }
}