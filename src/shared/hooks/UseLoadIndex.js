import { useState, useEffect,useCallback } from "react";
import { useSelector, useDispatch  } from "react-redux";
import {
  addLoadIndex,
  getLoadIndexs,
  getLoadIndex,
  editLoadIndex,
  deleteLoadIndex,
  getAllLoadIndexs,
} from "../../store/actions/loadindex_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllLoadIndexs = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.loadindex);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);
 
  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteLoadIndex(deleteEntry));
  }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
     
      dispatch(
        getLoadIndexs({
          pageNumber,
        })
      );
    }, 1000),
    []
  );

  useEffect(() => {
    setPageNumber(1);
  }, [window.location.search]);

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [
    data, setPageNumber, deleteBtnClicked
  ];
};

// Get Single Data
export const useSingleLoadIndex = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.loadindex);
  useEffect(() => {
    dispatch(getLoadIndex(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateLoadIndex = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.loadindex);
  const addData = async (data) => {
    await dispatch(addLoadIndex(data));
  };
  return [data, addData];
};
export const useUpdateLoadIndex = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.loadindex);
  const updateData = async (id, data) => {
    await dispatch(editLoadIndex(id, data));
  };
  return [updateData];
};

export const useSelectAllLoadIndex = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.loadindex);
  useEffect(() => {
    dispatch(getAllLoadIndexs({ term, value }));
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

 
  return [dropdownOptions,loadOptions  ];
};