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
} from '../../shared/enums/parts_enum';
import { useSinglePart } from '../../shared/hooks/UsePart';
const ViewPart = ({ match }) => {
  const [data] = useSinglePart(match.params.id);
  const { part_loading, part } = data;
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
        {!part_loading ? (
          part && (
            <SingleView
              data={part}
              inputFields={inputFields}
              label={PAGE_SINGLE_TITLE}
              link={LINK_URL}
              id={part._id}
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

export default ViewPart;
