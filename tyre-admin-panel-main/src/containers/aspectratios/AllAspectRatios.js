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
} from "../../shared/enums/aspectratios_enum";
import DataTable from "../../components/common/DataTable";
import { useAllAspectRatios,useGetDropdownOptions } from "../../shared/hooks/UseAspectRatio";
import SidebarFilter from "../../components/common/SidebarFilter";
const AllAspectRatios = ({}) => {
  const [
    data, setPageNumber, deleteBtnClicked
  ] = useAllAspectRatios();
  const { aspectratios_loading, aspectratios, total_aspectratios, page, pages } = data;
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
                  {total_aspectratios} records found
                  <div>
                    <DataTable
                      keys={view_all_table}
                      data={aspectratios}
                      field={LINK_URL}
                      page={page}
                      deleteBtnClicked={deleteBtnClicked}
                      loading={aspectratios_loading}
                      inputFields={inputFields}
                      PAGE_TITLE={PAGE_TITLE}
                      PAGE_SINGLE_TITLE={PAGE_SINGLE_TITLE}
                    />

                    <Pagination
                      data={aspectratios}
                      page={page}
                      pages={pages}
                      count={total_aspectratios}
                      setPage={setPageNumber}
                      loading={aspectratios_loading}
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

export default AllAspectRatios;
