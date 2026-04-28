import React, { useState, useEffect } from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import { useHistory } from "react-router-dom";
import SitepageForm from "../../components/sitepages/SitepageForm";
import { convertToFormData } from "../../shared/upload";
import {
  initialValues,
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from "../../shared/enums/sitepages_enum";
import {
  useCreateSitepage,
  useGetDropdownOptions,
} from "../../shared/hooks/UseSitepage";
// import { useSelectAllSitepage } from "../../shared/hooks/UseSitepage";

const AddSitepage = ({}) => {
  let history = useHistory();
  const [sitepage, addData] = useCreateSitepage();
  const { add_sitepage_loading } = sitepage;
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
            <SitepageForm
              edit={false}
              featuredImage={featuredImage}
              gallery={gallery}
              setFeaturedImage={setFeaturedImage}
              setGallery={setGallery}
              submitForm={submitFormClicked}
              inputFields={inputFields}
              initialValues={initialValues}
              dropdown_options={dropdownOptions}
              loading={add_sitepage_loading}
              loadOptions={loadOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSitepage;
