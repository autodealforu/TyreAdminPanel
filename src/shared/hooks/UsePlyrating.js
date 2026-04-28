import { useState, useEffect,useCallback } from "react";
import { useSelector, useDispatch  } from "react-redux";
import {
  addPlyrating,
  getPlyratings,
  getPlyrating,
  editPlyrating,
  deletePlyrating,
  getAllPlyratings,
} from "../../store/actions/plyrating_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllPlyratings = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.plyrating);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);
 
  useEffect(() => {
    if (deleteEntry) {
      dispatch(deletePlyrating(deleteEntry));
  }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
     
      dispatch(
        getPlyratings({
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
export const useSinglePlyrating = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.plyrating);
  useEffect(() => {
    dispatch(getPlyrating(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreatePlyrating = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.plyrating);
  const addData = async (data) => {
    await dispatch(addPlyrating(data));
  };
  return [data, addData];
};
export const useUpdatePlyrating = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.plyrating);
  const updateData = async (id, data) => {
    await dispatch(editPlyrating(id, data));
  };
  return [updateData];
};

export const useSelectAllPlyrating = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.plyrating);
  useEffect(() => {
    dispatch(getAllPlyratings({ term, value }));
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