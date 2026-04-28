import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addSitepage,
  getSitepages,
  getSitepage,
  editSitepage,
  deleteSitepage,
  getAllSitepages,
} from "../../store/actions/sitepage_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllSitepages = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.sitepage);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteSitepage(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getSitepages({}));
    }, 1000),
    []
  );

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleSitepage = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.sitepage);
  useEffect(() => {
    dispatch(getSitepage(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateSitepage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.sitepage);
  const addData = async (data) => {
    await dispatch(addSitepage(data));
  };
  return [data, addData];
};
export const useUpdateSitepage = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.sitepage);
  const updateData = async (id, data) => {
    await dispatch(editSitepage(id, data));
  };
  return [updateData];
};

export const useSelectAllSitepage = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.sitepage);
  useEffect(() => {
    dispatch(getAllSitepages({ term, value }));
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
