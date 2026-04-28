import React, { useState } from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Spinner from "../../components/layout/Spinner";
import SizeForm from "../../components/sizes/SizeForm";
import {
  initialValues,
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL
} from "../../shared/enums/sizes_enum";
import { useUpdateSize, useSingleSize,useGetDropdownOptions } from "../../shared/hooks/UseSize";
// import { useSelectAllSize } from "../../shared/hooks/UseSize";

const EditSize = ({ match }) => {
  let history = useHistory();
  const [single_data] = useSingleSize(match.params.id);
  const [updateData] = useUpdateSize();
  const { size_loading, size, edit_size_loading } = single_data;
  const [featuredImage, setFeaturedImage] = useState(null);
  
  

  const [dropdownOptions,loadOptions] = useGetDropdownOptions();
  const submitFormClicked = async values => {
    await updateData(size._id, values);
    history.push(`/${LINK_URL}/${size._id}/view`);
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
            {!size_loading ? (
              size && (
                <div>
                  <div className="card-header">
                    <div>
                      <h4 className="card-title">
                        {size[Object.keys(inputFields)[0]]} -{" "}
                        <span>Edit</span>{" "}
                      </h4>
                      <p className="card-title-desc">
                        <Link
                          to={`/${LINK_URL}`}
                          className="btn btn-soft-light"
                        >
                          <i className="fa fa-angle-left"></i> {PAGE_TITLE}
                        </Link>
                        <Link
                          to={`/${LINK_URL}/${size._id}/view`}
                          className="btn btn-soft-light"
                        >
                          <i className="fa fa-eye"></i>
                        </Link>
                      </p>
                    </div>
                  </div>
                  <SizeForm
                    data={size}
                    edit={true}
                    featuredImage={featuredImage}
                    setFeaturedImage={setFeaturedImage}
                    submitForm={submitFormClicked}
                    inputFields={inputFields}
                    initialValues={initialValues}
                    dropdown_options={dropdownOptions}
                    loading={edit_size_loading}
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

export default EditSize;
