import React, { useState, useRef, useEffect, Fragment } from "react";
import { AgGridReact } from "ag-grid-react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Plus, Edit, Trash, Eye } from "react-feather";

import EditModal from "./editProductModal";
import ConfirmModal from "./confirmModal";
import { ProductDetailPage } from '../';
import FormModal from './formModal';
import { useQuery, useMutation } from '@apollo/client';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

import {GET_PRODUCTS,EDIT_PRODUCT1,GET_CATEGORIES,ADD_PRODUCT,DELETE_PRODUCT,EDIT_PRODUCT,productOperationInit,productOperationFinish} from '../../services/product.service';


function Product(props) {
  const [toggle,setToggle] = useState(false)
  const [deleteId,setDeleteId]=useState()
  const [rowData,setData]=useState()
  const [categories, setCategories] = useState()
  const [productForEdit, setEditCellDetail] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [viewProductDetail, setViewProductDetail] = useState();
  const [singleProduct, setSingleProduct] = useState()
  const gridApi = useRef(null);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.Product);

  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const categoriesData = useQuery(GET_CATEGORIES);
  const [addProduct, { productDetail }] = useMutation(ADD_PRODUCT);
  const [deleteProduct, { id }] = useMutation(DELETE_PRODUCT);
  const [editProduct, { editProductDetails }] = useMutation(EDIT_PRODUCT);
  const [editProduct1, { editProductDetails1 }] = useMutation(EDIT_PRODUCT1);

  useEffect(() => {
    !loading && setData(data.products)
    !categoriesData.loading && setCategories(categoriesData.data.categories)
  }, [data,categoriesData.data]);


  const columnDefs = [
    {
      headerName: "Image",
      field: "img",
      cellRendererFramework: (params) => {
        return (
          <img src={"http://"+params.data.image} alt="..." className="qrCode pt-2 pb-2" />
        );
      }
    },
    {
      headerName: "QRCode",
      field: "qrCode",
      cellRendererFramework: (params) => {
        return (
          <img src={"http://"+params.data.qrCode}  alt="..." className="qrCode pt-2 pb-2" />
        );
      }
    },
    { headerName: "Name", field: "name" },
    { headerName: "Quantity", field: "quantity" },
    { headerName: "SKU", field: "sku" },
    {
      headerName: "Category", field: "category",
      valueGetter: (params) => {
        return params.data.categoryInfo && params.data.categoryInfo.parent === null ? params.data.categoryInfo.title : params.data.categoryInfo.parent.title ;
      }
    },
    {
      headerName: "SubCategory", field: "subCategory",
      valueGetter: (params) => {
        return params.data.categoryInfo && params.data.categoryInfo.parent !== null ? params.data.categoryInfo.title : 'N/A' ;
      }
    },
    {
      headerName: "View", maxWidth: 70, sortable: false, filter: false,
      cellRendererFramework: (params) => {
        return (
          <button
            className="btn btn-link btn-xs mt-2"
            onClick={() => _handleViewProduct(params.data)}
          >
            <Eye className="text-primary" size="20" />
          </button>
        );
      }
    },
    {
      headerName: "Edit", maxWidth: 70, sortable: false, filter: false,
      cellRendererFramework: (params) => {
        return (
          <button
            className="btn btn-link btn-xs mt-2"
            onClick={() => _onEditCellClicked(params.data)}>
            <Edit size="20" />
          </button>
        );
      }
    },
    {
      headerName: "Delete", maxWidth: 70, sortable: false, filter: false,
      cellRendererFramework: (params) => {
        return (
          <button
            className="btn btn-link btn-xs mt-2"
            onClick={() => _handleDelete(params.data)}>
            <Trash className="text-danger" size="20" />
          </button>
        );
      }
    }
  ];

  const _handleDelete = (data) => {
    setDeleteConfirmation(true)
    setDeleteId(data.id);
  }
  
  let _onEditCellClicked = (param) => {
    setEditCellDetail(param);
    dispatch(productOperationInit("EDIT"));
  };

  let _handleDeleteProduct = () => {
    deleteProduct({ variables : {id: deleteId} })
    setDeleteConfirmation(false)
    window.location.reload();
  };


  const defaultColDef = {
    sortable: true,
    filter: true,
    autoHeight: true,
    resizable: true,
    flex: 1
  };

  const _addProductHandler = () => {
    dispatch(productOperationInit("ADD"));
    setEditCellDetail(null);
  };

  const _handleViewProduct = (data) => {
    setViewProductDetail(true);
    setSingleProduct(data);
  }

  const _onGridReady = params => {
    gridApi.current = params.api;
    
}
  return (
    <Fragment>
      <div className="container-fluid">
        {/* <Sidebar MENUITEMS={MENUITEMS} /> */}
        <div className="mb-3 d-flex justify-content-end">
          <button
            onClick={() => _addProductHandler()}
            className="btn btn-primary"
          >
            <div className="d-flex align-items-center">
              <Plus size="20" className="mr-2" />
              {` Add Product`}
            </div>
          </button>
        </div>
        <div className="ag-theme-balham ag-grid-container">
          <AgGridReact
            pagination={true}
            columnDefs={columnDefs}
            rowData={rowData || []}
            defaultColDef={defaultColDef}
            onGridReady={_onGridReady} 
            gridApiRef={(params) => gridApi.current = params.api}
            getRowHeight={function (params) { return 100 }}
            paginationAutoPageSize={true}
          />
        </div>
        {(product.productCurrentOperation === "ADD" ||
          product.productCurrentOperation === "EDIT") && (
            <EditModal
              productForEdit={productForEdit}
              categories = {categories}
              currentOperation={product.productCurrentOperation}
              operationSaveInProgress={product.productOperationInProgress}
              addNewProduct={(productDetails) =>{
                  addProduct({ variables : productDetails  })
                  dispatch(productOperationFinish())
                  window.location.reload();
                }
              }
                editProduct={(productDetails) =>{
                  productDetails.image ? editProduct({ variables : productDetails  }) :
                  editProduct1({ variables : productDetails  })
                   dispatch(productOperationFinish())
                  window.location.reload();
              }
            }
              onCancel={() => {
                dispatch(productOperationFinish());
               
              }}
            />
          )}
        {deleteConfirmation && (
          <ConfirmModal
            header={`Delete Product`}
            body={`Do you want to delete this Product?`}
            cancelButtonHandler={() => setDeleteConfirmation(false)}
            confirmButtonHandler={() => _handleDeleteProduct()}
          />
        )}

        {viewProductDetail &&
          <FormModal
            header={'Product Details'}
            body={<ProductDetailPage singleItem={singleProduct} />}
            onClose={() => setViewProductDetail(false)}
          />
        }
      </div>
    </Fragment>
  );
}

const mapStateToProps = ({ Product }) => {
  return {
    product: Product, 
  };
};

export default connect(
    mapStateToProps, { 
  })(Product);
