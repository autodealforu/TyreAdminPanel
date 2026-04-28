import React, { useState } from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import { useHistory } from 'react-router-dom';
import ServiceForm from '../../components/services/ServiceForm';
import Spinner from '../../components/layout/Spinner';

import {
  initialValues,
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from '../../shared/enums/services_enum';
import {
  useSingleService,
  useUpdateService,
  useGetDropdownOptions,
} from '../../shared/hooks/UseService';

const EditService = ({ match }) => {
  let history = useHistory();
  const [data] = useSingleService(match.params.id);
  const { service_loading, service } = data;
  const [updateData] = useUpdateService();

  const [featuredImage, setFeaturedImage] = useState(null);
  const [gallery, setGallery] = useState(null);

  const submitFormClicked = async (values) => {
    await updateData(match.params.id, values);
    history.push(`/${LINK_URL}`);
  };

  const [dropdownOptions, loadOptions] = useGetDropdownOptions();

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
        <div className='col-lg-9'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'> Edit {PAGE_SINGLE_TITLE} </h4>
              <p className='card-title-desc'>
                Update Details of {PAGE_SINGLE_TITLE}
              </p>
            </div>
            {!service_loading ? (
              service && (
                <ServiceForm
                  edit={true}
                  data={service}
                  initialValues={initialValues}
                  featuredImage={featuredImage}
                  gallery={gallery}
                  setFeaturedImage={setFeaturedImage}
                  setGallery={setGallery}
                  submitForm={submitFormClicked}
                  inputFields={inputFields}
                  dropdown_options={dropdownOptions}
                  loadOptions={loadOptions}
                />
              )
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditService;
