import React from 'react';
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
} from '../../shared/enums/alloywidths_enum';
import DataTable from '../../components/common/DataTable';
import SidebarFilter from '../../components/common/SidebarFilter';
import {
  useAllAlloyWidths,
  useGetDropdownOptions,
} from '../../shared/hooks/UseAlloyWidth';

const AllAlloyWidths = () => {
  const [data, setPageNumber, deleteBtnClicked] = useAllAlloyWidths();
  const { alloywidths_loading, alloywidths, total_alloywidths, page, pages } =
    data;
  const [dropdownOptions, loadOptions] = useGetDropdownOptions();

  return (
    <div className='pace-done'>
      <div>
        <Header />
        <BreadCrumb
          title={PAGE_TITLE}
          mainLinkTitle='Dashboard'
          mainLinkUrl='/dashboard'
          activeLink={PAGE_TITLE}
        />
      </div>
      <div className='container-fluid'>
        <div className='row'>
          {SIDEBAR_OPTIONS && (
            <SidebarFilter
              SIDEBAR_OPTIONS={SIDEBAR_OPTIONS}
              dropdown_options={dropdownOptions}
              loadOptions={loadOptions}
            />
          )}
          <div className='col-lg-9'>
            <div
              className='card'
              style={{ boxShadow: 'rgb(227 233 243) 0px 4px 22px' }}
            >
              <div className='card-body'>
                <AddBtn item={LINK_URL} title={PAGE_SINGLE_TITLE} />
                {total_alloywidths} records found
                <div>
                  <DataTable
                    keys={view_all_table}
                    data={alloywidths}
                    field={LINK_URL}
                    page={page}
                    deleteBtnClicked={deleteBtnClicked}
                    loading={alloywidths_loading}
                    inputFields={inputFields}
                    PAGE_TITLE={PAGE_TITLE}
                    PAGE_SINGLE_TITLE={PAGE_SINGLE_TITLE}
                  />
                  <Pagination
                    data={alloywidths}
                    page={page}
                    pages={pages}
                    count={total_alloywidths}
                    setPage={setPageNumber}
                    loading={alloywidths_loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAlloyWidths;
