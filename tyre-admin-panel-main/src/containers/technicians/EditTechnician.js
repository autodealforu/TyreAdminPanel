import React, { useState } from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/layout/Spinner';
import TechnicianForm from '../../components/technicians/TechnicianForm';
import {
  initialValues,
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from '../../shared/enums/technicians_enum';
import {
  useUpdateTechnician,
  useSingleTechnician,
  useGetDropdownOptions,
} from '../../shared/hooks/UseTechnician';
// import { useSelectAllTechnician } from "../../shared/hooks/UseTechnician";

const EditTechnician = ({ match }) => {
  let history = useHistory();
  const [single_data] = useSingleTechnician(match.params.id);
  const [updateData] = useUpdateTechnician();
  const { technician_loading, technician, edit_technician_loading } =
    single_data;
  const [featuredImage, setFeaturedImage] = useState(null);

  const [dropdownOptions, loadOptions] = useGetDropdownOptions();
  const submitFormClicked = async (values) => {
    await updateData(technician._id, values);
    history.push(`/${LINK_URL}/${technician._id}/view`);
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
            {!technician_loading ? (
              technician && (
                <div>
                  <div className='card-header'>
                    <div>
                      <h4 className='card-title'>
                        {technician[Object.keys(inputFields)[0]]} -{' '}
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
                          to={`/${LINK_URL}/${technician._id}/view`}
                          className='btn btn-soft-light'
                        >
                          <i className='fa fa-eye'></i>
                        </Link>
                      </p>
                    </div>
                  </div>
                  <TechnicianForm
                    data={technician}
                    edit={true}
                    featuredImage={featuredImage}
                    setFeaturedImage={setFeaturedImage}
                    submitForm={submitFormClicked}
                    inputFields={inputFields}
                    initialValues={initialValues}
                    dropdown_options={dropdownOptions}
                    loading={edit_technician_loading}
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

export default EditTechnician;
