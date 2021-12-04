import React, { Fragment, useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ClipLoader } from 'react-spinners';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import _ from 'lodash';
import { InputText, ReactSelect } from '../'
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";


const EditProductModal = (props) => {
    const {
        currentOperation, values, setValues, touched, errors, handleBlur,
        handleSubmit, onCancel, setFieldValue,categories,
        operationSaveInProgress, productForEdit
    } = props;

    const [loading, setLoading] = useState(false)
    const [imageUrl,setImageUrl]= useState('');
    const [subCategory, setSubCategories] = useState([])
   
    useEffect(() => {
        if (productForEdit) {
            console.log("pro",productForEdit)
            values.id = productForEdit.id ? productForEdit.id : '';
            values.name = productForEdit.name ? productForEdit.name : '';
            values.sku = productForEdit.sku ? productForEdit.sku : '';
            values.quantity = productForEdit.quantity ? productForEdit.quantity : '';
            values.image = productForEdit.image ? productForEdit.image : '';
            let categories = productForEdit.categoryInfo.parent === null ? productForEdit.categoryInfo : productForEdit.categoryInfo.parent;
             let subCategory = productForEdit.categoryInfo.parent === null ? {id:null,title:"select SubCategory"} : productForEdit.categoryInfo 
             values.category =  _.mapKeys(categories, function (value, key) {
                        return typeKeyMap[key];
                    });
           
            values.subCategory = _.mapKeys(subCategory, function (value, key) {
                return typeKeyMap[key];
            });
            console.log("sub",subCategory)
            setImageUrl("http://" + productForEdit.image)
            setValues(values);
        }
    }, []);

    const typeKeyMap = {
        id: 'value',
        title: 'label',
    }

    const _handleCategories = (e) => {
        setFieldValue('subCategory',null)
        setFieldValue('category',e)
        _renderSubCategories(e.value);
    }
    const _renderSubCategories = (id) => {
        categories.forEach((category)=>{
            if(category.id === id){
                setSubCategories(category.children)
            }
        })
    }
    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );


    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }

      function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      }

    const handleChange = info => {
        setFieldValue("imageEdit",true)
        if (info.file.status === 'uploading') {
          setLoading(true)
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
           {
            setImageUrl(imageUrl)
            setFieldValue("image",imageUrl)
            setLoading(false)
           }
          );
        }
      };

    return (
        <Fragment>
            <Modal
                isOpen={true}
                className='modal-body'
                backdrop="static">
                <ModalHeader>
                    {_.upperFirst(`${_.lowerCase(currentOperation)} Product`)}
                </ModalHeader>
                <ModalBody>
                    <InputText
                        id={`title`}
                        type={`text`}
                        value={values.name}
                        label={'Name'}
                        placeholder={`Enter a product name`}
                        touched={touched.name}
                        error={errors.name}
                        handleBlur={handleBlur}
                        handleChange={(event) => {
                            values.name = event.target.value;
                            setValues(values);
                        }} />
                    <InputText
                        id={`Stock`}
                        type={`number`}
                        value={values.quantity}
                        placeholder={`Quantity`}
                        touched={touched.quantity}
                        error={errors.quantity}
                        handleBlur={handleBlur}
                        handleChange={(event) => {
                            values.quantity = event.target.value;
                            setValues(values);
                        }} />
                        
                    <InputText
                        id={`sku`}
                        type={`text`}
                        value={values.sku}
                        label={`Sku`}
                        placeholder={`Stock keeping unit`}
                        touched={touched.sku}
                        error={errors.sku}
                        handleBlur={handleBlur}
                        handleChange={(event) => {
                            values.sku = event.target.value;
                            setValues(values);
                        }} />

                    <ReactSelect
                        value={values.category}
                        options={categories.map(function (obj) {
                            return _.mapKeys(obj, function (value, key) {
                                return typeKeyMap[key];
                            });
                        })}
                        handleChange={(e) => _handleCategories(e)}
                        placeholder="Category"
                        touched={touched.category}
                        error={errors.category}
                        handleBlur={handleBlur}
                    />


                    <ReactSelect
                        options={subCategory.map(function (obj) {
                            return _.mapKeys(obj, function (value, key) {
                                return typeKeyMap[key];
                            });
                        })}
                        value={values.subCategory}
                        handleChange={(e) => setFieldValue('subCategory', e)}
                        placeholder="SubCategory"
                        touched={touched.subCategory}
                        error={errors.subCategory}
                        handleBlur={handleBlur}
                    />

                    <div className="form-group">
                        <small> {'Product Images'} </small>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                            >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => onCancel()}>
                        {`Cancel`}
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        disabled={operationSaveInProgress}
                        onClick={handleSubmit}>
                        <div className="d-flex align-items-center">
                            {(operationSaveInProgress) && <ClipLoader size={20} />}
                            {currentOperation === 'EDIT' ? 'Update' : 'Save'}
                        </div>
                    </button>
                </ModalFooter>
            </Modal >
        </Fragment>
    )
}

const formikEnhancer = withFormik({
    validationSchema: props => Yup.object().shape({
        quantity: Yup.string()
            .trim()
            .required('quantity is required.'),
        sku: Yup.string()
            .trim()
            .required('stock is required.'),
        name: Yup.string()
            .trim()
            .required('name is required.'),
        image: Yup.string()
            .trim(),
        category: Yup.string()
            .trim()
            .required('category is required.'),
        subCategory: Yup.string()
            .trim()
    }),
    mapPropsToValues: ({ match }) => {
        return ({
            name: '',
            quantity: '',
            sku: '',
            thumbnail: '',
            category: {value:null,label:"select Category"},
            subCategory: {value:null,label:"select SubCategory"},
            photos: ''
        })
    },
    handleSubmit: (payload, { props }) => {
        let newProductInfo = {
            id:payload.id ? payload.id : null,
            name: payload.name ? payload.name : null,
            quantity: payload.quantity ? payload.quantity : 0,
            sku: payload.sku ? payload.sku : null,
            image: payload.image ? payload.image : '',
            category: payload.subCategory ? payload.subCategory.value : payload.category.value,
        }
        switch (props.currentOperation) {
            case "ADD":
                delete newProductInfo.id
                props.addNewProduct(newProductInfo)
                break;
            case "EDIT":
                console.log("editDetails",newProductInfo)
                !payload.imageEdit && delete newProductInfo.image 
                delete newProductInfo.sku
                props.editProduct(newProductInfo)
                break;
            default:
                break;
        }
    },
});

EditProductModal.defaultProps = {
    isResetForm: false,
    operationSaveInProgress: false,
    currentOperation: '',
    operationErrorMessage: '',
}

EditProductModal.prototype = {
    operationSaveInProgress: PropTypes.bool.isRequired,
    currentOperation: PropTypes.string.isRequired,
    operationErrorMessage: PropTypes.string.isRequired,
    productForEdit: PropTypes.object.isRequired,
    values: PropTypes.object,
    touched: PropTypes.object,
    errors: PropTypes.object,
    setValues: PropTypes.func,
    handleBlur: PropTypes.func,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    setFieldValue: PropTypes.func,
    onCancel: PropTypes.func.isRequired,
}

export default formikEnhancer(EditProductModal);