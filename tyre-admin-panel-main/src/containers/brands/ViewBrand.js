import React, { useEffect } from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import Spinner from '../../components/layout/Spinner';
import {
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
  SIDEBAR_OPTIONS,
} from '../../shared/enums/brands_enum';
import SingleView from '../../components/common/SingleView';
import { useSingleBrand } from '../../shared/hooks/UseBrand';
const ViewBrand = ({ match }) => {
  const [data] = useSingleBrand(match.params.id);
  const { brand_loading, brand } = data;
  return (
    <div className='pace-done'>
      <div>
        <Header />
        <BreadCrumb
          title={PAGE_SINGLE_TITLE}
          mainLinkTitle={PAGE_TITLE}
          mainLinkUrl={LINK_URL}
          activeLink='View'
        />
        {!brand_loading ? (
          brand && (
            <SingleView
              data={brand}
              inputFields={inputFields}
              label={PAGE_SINGLE_TITLE}
              link={LINK_URL}
              id={brand._id}
              SIDEBAR_OPTIONS={SIDEBAR_OPTIONS}
            />
          )
        ) : (
          <div>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBrand;
