import React, { useState } from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/layout/Spinner';
import AlloyWheelForm from '../../components/alloywheels/AlloyWheelForm';
import { convertToFormData } from '../../shared/upload';
import {
  initialValues,
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from '../../shared/enums/alloywheels_enum';
import {
  useUpdateAlloyWheel,
  useSingleAlloyWheel,
  useGetDropdownOptions,
} from '../../shared/hooks/UseAlloyWheel';
// import { useSelectAllAlloyWheel } from "../../shared/hooks/UseAlloyWheel";

const EditAlloyWheel = ({ match }) => {
  let history = useHistory();
  const [single_data] = useSingleAlloyWheel(match.params.id);
  const [updateData] = useUpdateAlloyWheel();
  const { alloywheel_loading, alloywheel, edit_alloywheel_loading } =
    single_data;
  const [featuredImage, setFeaturedImage] = useState(null);

  const [dropdownOptions, loadOptions] = useGetDropdownOptions();
  const submitFormClicked = async (values) => {
    await updateData(alloywheel._id, values);
    history.push(`/${LINK_URL}/${alloywheel._id}/view`);
  };
  console.log('alloywheel', alloywheel);

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
            {!alloywheel_loading ? (
              alloywheel && (
                <div>
                  <div className='card-header'>
                    <div>
                      <h4 className='card-title'>
                        <span>Edit Alloy Wheel</span>{' '}
                      </h4>
                      <p className='card-title-desc'>
                        <Link
                          to={`/${LINK_URL}`}
                          className='btn btn-soft-light'
                        >
                          <i className='fa fa-angle-left'></i> {PAGE_TITLE}
                        </Link>
                        <Link
                          to={`/${LINK_URL}/${alloywheel._id}/view`}
                          className='btn btn-soft-light'
                        >
                          <i className='fa fa-eye'></i>
                        </Link>
                      </p>
                    </div>
                  </div>
                  {dropdownOptions && (
                    <AlloyWheelForm
                      data={alloywheel}
                      edit={true}
                      featuredImage={featuredImage}
                      setFeaturedImage={setFeaturedImage}
                      submitForm={submitFormClicked}
                      inputFields={inputFields}
                      initialValues={initialValues}
                      dropdown_options={dropdownOptions}
                      loading={edit_alloywheel_loading}
                      loadOptions={loadOptions}
                    />
                  )}
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

export default EditAlloyWheel;
