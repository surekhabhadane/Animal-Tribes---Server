import {
    GET_TAGS_LIST,
    ADD_NEW_TAGS,
    TAGS_CURRENT_OPERATION,
    SET_TAGS_OPERATION_MESSAGE,
    TAGS_OPERATION_END,
    TAGS_OPERATION_START
} from '../constant/actionTypes';

const initial_state = {
    tagsList: null,
    tagsCurrentOperation: '',
    tagsOperationSuccessMessage: '',
    tagsOperationErrorMessage: '',
    tagsOperationInProgress: ''
};

export default (state = initial_state, action) => {
    switch (action.type) {

        case GET_TAGS_LIST:
            return {
                ...state,
                tagsList: action.payload.data,
            }
        case ADD_NEW_TAGS:
            return {
                ...state,
            }
        case TAGS_CURRENT_OPERATION:
            return {
                ...state,
                tagsCurrentOperation: action.payload
            }
        case SET_TAGS_OPERATION_MESSAGE:
            return {
                ...state,
                tagsOperationSuccessMessage: action.payload.successMessage,
                tagsOperationErrorMessage: action.payload.errorMessage
            }
        case TAGS_OPERATION_START:            
            return {
                ...state,
                tagsOperationInProgress: true
            }
        case TAGS_OPERATION_END:
            return {
                ...state,
                tagsOperationInProgress: false
            }
        default: return { ...state };
    }
}
