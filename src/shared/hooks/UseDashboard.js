import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addDashboard,
  getDashboards,
  getDashboard,
  editDashboard,
  deleteDashboard,
  getAllDashboards,
} from "../../store/actions/dashboard_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllDashboards = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dashboard);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    allQuery();
  }, [window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getDashboards());
    }, 1000),
    []
  );

  return [data];
};

// Get Single Data
export const useSingleDashboard = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dashboard);
  useEffect(() => {
    dispatch(getDashboard(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateDashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dashboard);
  const addData = async (data) => {
    await dispatch(addDashboard(data));
  };
  return [data, addData];
};
export const useUpdateDashboard = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.dashboard);
  const updateData = async (id, data) => {
    await dispatch(editDashboard(id, data));
  };
  return [updateData];
};

export const useSelectAllDashboard = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.dashboard);
  useEffect(() => {
    dispatch(getAllDashboards({ term, value }));
  }, [term, value]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  //  const [client, setClientSearchField, setClientSearchValue] =
  // useSelectAllClient();

  const [dropdownOptions, setDropdownOptions] = useState({});
  // useEffect(() => {
  //   if (industry && industry.all_industrys) {
  //     const newData = industry.all_industrys.map((item) => {
  //       return { label: item.name, value: item.name };
  //     });
  //     setDropdownOptions({ ...dropdownOptions, industry: newData });
  //   }
  // }, [industry]);
  const loadOptions = async (inputValue, callback, field) => {
    // if (field == "parent_category") {
    //   await setCategorySearchField("name");
    //   await setCategorySearchValue(inputValue);
    //   callback(dropdownOptions.parent_category);
    // }
  };

  return [dropdownOptions, loadOptions];
};
