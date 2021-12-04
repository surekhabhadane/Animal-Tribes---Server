import React, { Fragment } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const ReactSelect = (props) => {
    const {
        label, touched, error, value, options, components,isDisabled, placeholder, isMulti, handleChange
    } = props;

    return (
        <Fragment>
            <div className="form-group">
                <small> {label ? label : placeholder} </small>
                <Select
                    isOptionDisabled={(option) => option.isdisabled}
                    isDisabled={isDisabled ? true : false}
                    className="react-select__control"
                    classNamePrefix="react-select"
                    value={value}
                    options={options}
                    components={components}
                    placeholder={placeholder}
                    isMulti={isMulti ? true : false}
                    onChange={(e) => handleChange(e)} />
                <small id="userHelp" className="form-text text-danger">
                    {(touched && error) ? error : ``}
                </small>
            </div>
        </Fragment>
    );
}

ReactSelect.defaultProps = {
    touched: false,
    label: '',
    error: '',
    value: '',
    placeholder: '',
}

ReactSelect.prototype = {
    touched: PropTypes.bool.isRequired,
    label: PropTypes.string,
    error: PropTypes.string,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
}

export default ReactSelect;