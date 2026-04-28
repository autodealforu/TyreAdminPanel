import React, { useState } from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/layout/Spinner';
import VehicleForm from '../../components/vehicles/VehicleForm';
import {
  initialValues,
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from '../../shared/enums/vehicles_enum';
import {
  useUpdateVehicle,
  useSingleVehicle,
  useGetDropdownOptions,
} from '../../shared/hooks/UseVehicle';
// import { useSelectAllVehicle } from "../../shared/hooks/UseVehicle";

const EditVehicle = ({ match }) => {
  let history = useHistory();
  const [single_data] = useSingleVehicle(match.params.id);
  const [updateData] = useUpdateVehicle();
  const { vehicle_loading, vehicle, edit_vehicle_loading } = single_data;
  const [featuredImage, setFeaturedImage] = useState(null);

  const [dropdownOptions, loadOptions] = useGetDropdownOptions();
  const submitFormClicked = async (values) => {
    await updateData(vehicle._id, values);
    history.push(`/${LINK_URL}/${vehicle._id}/view`);
  };

  return (
    <div className='pace-done'>
      <div>
        <Header />
        <BreadCrumb
          title={`Edit ${PAGE_SINGLE_TITLE}`}
          mainLinkTitle={PAGE_TITLE}
          mainLinkUrl={LINK_URL}
          activeLink='Edit'
        />
      </div>
      <div className='container-fluid'>
        <div className='col-lg-12'>
          <div className='card'>
            {!vehicle_loading ? (
              vehicle && (
                <div>
                  <div className='card-header'>
                    <div>
                      <h4 className='card-title'>
                        {vehicle[Object.keys(inputFields)[0]]} -{' '}
                        <span>Edit</span>{' '}
                      </h4>
                      <p className='card-title-desc'>
                        <Link
                          to={`/${LINK_URL}`}
                          className='btn btn-soft-light'
                        >
                          <i className='fa fa-angle-left'></i> {PAGE_TITLE}
                        </Link>
                        <Link
                          to={`/${LINK_URL}/${vehicle._id}/view`}
                          className='btn btn-soft-light'
                        >
                          <i className='fa fa-eye'></i>
                        </Link>
                      </p>
                    </div>
                  </div>
                  <VehicleForm
                    data={vehicle}
                    edit={true}
                    featuredImage={featuredImage}
                    setFeaturedImage={setFeaturedImage}
                    submitForm={submitFormClicked}
                    inputFields={inputFields}
                    initialValues={initialValues}
                    dropdown_options={dropdownOptions}
                    loading={edit_vehicle_loading}
                    loadOptions={loadOptions}
                  />
                </div>
              )
            ) : (
              <div className='text-center'>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVehicle;
