import { useState, useEffect,useCallback } from "react";
import { useSelector, useDispatch  } from "react-redux";
import {
  addTyreWidth,
  getTyreWidths,
  getTyreWidth,
  editTyreWidth,
  deleteTyreWidth,
  getAllTyreWidths,
} from "../../store/actions/tyrewidth_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllTyreWidths = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.tyrewidth);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);
 
  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteTyreWidth(deleteEntry));
  }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
     
      dispatch(
        getTyreWidths({
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
export const useSingleTyreWidth = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.tyrewidth);
  useEffect(() => {
    dispatch(getTyreWidth(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateTyreWidth = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.tyrewidth);
  const addData = async (data) => {
    await dispatch(addTyreWidth(data));
  };
  return [data, addData];
};
export const useUpdateTyreWidth = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.tyrewidth);
  const updateData = async (id, data) => {
    await dispatch(editTyreWidth(id, data));
  };
  return [updateData];
};

export const useSelectAllTyreWidth = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.tyrewidth);
  useEffect(() => {
    dispatch(getAllTyreWidths({ term, value }));
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