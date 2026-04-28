import React, { useEffect } from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import Pagination from '../../components/common/Pagination';
import AddBtn from '../../components/common/AddBtn';
import {
  view_all_table,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
  SIDEBAR_OPTIONS,
  inputFields,
} from '../../shared/enums/vendors_enum';
import DataTable from '../../components/common/DataTable';
import {
  useAllVendors,
  useGetDropdownOptions,
  useSelectAllVendor,
} from '../../shared/hooks/UseVendor';
import SidebarFilter from '../../components/common/SidebarFilter';
import ExportComponent from '../../components/common/ExportComponent';
import FilterDateComponent from '../../components/common/FilterDateComponent';
import {
  UseDataForExcel,
  UseFilter,
  UseVendorDataExport,
} from '../../shared/hooks/UseExcel';
const AllVendors = ({}) => {
  const [data, setPageNumber, deleteBtnClicked] = useAllVendors();
  const [vendorData] = useSelectAllVendor();
  const { vendors_loading, vendors, total_vendors, page, pages, all_vendors } =
    data;
  const [dropdownOptions, loadOptions] = useGetDropdownOptions();

  const [exportXLSXData] = UseFilter();

  const [convertToReadable, exportData] = UseVendorDataExport();

  useEffect(() => {
    if (all_vendors) {
      convertToReadable(all_vendors, inputFields);
    }
  }, [all_vendors]);

  const handleOnExport = () => {
    exportXLSXData(exportData, 'Vendors', 'vendors');
  };

  return (
    <div className='pace-done'>
      <div>
        <Header />
        <BreadCrumb
          title={PAGE_TITLE}
          mainLinkTitle='Dashboard'
          mainLinkUrl=''
          activeLink={PAGE_TITLE}
        />
        <ExportComponent handleOnExport={handleOnExport} />
        <FilterDateComponent link='/vendors' />

        <div className='container-fluid'>
          <div className='row'>
            {SIDEBAR_OPTIONS && (
              <SidebarFilter
                SIDEBAR_OPTIONS={SIDEBAR_OPTIONS}
                dropdown_options={dropdownOptions}
                loadOptions={loadOptions}
              />
            )}
            <div className='col-lg-10'>
              <div
                className='card'
                style={{ boxShadow: 'rgb(227 233 243) 0px 4px 22px' }}
              >
                <div className='card-body'>
                  <AddBtn item={LINK_URL} title={PAGE_SINGLE_TITLE} />
                  {total_vendors} records found
                  <div>
                    <DataTable
                      keys={view_all_table}
                      data={vendors}
                      field={LINK_URL}
                      page={page}
                      deleteBtnClicked={deleteBtnClicked}
                      loading={vendors_loading}
                      inputFields={inputFields}
                      PAGE_TITLE={PAGE_TITLE}
                      PAGE_SINGLE_TITLE={PAGE_SINGLE_TITLE}
                    />

                    <Pagination
                      data={vendors}
                      page={page}
                      pages={pages}
                      count={total_vendors}
                      setPage={setPageNumber}
                      loading={vendors_loading}
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

export default AllVendors;
