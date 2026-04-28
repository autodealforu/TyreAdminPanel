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
} from "../../shared/enums/contacts_enum";
import DataTable from "../../components/common/DataTable";
import {
  useAllContacts,
  useGetDropdownOptions,
  useSelectAllContact,
} from "../../shared/hooks/UseContact";
import SidebarFilter from "../../components/common/SidebarFilter";
import FilterDateComponent from "../../components/common/FilterDateComponent";
import { UseDataForExcel, UseFilter } from "../../shared/hooks/UseExcel";
import ExportComponent from "../../components/common/ExportComponent";
import { useEffect } from "react";
const AllContacts = ({}) => {
  const [data, setPageNumber, deleteBtnClicked] = useAllContacts();
  const { contacts_loading, contacts, total_contacts, page, pages } = data;
  const [dropdownOptions, loadOptions] = useGetDropdownOptions();
  const [exportXLSXData] = UseFilter();

  const [convertToReadable, exportData] = UseDataForExcel();

  useEffect(() => {
    if (contacts) {
      convertToReadable(contacts, inputFields);
    }
  }, [contacts]);

  const handleOnExport = () => {
    exportXLSXData(exportData, "Contacts", "contacts");
  };

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
        <ExportComponent handleOnExport={handleOnExport} />
        <FilterDateComponent link="/contacts" />

        <div className="container-fluid">
          <div className="row">
            {SIDEBAR_OPTIONS && (
              <SidebarFilter
                SIDEBAR_OPTIONS={SIDEBAR_OPTIONS}
                dropdown_options={dropdownOptions}
                loadOptions={loadOptions}
              />
            )}
            <div className="col-lg-10">
              <div
                className="card"
                style={{ boxShadow: "rgb(227 233 243) 0px 4px 22px" }}
              >
                <div className="card-body">
                  <AddBtn item={LINK_URL} title={PAGE_SINGLE_TITLE} />
                  {total_contacts} records found
                  <div>
                    <DataTable
                      keys={view_all_table}
                      data={contacts}
                      field={LINK_URL}
                      page={page}
                      deleteBtnClicked={deleteBtnClicked}
                      loading={contacts_loading}
                      inputFields={inputFields}
                      PAGE_TITLE={PAGE_TITLE}
                      PAGE_SINGLE_TITLE={PAGE_SINGLE_TITLE}
                    />

                    <Pagination
                      data={contacts}
                      page={page}
                      pages={pages}
                      count={total_contacts}
                      setPage={setPageNumber}
                      loading={contacts_loading}
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

export default AllContacts;
