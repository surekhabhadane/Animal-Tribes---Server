import {
    SET_USERS,
    RESET_USER_DETAIL,
    RESET_USER_MESSAGES,
    SET_USER,
    SET_USER_ERROR,
    SET_USER_SUCCESS_MESSAGE,
    CHANGE_USER_LOAGING_STATUS,
    RESET_USER_LOCALSTORAGE_DATA,
    SET_USER_LOCALSTORAGE_DATA,
    SET_USER_ROLES,
} from '../constant/actionTypes';

const INIT_STATE = {
    loder: false,
    users: [],
    roles:{},
    errorMessage: '',
    successMessage: '',
    user: {},
    localstorageData: {
        _id: '',
        userId: '',
        authToken: '',
        profile: '',
    }
};

export default (state = INIT_STATE, action) => {

    switch (action.type) {
        case SET_USER_ERROR:
            return {
                ...state,
                errorMessage: action.payload,
            }
        case SET_USER_SUCCESS_MESSAGE:
            return {
                ...state,
                successMessage: action.payload,
            }
        case RESET_USER_MESSAGES:
            return {
                ...state,
                successMessage: '',
                errorMessage: '',
            }
        case SET_USER_LOCALSTORAGE_DATA:
            return {
                ...state,
                localstorageData: action.payload,
            }
        case RESET_USER_LOCALSTORAGE_DATA:
            return {
                ...state,
                loder: false,
                users: [],
                errorMessage: '',
                successMessage: '',
                user: {},
                localstorageData: {
                    _id: '',
                    userId: '',
                    authToken: '',
                    profile: '',
                }
            }
        case RESET_USER_DETAIL:
            return {
                ...state,
                user: {},
                errorMessage: '',
            }
        case SET_USERS:
            return {
                ...state,
                users: action.payload.data,
                errorMessage: action.payload.errorMessage,
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload.data,
                errorMessage: action.payload.errorMessage,
            }
        case SET_USER_ROLES:
            return {
                ...state,
                roles: action.payload,
            }
        case CHANGE_USER_LOAGING_STATUS:
            return {
                ...state,
                loder: action.payload
            }
        default:
            return state;
    }
}
