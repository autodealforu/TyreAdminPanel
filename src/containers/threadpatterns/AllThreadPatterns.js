import React from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import Pagination from "../../components/common/Pagination";
import AddBtn from "../../components/common/AddBtn";
import {
  view_all_table,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
  SIDEBAR_OPTIONS,
  inputFields,
} from "../../shared/enums/threadpatterns_enum";
import DataTable from "../../components/common/DataTable";
import { useAllThreadPatterns,useGetDropdownOptions } from "../../shared/hooks/UseThreadPattern";
import SidebarFilter from "../../components/common/SidebarFilter";
const AllThreadPatterns = ({}) => {
  const [
    data, setPageNumber, deleteBtnClicked
  ] = useAllThreadPatterns();
  const { threadpatterns_loading, threadpatterns, total_threadpatterns, page, pages } = data;
  const [dropdownOptions, loadOptions
  ] =
  useGetDropdownOptions();
  
  return (
    <div className="pace-done">
      <div>
        <Header />
        <BreadCrumb
          title={PAGE_TITLE}
          mainLinkTitle="Dashboard"
          mainLinkUrl="/dashboard"
          activeLink={PAGE_TITLE}
        />

        <div className="container-fluid">
          <div className="row">
            {SIDEBAR_OPTIONS && (
              <SidebarFilter
              SIDEBAR_OPTIONS={SIDEBAR_OPTIONS}
              dropdown_options={dropdownOptions}
              loadOptions={loadOptions}
              />
            )}
            <div className="col-lg-9">
              <div
                className="card"
                style={{ boxShadow: "rgb(227 233 243) 0px 4px 22px" }}
              >
                <div className="card-body">
                  <AddBtn item={LINK_URL} title={PAGE_SINGLE_TITLE} />
                  {total_threadpatterns} records found
                  <div>
                    <DataTable
                      keys={view_all_table}
                      data={threadpatterns}
                      field={LINK_URL}
                      page={page}
                      deleteBtnClicked={deleteBtnClicked}
                      loading={threadpatterns_loading}
                      inputFields={inputFields}
                      PAGE_TITLE={PAGE_TITLE}
                      PAGE_SINGLE_TITLE={PAGE_SINGLE_TITLE}
                    />

                    <Pagination
                      data={threadpatterns}
                      page={page}
                      pages={pages}
                      count={total_threadpatterns}
                      setPage={setPageNumber}
                      loading={threadpatterns_loading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllThreadPatterns;
