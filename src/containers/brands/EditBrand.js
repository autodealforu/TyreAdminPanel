import React, { useState } from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/layout/Spinner';
import BrandForm from '../../components/brands/BrandForm';
import {
  initialValues,
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from '../../shared/enums/brands_enum';
import {
  useUpdateBrand,
  useSingleBrand,
  useGetDropdownOptions,
} from '../../shared/hooks/UseBrand';
// import { useSelectAllBrand } from "../../shared/hooks/UseBrand";

const EditBrand = ({ match }) => {
  let history = useHistory();
  const [single_data] = useSingleBrand(match.params.id);
  const [updateData] = useUpdateBrand();
  const { brand_loading, brand, edit_brand_loading } = single_data;
  const [featuredImage, setFeaturedImage] = useState(null);

  const [dropdownOptions, loadOptions] = useGetDropdownOptions();
  const submitFormClicked = async (values) => {
    await updateData(brand._id, values);
    history.push(`/${LINK_URL}/${brand._id}/view`);
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
            {!brand_loading ? (
              brand && (
                <div>
                  <div className='card-header'>
                    <div>
                      <h4 className='card-title'>
                        {brand[Object.keys(inputFields)[0]]} - <span>Edit</span>{' '}
                      </h4>
                      <p className='card-title-desc'>
                        <Link
                          to={`/${LINK_URL}`}
                          className='btn btn-soft-light'
                        >
                          <i className='fa fa-angle-left'></i> {PAGE_TITLE}
                        </Link>
                        <Link
                          to={`/${LINK_URL}/${brand._id}/view`}
                          className='btn btn-soft-light'
                        >
                          <i className='fa fa-eye'></i>
                        </Link>
                      </p>
                    </div>
                  </div>
                  <BrandForm
                    data={brand}
                    edit={true}
                    featuredImage={featuredImage}
                    setFeaturedImage={setFeaturedImage}
                    submitForm={submitFormClicked}
                    inputFields={inputFields}
                    initialValues={initialValues}
                    dropdown_options={dropdownOptions}
                    loading={edit_brand_loading}
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

export default EditBrand;
