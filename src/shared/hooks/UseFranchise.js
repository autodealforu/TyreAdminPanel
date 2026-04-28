import { useState, useEffect,useCallback } from "react";
import { useSelector, useDispatch  } from "react-redux";
import {
  addFranchise,
  getFranchises,
  getFranchise,
  editFranchise,
  deleteFranchise,
  getAllFranchises,
} from "../../store/actions/franchise_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllFranchises = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.franchise);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);
 
  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteFranchise(deleteEntry));
  }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
     
      dispatch(
        getFranchises({
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
export const useSingleFranchise = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.franchise);
  useEffect(() => {
    dispatch(getFranchise(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateFranchise = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.franchise);
  const addData = async (data) => {
    await dispatch(addFranchise(data));
  };
  return [data, addData];
};
export const useUpdateFranchise = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.franchise);
  const updateData = async (id, data) => {
    await dispatch(editFranchise(id, data));
  };
  return [updateData];
};

export const useSelectAllFranchise = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.franchise);
  useEffect(() => {
    dispatch(getAllFranchises({ term, value }));
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