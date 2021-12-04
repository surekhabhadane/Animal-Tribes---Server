import {
    GET_ALL_PRODUCT,
    SELECTED_PRODUCT,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CHANGE_CURRENCY,
    DECREMENT_QTY,
    GET_SINGLE_ITEM,
    GET_LIST,
    GET_CART_LIST
} from '../constant/actionTypes';

import Products from '../data/products';

const INIT_STATE = {
    productItems: Products,
    products: Products,
    symbol: '$',
    cart: [],
    list: [],
    singleItem: [],
    search: [],
    cartList:[],
};

export default (state = INIT_STATE, action) => {

    switch (action.type) {

        case GET_ALL_PRODUCT:
            return { ...state };

        case GET_LIST:
            return { ...state, productItems: Products };

        case SELECTED_PRODUCT:
            const updatedStatus = state.productItems.reduce((cartAcc, item) => {
                if (item.id === action.payload.productId) {
                    cartAcc.push({ ...item, status: action.payload })
                } else {
                    cartAcc.push(item)
                }
                return cartAcc;
            }, [])
            return { ...state, productItems: updatedStatus };

        case GET_SINGLE_ITEM:
            // eslint-disable-next-line
            const selectedItem = state.productItems.filter(item => item.id == action.payload.productId)
            return { ...state, singleItem: selectedItem[0] };

        case ADD_TO_CART:
            const productId = action.payload.product._id
            if (state.cart.findIndex(product => product._id === productId) !== -1) {
                const cart = state.cart.reduce((cartAcc, product) => {
                    if (product._id === productId) {
                        cartAcc.push({ ...product, qty: product.qty + 1, sum: (product.amount) * (product.qty + 1) }) // Increment qty
                    } else {
                        cartAcc.push(product)
                    }
                    return cartAcc
                }, [])

                return { ...state, cart }
            }

            return { ...state, cart: [...state.cart, { ...action.payload.product, qty: 0, sum: (action.payload.product.amount) * action.payload.qty }] }

        case DECREMENT_QTY:
            if (state.cart.findIndex(product => product._id === action.productId) !== -1) {
                const cart = state.cart.reduce((cartAcc, product) => {
                    if (product._id === action.productId && product.qty > 1) {
                        cartAcc.push({ ...product, qty: product.qty - 1, sum: (product.amount) * (product.qty - 1) }) // Decrement qty
                    } else {
                        cartAcc.push(product)
                    }
                    return cartAcc
                }, [])

                return { ...state, cart }
            }

            return { ...state, cart: [...state.cart, { ...action.product, qty: action.qty, sum: action.product.amount * action.qty }] }

        case REMOVE_FROM_CART:
            return {
                cart: state.cart.filter(item => item._id !== action.product_id)
            }

        case CHANGE_CURRENCY:
            return {
                ...state,
                symbol: action.symbol
            };
        case GET_CART_LIST:
            return {
                ...state,
                cartList: action.payload
            };
        default:
            return state;
    }
}
