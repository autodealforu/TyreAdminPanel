import React, { useState } from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/layout/Spinner';
import TyreForm from '../../components/tyres/TyreForm';
import {
  initialValues,
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from '../../shared/enums/tyres_enum';
import {
  useUpdateTyre,
  useSingleTyre,
  useGetDropdownOptions,
} from '../../shared/hooks/UseTyre';
// import { useSelectAllTyre } from "../../shared/hooks/UseTyre";

const EditTyre = ({ match }) => {
  let history = useHistory();
  const [single_data] = useSingleTyre(match.params.id);
  const [updateData] = useUpdateTyre();
  const { tyre_loading, tyre, edit_tyre_loading } = single_data;
  const [featuredImage, setFeaturedImage] = useState(null);

  const [dropdownOptions, loadOptions] = useGetDropdownOptions();
  const submitFormClicked = async (values) => {
    await updateData(tyre._id, values);
    history.push(`/${LINK_URL}/${tyre._id}/view`);
  };

  console.log('Tyre', tyre);

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
            {!tyre_loading ? (
              tyre && (
                <div>
                  <div className='card-header'>
                    <div>
                      <h4 className='card-title'>
                        <span>Edit Tyre</span>{' '}
                      </h4>
                      <p className='card-title-desc'>
                        <Link
                          to={`/${LINK_URL}`}
                          className='btn btn-soft-light'
                        >
                          <i className='fa fa-angle-left'></i> {PAGE_TITLE}
                        </Link>
                        <Link
                          to={`/${LINK_URL}/${tyre._id}/view`}
                          className='btn btn-soft-light'
                        >
                          <i className='fa fa-eye'></i>
                        </Link>
                      </p>
                    </div>
                  </div>
                  <TyreForm
                    data={tyre}
                    edit={true}
                    featuredImage={featuredImage}
                    setFeaturedImage={setFeaturedImage}
                    submitForm={submitFormClicked}
                    inputFields={inputFields}
                    initialValues={initialValues}
                    dropdown_options={dropdownOptions}
                    loading={edit_tyre_loading}
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

export default EditTyre;
