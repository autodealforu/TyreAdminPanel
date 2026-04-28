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
} from '../../shared/enums/vehicles_enum';
import { useSingleVehicle } from '../../shared/hooks/UseVehicle';
const ViewVehicle = ({ match }) => {
  const [data] = useSingleVehicle(match.params.id);
  const { vehicle_loading, vehicle } = data;
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
        {!vehicle_loading ? (
          vehicle && (
            <SingleView
              data={vehicle}
              inputFields={inputFields}
              label={PAGE_SINGLE_TITLE}
              link={LINK_URL}
              id={vehicle._id}
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

export default ViewVehicle;
