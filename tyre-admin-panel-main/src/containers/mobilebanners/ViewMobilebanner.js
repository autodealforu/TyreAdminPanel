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
} from "../../shared/enums/mobilebanners_enum";
import SingleView from "../../components/common/SingleView";
import { useSingleMobilebanner } from "../../shared/hooks/UseMobilebanner";
const ViewMobilebanner = ({ match }) => {
  const [data] = useSingleMobilebanner(match.params.id);
  const { mobilebanner_loading, mobilebanner } = data;
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
        {!mobilebanner_loading ? (
          mobilebanner && (
            <SingleView
              data={mobilebanner}
              inputFields={inputFields}
              label={PAGE_SINGLE_TITLE}
              link={LINK_URL}
              id={mobilebanner._id}
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

export default ViewMobilebanner;
