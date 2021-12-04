import {
    GET_PRODUCT_LIST,
    ADD_NEW_PRODUCT,
    PRODUCT_CURRENT_OPERATION,
    SET_PRODUCT_OPERATION_MESSAGE,
    PRODUCT_OPERATION_END,
    PRODUCT_OPERATION_START,
    GET_PRODUCT
} from '../constant/actionTypes';

const initial_state = {
    productList: null,
    product : null,
    productCurrentOperation: '',
    productOperationSuccessMessage: '',
    productOperationErrorMessage: '',
    productOperationInProgress: ''
};

export default (state = initial_state, action) => {
    switch (action.type) {

        case GET_PRODUCT_LIST:
            return {
                ...state,
                productList: action.payload.data,
            }
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload,
            }
        case ADD_NEW_PRODUCT:
            return {
                ...state,
            }
        case PRODUCT_CURRENT_OPERATION:
            return {
                ...state,
                productCurrentOperation: action.payload
            }
        case SET_PRODUCT_OPERATION_MESSAGE:
            return {
                ...state,
                productOperationSuccessMessage: action.payload.successMessage,
                productOperationErrorMessage: action.payload.errorMessage
            }
        case PRODUCT_OPERATION_START:
            return {
                ...state,
                productOperationInProgress: true
            }
        case PRODUCT_OPERATION_END:
            return {
                ...state,
                productOperationInProgress: false
            }
        default: return { ...state };
    }
}
