import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import AddForm from '../components/common/AddForm';
import {
    inputFields as inputFields_callback,
    initialValues as initialValues_callback,
    view_all_table as view_all_table_leadcallback,
    LINK_URL as Leadcallback_URL,
    PAGE_SINGLE_TITLE as PAGE_SINGLE_TITLE_LEADCALLBACK
} from "../../src/shared/enums/leadcallbacks_enum"
import { useHistory } from "react-router-dom";
import { useSelectAllLeadcallback, useCreateLeadcallback } from "../shared/hooks/UseLeadcallback"
import { useLeadcallbacksByLead } from "../shared/hooks/UseLead"



const ModalCallback = ({ match }) => {
    let history = useHistory();

    const [leadcallbacksByLead, reloadLeadCallbacks] = useLeadcallbacksByLead(match.params.id);

    const [addData_callback] = useCreateLeadcallback();

    const submitFormClicked_callback = async (values) => {
        values.lead = match.params.id;
        await addData_callback(values);
        // history.push(`/${LINK_URL}`);
        reloadLeadCallbacks(Math.random(100))
        closeModa_2();
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            width: "80%",
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: "none",
            zIndex: 999
        },
    };

    let subtitle;
    const [dropdownOptions, setDropdownOptions] = useState({});
    const [modalIsOpen_2, setmodalIsOpen_2] = useState(false);

    //Callback Modal
    function openModal_2() {
        setmodalIsOpen_2(true);
    }

    function afterOpenModal_2() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModa_2() {
        setmodalIsOpen_2(false);
    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen_2}
                onAfterOpen={afterOpenModal_2}
                onRequestClose={closeModa_2}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
                <div className="container-fluid">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">  Add Callback </h4>
                                <button onClick={closeModa_2} className="btn btn-sm btn-secondary align-self-right"> X </button>
                                <p className="card-title-desc">
                                    Enter Details to add Callback
                                </p>
                            </div>
                            <AddForm
                                edit={false}
                                submitForm={submitFormClicked_callback}
                                inputFields={inputFields_callback}
                                initialValues={initialValues_callback}
                                dropdown_options={dropdownOptions}
                                is_modal={true}
                                hideBackBtn={true}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ModalCallback;