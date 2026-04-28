import React, { useState } from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import { useHistory } from 'react-router-dom';
import AlloyWidthForm from '../../components/alloywidths/AlloyWidthForm';
import {
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from '../../shared/enums/alloywidths_enum';
import {
  useSingleAlloyWidth,
  useUpdateAlloyWidth,
  useGetDropdownOptions,
} from '../../shared/hooks/UseAlloyWidth';

const EditAlloyWidth = ({ match }) => {
  let history = useHistory();
  const [state] = useSingleAlloyWidth(match.params.id);
  const { alloywidths_loading, alloywidth } = state;
  const [updateData] = useUpdateAlloyWidth();
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
            {!alloywidths_loading && alloywidth && (
              <AlloyWidthForm
                edit={true}
                data={alloywidth}
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

export default EditAlloyWidth;
