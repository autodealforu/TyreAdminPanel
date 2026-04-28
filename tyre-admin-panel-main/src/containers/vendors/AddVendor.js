import React, { useState, useEffect } from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import { useHistory } from 'react-router-dom';
import VendorForm from '../../components/vendors/VendorForm';
import { convertToFormData } from '../../shared/upload';
import {
  initialValues,
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from '../../shared/enums/vendors_enum';
import {
  useCreateVendor,
  useGetDropdownOptions,
} from '../../shared/hooks/UseVendor';
// import { useSelectAllVendor } from "../../shared/hooks/UseVendor";

const AddVendor = ({}) => {
  let history = useHistory();
  const [vendor, addData] = useCreateVendor();
  const { add_vendor_loading } = vendor;
  const [featuredImage, setFeaturedImage] = useState(null);
  const [gallery, setGallery] = useState(null);

  const submitFormClicked = async (values) => {
    console.log('Form Values before conversion:', values);
    values.store_active =
      values?.store_active === 'true' || values?.store_active === true;
    await addData(values);
    history.push(`/${LINK_URL}`);
  };

  const [dropdownOptions, loadOptions] = useGetDropdownOptions();

  return (
    <div className='pace-done'>
      <div>
        <Header />
        <BreadCrumb
          title={`Add ${PAGE_SINGLE_TITLE}`}
          mainLinkTitle={PAGE_TITLE}
          mainLinkUrl={LINK_URL}
          activeLink='Add'
        />
      </div>
      <div className='container-fluid'>
        <div className='col-lg-9'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'> {PAGE_SINGLE_TITLE} </h4>
              <p className='card-title-desc'>
                Enter Details to add {PAGE_SINGLE_TITLE}
              </p>
            </div>
            <VendorForm
              edit={false}
              featuredImage={featuredImage}
              gallery={gallery}
              setFeaturedImage={setFeaturedImage}
              setGallery={setGallery}
              submitForm={submitFormClicked}
              inputFields={inputFields}
              initialValues={initialValues}
              dropdown_options={dropdownOptions}
              loading={add_vendor_loading}
              loadOptions={loadOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVendor;
