import React, { useEffect } from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import Spinner from "../../components/layout/Spinner";
import {
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
  SIDEBAR_OPTIONS,
} from "../../shared/enums/alloywheels_enum";
import SingleView from "../../components/common/SingleView";
import { useSingleAlloyWheel } from "../../shared/hooks/UseAlloyWheel";
const ViewAlloyWheel = ({ match }) => {
  const [data] = useSingleAlloyWheel(match.params.id);
  const { alloywheel_loading, alloywheel } = data;
  return (
    <div className="pace-done">
      <div>
        <Header />
        <BreadCrumb
          title={PAGE_SINGLE_TITLE}
          mainLinkTitle={PAGE_TITLE}
          mainLinkUrl={LINK_URL}
          activeLink="View"
        />
        {!alloywheel_loading ? (
          alloywheel && (
            <SingleView
              data={alloywheel}
              inputFields={inputFields}
              label={PAGE_SINGLE_TITLE}
              link={LINK_URL}
              id={alloywheel._id}
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

export default ViewAlloyWheel;
