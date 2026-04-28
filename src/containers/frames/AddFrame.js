import React, { useState, useEffect } from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import { useHistory } from "react-router-dom";
import FrameForm from "../../components/frames/FrameForm";
import { convertToFormData } from "../../shared/upload";
import {
    initialValues,
    inputFields,
    PAGE_TITLE,
    PAGE_SINGLE_TITLE,
    LINK_URL,
} from "../../shared/enums/frames_enum";
import {
    useCreateFrame,
    useGetDropdownOptions,
} from "../../shared/hooks/UseFrame";
// import { useSelectAllFrame } from "../../shared/hooks/UseFrame";

const AddFrame = ({ }) => {
    let history = useHistory();
    const [frame, addData] = useCreateFrame();
    const { add_frame_loading } = frame;
    const [featuredImage, setFeaturedImage] = useState(null);
    const [gallery, setGallery] = useState(null);

    const submitFormClicked = async (values) => {
        await addData(values);
        history.push(`/${LINK_URL}`);
    };

    const [dropdownOptions, loadOptions] = useGetDropdownOptions();

    return (
        <div className="pace-done">
            <div>
                <Header />
                <BreadCrumb
                    title={`Add ${PAGE_SINGLE_TITLE}`}
                    mainLinkTitle={PAGE_TITLE}
                    mainLinkUrl={LINK_URL}
                    activeLink="Add"
                />
            </div>
            <div className="container-fluid">
                <div className="col-lg-9">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title"> {PAGE_SINGLE_TITLE} </h4>
                            <p className="card-title-desc">
                                Enter Details to add {PAGE_SINGLE_TITLE}
                            </p>
                        </div>
                        <FrameForm
                            edit={false}
                            featuredImage={featuredImage}
                            gallery={gallery}
                            setFeaturedImage={setFeaturedImage}
                            setGallery={setGallery}
                            submitForm={submitFormClicked}
                            inputFields={inputFields}
                            initialValues={initialValues}
                            dropdown_options={dropdownOptions}
                            loading={add_frame_loading}
                            loadOptions={loadOptions}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddFrame;
