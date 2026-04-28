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
} from "../../shared/enums/speedsymbols_enum";
import SingleView from "../../components/common/SingleView";
import { useSingleSpeedSymbol } from "../../shared/hooks/UseSpeedSymbol";
const ViewSpeedSymbol = ({ match }) => {
  const [data] = useSingleSpeedSymbol(match.params.id);
  const { speedsymbol_loading, speedsymbol } = data;
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
        {!speedsymbol_loading ? (
          speedsymbol && (
            <SingleView
              data={speedsymbol}
              inputFields={inputFields}
              label={PAGE_SINGLE_TITLE}
              link={LINK_URL}
              id={speedsymbol._id}
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

export default ViewSpeedSymbol;
