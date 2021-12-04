import React, { Fragment } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import PropTypes from 'prop-types';

const FormModal = (props) => {
    const { header, body, onClose } = props;
    return (
        <Fragment>
            <Modal
                isOpen={true}
                backdrop="static"
                className="modal-body crud-add-modal-xl">
                <ModalHeader toggle={() => onClose()}>
                    {header}
                </ModalHeader>
                <ModalBody> {body} </ModalBody>
            </Modal >
        </Fragment>
    )
}

FormModal.defaultProps = {
    header: '',
    body: '',
}

FormModal.prototype = {
    header: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
}

export default FormModal;