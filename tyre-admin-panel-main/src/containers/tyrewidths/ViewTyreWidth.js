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
} from "../../shared/enums/tyrewidths_enum";
import SingleView from "../../components/common/SingleView";
import { useSingleTyreWidth } from "../../shared/hooks/UseTyreWidth";
const ViewTyreWidth = ({ match }) => {
  const [data] = useSingleTyreWidth(match.params.id);
  const { tyrewidth_loading, tyrewidth } = data;
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
        {!tyrewidth_loading ? (
          tyrewidth && (
            <SingleView
              data={tyrewidth}
              inputFields={inputFields}
              label={PAGE_SINGLE_TITLE}
              link={LINK_URL}
              id={tyrewidth._id}
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

export default ViewTyreWidth;
