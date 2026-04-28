import { useState, useEffect,useCallback } from "react";
import { useSelector, useDispatch  } from "react-redux";
import {
  addSpeedSymbol,
  getSpeedSymbols,
  getSpeedSymbol,
  editSpeedSymbol,
  deleteSpeedSymbol,
  getAllSpeedSymbols,
} from "../../store/actions/speedsymbol_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllSpeedSymbols = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.speedsymbol);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);
 
  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteSpeedSymbol(deleteEntry));
  }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
     
      dispatch(
        getSpeedSymbols({
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
export const useSingleSpeedSymbol = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.speedsymbol);
  useEffect(() => {
    dispatch(getSpeedSymbol(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateSpeedSymbol = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.speedsymbol);
  const addData = async (data) => {
    await dispatch(addSpeedSymbol(data));
  };
  return [data, addData];
};
export const useUpdateSpeedSymbol = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.speedsymbol);
  const updateData = async (id, data) => {
    await dispatch(editSpeedSymbol(id, data));
  };
  return [updateData];
};

export const useSelectAllSpeedSymbol = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.speedsymbol);
  useEffect(() => {
    dispatch(getAllSpeedSymbols({ term, value }));
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