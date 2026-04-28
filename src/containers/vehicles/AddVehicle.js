import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import VehicleForm from '../../components/vehicles/VehicleForm';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';

import {
  initialValues,
  inputFields,
  LINK_URL,
  PAGE_SINGLE_TITLE,
  PAGE_TITLE,
} from '../../shared/enums/vehicles_enum';
import {
  useCreateVehicle,
  useGetDropdownOptions,
} from '../../shared/hooks/UseVehicle';
// import { useSelectAllVehicle } from "../../shared/hooks/UseVehicle";

const AddVehicle = ({}) => {
  let history = useHistory();
  const [vehicle, addData] = useCreateVehicle();
  const { add_vehicle_loading } = vehicle;
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
            <VehicleForm
              edit={false}
              featuredImage={featuredImage}
              gallery={gallery}
              setFeaturedImage={setFeaturedImage}
              setGallery={setGallery}
              submitForm={submitFormClicked}
              inputFields={inputFields}
              initialValues={initialValues}
              dropdown_options={dropdownOptions}
              loading={add_vehicle_loading}
              loadOptions={loadOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;
