import React from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import {
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from '../../shared/enums/alloyfinishes_enum';
import { useSingleAlloyFinish } from '../../shared/hooks/UseAlloyFinish';

const ViewAlloyFinish = ({ match }) => {
  const [state] = useSingleAlloyFinish(match.params.id);
  const { alloyfinish } = state;

  return (
    <div className='pace-done'>
      <div>
        <Header />
        <BreadCrumb
          title={`View ${PAGE_SINGLE_TITLE}`}
          mainLinkTitle={PAGE_TITLE}
          mainLinkUrl={`/${LINK_URL}`}
          activeLink='View'
        />
      </div>
      <div className='container-fluid'>
        <div className='col-lg-9'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'> {PAGE_SINGLE_TITLE} </h4>
              <p className='card-title-desc'>Details</p>
            </div>
            <div className='card-body'>
              <pre>{JSON.stringify(alloyfinish, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAlloyFinish;
