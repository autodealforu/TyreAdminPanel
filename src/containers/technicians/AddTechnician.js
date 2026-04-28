import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TechnicianForm from '../../components/technicians/TechnicianForm';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';

import {
  initialValues,
  inputFields,
  LINK_URL,
  PAGE_SINGLE_TITLE,
  PAGE_TITLE,
} from '../../shared/enums/technicians_enum';
import {
  useCreateTechnician,
  useGetDropdownOptions,
} from '../../shared/hooks/UseTechnician';
// import { useSelectAllTechnician } from "../../shared/hooks/UseTechnician";

const AddTechnician = ({}) => {
  let history = useHistory();
  const [technician, addData] = useCreateTechnician();
  const { add_technician_loading } = technician;
  const [featuredImage, setFeaturedImage] = useState(null);
  const [gallery, setGallery] = useState(null);

  const submitFormClicked = async (values) => {
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
            <TechnicianForm
              edit={false}
              featuredImage={featuredImage}
              gallery={gallery}
              setFeaturedImage={setFeaturedImage}
              setGallery={setGallery}
              submitForm={submitFormClicked}
              inputFields={inputFields}
              initialValues={initialValues}
              dropdown_options={dropdownOptions}
              loading={add_technician_loading}
              loadOptions={loadOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTechnician;
