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
} from "../../shared/enums/threadpatterns_enum";
import SingleView from "../../components/common/SingleView";
import { useSingleThreadPattern } from "../../shared/hooks/UseThreadPattern";
const ViewThreadPattern = ({ match }) => {
  const [data] = useSingleThreadPattern(match.params.id);
  const { threadpattern_loading, threadpattern } = data;
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
        {!threadpattern_loading ? (
          threadpattern && (
            <SingleView
              data={threadpattern}
              inputFields={inputFields}
              label={PAGE_SINGLE_TITLE}
              link={LINK_URL}
              id={threadpattern._id}
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

export default ViewThreadPattern;
