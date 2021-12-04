import { gql } from '@apollo/client';
import {
    PRODUCT_CURRENT_OPERATION,
} from "../constant/actionTypes";

// Query for get all product data
export const GET_PRODUCTS = gql`{
                              products{
                                name
                                image
                                quantity
                                sku
                                qrCode,
                                id
                                categoryInfo {
                                  id
                                  title
                                  parent {
                                    id
                                    title
                                  }
                                }
                              }
                            }`;

  //Query for get categories                            
  export const GET_CATEGORIES = gql`{
                                  categories{
                                  title
                                  id
                                  children {
                                    id
                                    title
                                  }
                                }
                                }`;


//Query for Add new product
export const ADD_PRODUCT =  gql` mutation ($name: String!, $image: String!, $quantity: Int!,$sku:String!,$category:ID!) {
                                addProduct( name: $name, image: $image, quantity:$quantity, sku:$sku, category:$category) {
                                    name
                                }
                            }`;

//Query for delete product based on ID
export const DELETE_PRODUCT =  gql` mutation ($id:String!){
                                    deleteProduct(id:$id) {
                                      message
                                    }
                                  }`;                       

//Query for edit product based on ID                                  
export const EDIT_PRODUCT =    gql` mutation ($id:ID!,$name: String!, $image: String!, $quantity: Int!,$category:ID!) {
                                    updateProduct(id:$id,name: $name, image: $image, quantity:$quantity, category:$category) {
                                        name
                                    }
                                }`; 
                                
export const EDIT_PRODUCT1 =    gql` mutation ($id:ID!,$name: String!,  $quantity: Int!,$category:ID!) {
    updateProduct(id:$id,name: $name,  quantity:$quantity, category:$category) {
        name
    }
}`;
        
//function to define product init operation for add or edit   
export const productOperationInit = (operation) => {
  return async (dispatch, getState) => {
      dispatch({ type: PRODUCT_CURRENT_OPERATION, payload: operation });
  }
}
//functions to manage product operations finish
export const productOperationFinish = () => {
  return async (dispatch, getState) => {
      dispatch({ type: PRODUCT_CURRENT_OPERATION, payload: null });

  }
}













