import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const InputText = (props) => {
    const {
        label, id, type, touched, error, isDisabled, value, placeholder,onClick, handleBlur, handleChange, handleKeyDown
    } = props;

    return (
        <Fragment>
            <div className="form-group">
                <small> {label ? label : placeholder} </small>
                <input
                    id={id}
                    className={`form-control`}
                    type={type}
                    autoComplete="no"
                    value={value}
                    placeholder={placeholder}
                    disabled={isDisabled ? true : false}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    onChange={handleChange} 
                    onClick={onClick}/>
                <small id="textHelp" className="form-text text-danger">
                    {(touched && error) ? error : ``}
                </small>
            </div>
        </Fragment>
    )
}

InputText.defaultProps = {
    touched: false,
    isDisabled: false,
    label: '',
    id: '',
    type: 'text',
    error: '',
    value: '',
    placeholder: '',
}

InputText.prototype = {
    touched: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool,
    label: PropTypes.string,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    error: PropTypes.string,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    rightContent: PropTypes.any
}

export default InputText;