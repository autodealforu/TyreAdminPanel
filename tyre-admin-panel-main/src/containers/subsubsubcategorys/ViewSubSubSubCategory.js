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
} from "../../shared/enums/subsubsubcategorys_enum";
import SingleView from "../../components/common/SingleView";
import { useSingleSubSubSubCategory } from "../../shared/hooks/UseSubSubSubCategory";
const ViewSubSubSubCategory = ({ match }) => {
  const [data] = useSingleSubSubSubCategory(match.params.id);
  const { subsubsubcategory_loading, subsubsubcategory } = data;
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
        {!subsubsubcategory_loading ? (
          subsubsubcategory && (
            <SingleView
              data={subsubsubcategory}
              inputFields={inputFields}
              label={PAGE_SINGLE_TITLE}
              link={LINK_URL}
              id={subsubsubcategory._id}
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

export default ViewSubSubSubCategory;
