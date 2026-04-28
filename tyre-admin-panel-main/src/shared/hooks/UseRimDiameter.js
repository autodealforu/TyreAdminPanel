import { useState, useEffect,useCallback } from "react";
import { useSelector, useDispatch  } from "react-redux";
import {
  addRimDiameter,
  getRimDiameters,
  getRimDiameter,
  editRimDiameter,
  deleteRimDiameter,
  getAllRimDiameters,
} from "../../store/actions/rimdiameter_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllRimDiameters = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.rimdiameter);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);
 
  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteRimDiameter(deleteEntry));
  }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
     
      dispatch(
        getRimDiameters({
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
export const useSingleRimDiameter = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.rimdiameter);
  useEffect(() => {
    dispatch(getRimDiameter(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateRimDiameter = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.rimdiameter);
  const addData = async (data) => {
    await dispatch(addRimDiameter(data));
  };
  return [data, addData];
};
export const useUpdateRimDiameter = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.rimdiameter);
  const updateData = async (id, data) => {
    await dispatch(editRimDiameter(id, data));
  };
  return [updateData];
};

export const useSelectAllRimDiameter = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.rimdiameter);
  useEffect(() => {
    dispatch(getAllRimDiameters({ term, value }));
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