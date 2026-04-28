import React, { useState } from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/layout/Spinner';
import UnifiedProductForm from '../../components/products/UnifiedProductForm';
import { convertToFormData } from '../../shared/upload';
import {
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from '../../shared/enums/unified_products_enum';
import {
  useEditUnifiedProduct,
  useSingleUnifiedProduct,
  useGetUnifiedDropdownOptions,
  useLoadOptions,
} from '../../shared/hooks/UseUnifiedProduct';
// import { useSelectAllProduct } from "../../shared/hooks/UseProduct";

const EditProduct = ({ match }) => {
  let history = useHistory();
  const [single_data] = useSingleUnifiedProduct(match.params.id);
  const [edit_data, updateData] = useEditUnifiedProduct();
  const {
    get_unified_product_loading,
    unified_product,
    edit_unified_product_loading,
  } = single_data;
  const [featuredImage, setFeaturedImage] = useState(null);
  const [gallery, setGallery] = useState(null);

  const [dropdownOptions] = useGetUnifiedDropdownOptions();
  const loadOptions = useLoadOptions();

  const submitFormClicked = async (values) => {
    await updateData(unified_product._id, values);
    history.push(`/${LINK_URL}/${unified_product._id}/view`);
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
            {!get_unified_product_loading ? (
              unified_product && (
                <div>
                  <div className='card-header'>
                    <div>
                      <h4 className='card-title'>
                        Edit {unified_product.product_category} Product
                      </h4>
                      <p className='card-title-desc'>
                        <Link
                          to={`/${LINK_URL}`}
                          className='btn btn-soft-light'
                        >
                          <i className='fa fa-angle-left'></i> {PAGE_TITLE}
                        </Link>
                        <Link
                          to={`/${LINK_URL}/${unified_product._id}/view`}
                          className='btn btn-soft-light'
                        >
                          <i className='fa fa-eye'></i>
                        </Link>
                      </p>
                    </div>
                  </div>
                  <UnifiedProductForm
                    data={unified_product}
                    edit={true}
                    setFeaturedImage={setFeaturedImage}
                    setGallery={setGallery}
                    submitForm={submitFormClicked}
                    dropdown_options={dropdownOptions}
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

export default EditProduct;
