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
} from "../../shared/enums/subsubcategorys_enum";
import SingleView from "../../components/common/SingleView";
import { useSingleSubSubCategory } from "../../shared/hooks/UseSubSubCategory";
const ViewSubSubCategory = ({ match }) => {
  const [data] = useSingleSubSubCategory(match.params.id);
  const { subsubcategory_loading, subsubcategory } = data;
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
        {!subsubcategory_loading ? (
          subsubcategory && (
            <SingleView
              data={subsubcategory}
              inputFields={inputFields}
              label={PAGE_SINGLE_TITLE}
              link={LINK_URL}
              id={subsubcategory._id}
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

export default ViewSubSubCategory;
