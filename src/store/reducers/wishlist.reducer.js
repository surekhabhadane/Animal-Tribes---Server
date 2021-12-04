import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST,SET_WISH_LIST } from "../constant/actionTypes";


export default function wishlistReducer(state = { list: [] }, action) {
    switch (action.type) {
        case ADD_TO_WISHLIST:
            const productId = action.payload._id;
            if (state.list.findIndex(product => product._id === productId) !== -1) {
                const list = state.list.reduce((cartAcc, product) => {
                    if (product._id === productId) {
                        cartAcc.push({ ...product })
                    } else {
                        cartAcc.push(product)
                    }
                    return cartAcc
                }, [])

                return { ...state, list }
            }

            return { ...state, list: [...state.list, action.payload] }

        case REMOVE_FROM_WISHLIST:
            return {
                list: state.list.filter(item => item.product._id !== action.product_id)
            }

        case SET_WISH_LIST:
            {
                return {
                    ...state,
                    list:action.payload

                }
            }
        default:
    }
    return state;
}
