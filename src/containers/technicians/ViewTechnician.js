import React from 'react';
import SingleView from '../../components/common/SingleView';
import Spinner from '../../components/layout/Spinner';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import {
  inputFields,
  LINK_URL,
  PAGE_SINGLE_TITLE,
  PAGE_TITLE,
  SIDEBAR_OPTIONS,
} from '../../shared/enums/technicians_enum';
import { useSingleTechnician } from '../../shared/hooks/UseTechnician';
const ViewTechnician = ({ match }) => {
  const [data] = useSingleTechnician(match.params.id);
  const { technician_loading, technician } = data;
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
        {!technician_loading ? (
          technician && (
            <SingleView
              data={technician}
              inputFields={inputFields}
              label={PAGE_SINGLE_TITLE}
              link={LINK_URL}
              id={technician._id}
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

export default ViewTechnician;
