import React, { useState } from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import Pagination from "../../components/common/Pagination";
import AddBtn from "../../components/common/AddBtn";

import DataTable from "../../components/common/DataTable";
import {
    useAllVariations,
    useGetDropdownOptions,
    useUpdateVariation,
} from "../../shared/hooks/UseVariation";
import SidebarFilter from "../../components/common/SidebarFilter";


const AllVariations = ({ }) => {
    const [data, setPageNumber, deleteBtnClicked] = useAllVariations();
    const { variations_loading, variations, total_variations, page, pages } = data;

    console.log("Total Variations -", total_variations);
    const [dropdownOptions, loadOptions] = useGetDropdownOptions();

    const [modal, setModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    return (
        <div className="pace-done">
            <div>
                <Header />
                <BreadCrumb
                    title={`Variations`}
                    mainLinkTitle={"Variations"}
                    mainLinkUrl={"/dashboard"}
                    activeLink="Home"
                />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10">
                            <div
                                className="card"
                                style={{ boxShadow: "rgb(227 233 243) 0px 4px 22px" }}
                            >
                                <div className="card-body">
                                    <AddBtn item="variations" title={`Variations`} />
                                    {total_variations} records found
                                    <div>
                                        <table className="table table-new align-middle table-striped  table-bordered">
                                            <thead>
                                                <tr className="bg-transparent">
                                                    <th style={{ width: "50px" }}>#</th>
                                                    <th> Name </th>
                                                    <th> Value </th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    !variations_loading ? (
                                                        variations && variations.map((item, index) => {
                                                            // var variableValues = item.variation_values
                                                            return (
                                                                <tr>
                                                                    <td>
                                                                        {index + 1}
                                                                    </td>
                                                                    <td>
                                                                        {item.variation_name}
                                                                    </td>


                                                                    <td>
                                                                        {item.variation_name}

                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            className="btn btn-soft-light"
                                                                            onClick={() => {
                                                                                setModal(true);
                                                                                setModalData(item);
                                                                            }}
                                                                        >
                                                                            {" "}
                                                                            <i className="fa fa-binoculars"></i>{" "}
                                                                        </button>

                                                                        <button
                                                                            class="btn text-danger"
                                                                            onClick={() =>
                                                                                deleteBtnClicked(item._id)
                                                                            }
                                                                        >
                                                                            <i class="fa fa-trash"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    ) : (
                                                        null
                                                    )
                                                }



                                            </tbody>
                                        </table>
                                    </div>
                                    <div>
                                        {/* <DataTable
                            keys={view_all_table}
                            data={variations}
                            field={LINK_URL}
                            page={page}
                            deleteBtnClicked={deleteBtnClicked}
                            loading={variations_loading}
                            inputFields={inputFields}
                            PAGE_TITLE={PAGE_TITLE}
                            PAGE_SINGLE_TITLE={PAGE_SINGLE_TITLE}
                          /> */}

                                        <Pagination
                                            data={variations}
                                            page={page}
                                            pages={pages}
                                            count={total_variations}
                                            setPage={setPageNumber}
                                            loading={variations_loading}
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

export default AllVariations;
