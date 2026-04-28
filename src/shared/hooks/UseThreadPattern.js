import { useState, useEffect,useCallback } from "react";
import { useSelector, useDispatch  } from "react-redux";
import {
  addThreadPattern,
  getThreadPatterns,
  getThreadPattern,
  editThreadPattern,
  deleteThreadPattern,
  getAllThreadPatterns,
} from "../../store/actions/threadpattern_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllThreadPatterns = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.threadpattern);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);
 
  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteThreadPattern(deleteEntry));
  }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
     
      dispatch(
        getThreadPatterns({
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
export const useSingleThreadPattern = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.threadpattern);
  useEffect(() => {
    dispatch(getThreadPattern(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateThreadPattern = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.threadpattern);
  const addData = async (data) => {
    await dispatch(addThreadPattern(data));
  };
  return [data, addData];
};
export const useUpdateThreadPattern = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.threadpattern);
  const updateData = async (id, data) => {
    await dispatch(editThreadPattern(id, data));
  };
  return [updateData];
};

export const useSelectAllThreadPattern = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.threadpattern);
  useEffect(() => {
    dispatch(getAllThreadPatterns({ term, value }));
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