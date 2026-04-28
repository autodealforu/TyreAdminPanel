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
} from '../../shared/enums/alloybores_enum';
import SingleView from '../../components/common/SingleView';
import { useSingleAlloyBore } from '../../shared/hooks/UseAlloyBore';

const ViewAlloyBore = ({ match }) => {
  const [data] = useSingleAlloyBore(match.params.id);
  const { alloybore_loading, alloybore } = data;
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
        {!alloybore_loading ? (
          alloybore && (
            <SingleView
              data={alloybore}
              inputFields={inputFields}
              label={PAGE_SINGLE_TITLE}
              link={LINK_URL}
              id={alloybore._id}
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

export default ViewAlloyBore;








