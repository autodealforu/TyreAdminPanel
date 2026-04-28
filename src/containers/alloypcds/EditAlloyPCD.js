import React, { useState } from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import { useHistory } from 'react-router-dom';
import RimDiameterForm from '../../components/rimdiameters/RimDiameterForm';
import {
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from '../../shared/enums/alloypcds_enum';
import {
  useSingleAlloyPCD,
  useUpdateAlloyPCD,
  useGetDropdownOptions,
} from '../../shared/hooks/UseAlloyPCD';

const EditAlloyPCD = ({ match }) => {
  let history = useHistory();
  const [state] = useSingleAlloyPCD(match.params.id);
  const { alloypcds_loading, alloypcd } = state;
  const [updateData] = useUpdateAlloyPCD();
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
          mainLinkUrl={`/${LINK_URL}`}
          activeLink='Edit'
        />
      </div>
      <div className='container-fluid'>
        <div className='col-lg-9'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'> {PAGE_SINGLE_TITLE} </h4>
              <p className='card-title-desc'>
                Update Details of {PAGE_SINGLE_TITLE}
              </p>
            </div>
            {!alloypcds_loading && alloypcd && (
              <RimDiameterForm
                edit={true}
                data={alloypcd}
                featuredImage={featuredImage}
                gallery={gallery}
                setFeaturedImage={setFeaturedImage}
                setGallery={setGallery}
                submitForm={submitFormClicked}
                inputFields={inputFields}
                initialValues={{ name: '' }}
                dropdown_options={dropdownOptions}
                loading={false}
                loadOptions={loadOptions}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAlloyPCD;
