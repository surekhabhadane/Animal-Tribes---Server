import React, { Fragment } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';

const ConfirmModal = (props) => {
    const { header, body, cancelButtonHandler, confirmButtonHandler } = props;
    return (
        <Fragment>
            <Modal
                isOpen={true}
                backdrop="static">
                <ModalHeader> {header} </ModalHeader>
                <ModalBody> {body} </ModalBody>
                <ModalFooter>
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => cancelButtonHandler()}>
                        {`Cancel`}
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => confirmButtonHandler()}>
                        {`Yes`}
                    </button>
                </ModalFooter>
            </Modal >
        </Fragment>
    )
}

ConfirmModal.defaultProps = {
    header: '',
    body: '',
}

ConfirmModal.prototype = {
    header: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    cancelButtonHandler: PropTypes.func.isRequired,
    confirmButtonHandler: PropTypes.func.isRequired
}

export default ConfirmModal;