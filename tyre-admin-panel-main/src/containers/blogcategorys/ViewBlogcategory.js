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
} from "../../shared/enums/blogcategorys_enum";
import SingleView from "../../components/common/SingleView";
import { useSingleBlogcategory } from "../../shared/hooks/UseBlogcategory";
const ViewBlogcategory = ({ match }) => {
  const [data] = useSingleBlogcategory(match.params.id);
  const { blogcategory_loading, blogcategory } = data;
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
        {!blogcategory_loading ? (
          blogcategory && (
            <SingleView
              data={blogcategory}
              inputFields={inputFields}
              label={PAGE_SINGLE_TITLE}
              link={LINK_URL}
              id={blogcategory._id}
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

export default ViewBlogcategory;
