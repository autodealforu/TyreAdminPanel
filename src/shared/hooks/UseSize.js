import { useState, useEffect,useCallback } from "react";
import { useSelector, useDispatch  } from "react-redux";
import {
  addSize,
  getSizes,
  getSize,
  editSize,
  deleteSize,
  getAllSizes,
} from "../../store/actions/size_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllSizes = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.size);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);
 
  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteSize(deleteEntry));
  }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
     
      dispatch(
        getSizes({
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
export const useSingleSize = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.size);
  useEffect(() => {
    dispatch(getSize(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateSize = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.size);
  const addData = async (data) => {
    await dispatch(addSize(data));
  };
  return [data, addData];
};
export const useUpdateSize = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.size);
  const updateData = async (id, data) => {
    await dispatch(editSize(id, data));
  };
  return [updateData];
};

export const useSelectAllSize = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.size);
  useEffect(() => {
    dispatch(getAllSizes({ term, value }));
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