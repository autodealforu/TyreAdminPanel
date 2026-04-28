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
} from "../../shared/enums/subsubsubsubcategorys_enum";
import SingleView from "../../components/common/SingleView";
import { useSingleSubSubSubSubCategory } from "../../shared/hooks/UseSubSubSubSubCategory";
const ViewSubSubSubSubCategory = ({ match }) => {
  const [data] = useSingleSubSubSubSubCategory(match.params.id);
  const { subsubsubsubcategory_loading, subsubsubsubcategory } = data;
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
        {!subsubsubsubcategory_loading ? (
          subsubsubsubcategory && (
            <SingleView
              data={subsubsubsubcategory}
              inputFields={inputFields}
              label={PAGE_SINGLE_TITLE}
              link={LINK_URL}
              id={subsubsubsubcategory._id}
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

export default ViewSubSubSubSubCategory;
