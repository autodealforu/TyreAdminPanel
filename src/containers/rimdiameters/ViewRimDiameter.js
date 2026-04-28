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
} from "../../shared/enums/rimdiameters_enum";
import SingleView from "../../components/common/SingleView";
import { useSingleRimDiameter } from "../../shared/hooks/UseRimDiameter";
const ViewRimDiameter = ({ match }) => {
  const [data] = useSingleRimDiameter(match.params.id);
  const { rimdiameter_loading, rimdiameter } = data;
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
        {!rimdiameter_loading ? (
          rimdiameter && (
            <SingleView
              data={rimdiameter}
              inputFields={inputFields}
              label={PAGE_SINGLE_TITLE}
              link={LINK_URL}
              id={rimdiameter._id}
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

export default ViewRimDiameter;
