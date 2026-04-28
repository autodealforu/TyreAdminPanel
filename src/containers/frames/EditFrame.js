import React, { useState } from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Spinner from "../../components/layout/Spinner";
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
    useUpdateFrame,
    useSingleFrame,
    useGetDropdownOptions,
} from "../../shared/hooks/UseFrame";
// import { useSelectAllFrame } from "../../shared/hooks/UseFrame";

const EditFrame = ({ match }) => {
    let history = useHistory();
    const [single_data] = useSingleFrame(match.params.id);
    const [updateData] = useUpdateFrame();
    const { frame_loading, frame, edit_frame_loading } = single_data;
    const [featuredImage, setFeaturedImage] = useState(null);

    const [dropdownOptions, loadOptions] = useGetDropdownOptions();
    const submitFormClicked = async (values) => {
        await updateData(frame._id, values);
        history.push(`/${LINK_URL}/${frame._id}/view`);
    };

    return (
        <div className="pace-done">
            <div>
                <Header />
                <BreadCrumb
                    title={`Edit ${PAGE_SINGLE_TITLE}`}
                    mainLinkTitle={PAGE_TITLE}
                    mainLinkUrl={LINK_URL}
                    activeLink="Edit"
                />
            </div>
            <div className="container-fluid">
                <div className="col-lg-12">
                    <div className="card">
                        {!frame_loading ? (
                            frame && (
                                <div>
                                    <div className="card-header">
                                        <div>
                                            <h4 className="card-title">
                                                {frame[Object.keys(inputFields)[0]]} - <span>Edit</span>{" "}
                                            </h4>
                                            <p className="card-title-desc">
                                                <Link
                                                    to={`/${LINK_URL}`}
                                                    className="btn btn-soft-light"
                                                >
                                                    <i className="fa fa-angle-left"></i> {PAGE_TITLE}
                                                </Link>
                                                <Link
                                                    to={`/${LINK_URL}/${frame._id}/view`}
                                                    className="btn btn-soft-light"
                                                >
                                                    <i className="fa fa-eye"></i>
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                    <FrameForm
                                        data={frame}
                                        edit={true}
                                        featuredImage={featuredImage}
                                        setFeaturedImage={setFeaturedImage}
                                        submitForm={submitFormClicked}
                                        inputFields={inputFields}
                                        initialValues={initialValues}
                                        dropdown_options={dropdownOptions}
                                        loading={edit_frame_loading}
                                        loadOptions={loadOptions}
                                    />
                                </div>
                            )
                        ) : (
                            <div className="text-center">
                                <Spinner />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditFrame;
