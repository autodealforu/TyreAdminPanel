import React, { useState } from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Spinner from "../../components/layout/Spinner";
import ReviewForm from "../../components/reviews/ReviewForm";
import { convertToFormData } from "../../shared/upload";
import {
  initialValues,
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from "../../shared/enums/reviews_enum";
import {
  useUpdateReview,
  useSingleReview,
  useGetDropdownOptions,
} from "../../shared/hooks/UseReview";
// import { useSelectAllReview } from "../../shared/hooks/UseReview";

const EditReview = ({ match }) => {
  let history = useHistory();
  const [single_data] = useSingleReview(match.params.id);
  const [updateData] = useUpdateReview();
  const { review_loading, review, edit_review_loading } = single_data;
  const [featuredImage, setFeaturedImage] = useState(null);

  const [dropdownOptions, loadOptions] = useGetDropdownOptions();
  const submitFormClicked = async (values) => {
    // const data = await convertToFormData({ values, featuredImage });
    await updateData(review._id, values);
    history.push(`/${LINK_URL}/${review._id}/view`);
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
            {!review_loading ? (
              review && (
                <div>
                  <div className="card-header">
                    <div>
                      <h4 className="card-title">
                        {review[Object.keys(inputFields)[0]]} -{" "}
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
                          to={`/${LINK_URL}/${review._id}/view`}
                          className="btn btn-soft-light"
                        >
                          <i className="fa fa-eye"></i>
                        </Link>
                      </p>
                    </div>
                  </div>
                  <ReviewForm
                    data={review}
                    edit={true}
                    featuredImage={featuredImage}
                    setFeaturedImage={setFeaturedImage}
                    submitForm={submitFormClicked}
                    inputFields={inputFields}
                    initialValues={initialValues}
                    dropdown_options={dropdownOptions}
                    loading={edit_review_loading}
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

export default EditReview;
