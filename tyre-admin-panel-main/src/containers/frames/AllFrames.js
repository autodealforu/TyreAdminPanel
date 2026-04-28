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
} from "../../shared/enums/frames_enum";
import DataTable from "../../components/common/DataTable";
import { useAllFrames, useGetDropdownOptions } from "../../shared/hooks/UseFrame";
import SidebarFilter from "../../components/common/SidebarFilter";
const AllFrames = ({ }) => {
    const [data, setPageNumber, deleteBtnClicked] = useAllFrames();
    const { frames_loading, frames, total_frames, page, pages } = data;
    const [dropdownOptions, loadOptions] = useGetDropdownOptions();

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
                        <div className="col-lg-10">
                            <div
                                className="card"
                                style={{ boxShadow: "rgb(227 233 243) 0px 4px 22px" }}
                            >
                                <div className="card-body">
                                    <AddBtn item={LINK_URL} title={PAGE_SINGLE_TITLE} />
                                    {total_frames} records found
                                    <div>
                                        <DataTable
                                            keys={view_all_table}
                                            data={frames}
                                            field={LINK_URL}
                                            page={page}
                                            deleteBtnClicked={deleteBtnClicked}
                                            loading={frames_loading}
                                            inputFields={inputFields}
                                            PAGE_TITLE={PAGE_TITLE}
                                            PAGE_SINGLE_TITLE={PAGE_SINGLE_TITLE}
                                        />

                                        <Pagination
                                            data={frames}
                                            page={page}
                                            pages={pages}
                                            count={total_frames}
                                            setPage={setPageNumber}
                                            loading={frames_loading}
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

export default AllFrames;
