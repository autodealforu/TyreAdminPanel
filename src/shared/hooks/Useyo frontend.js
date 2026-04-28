import { useState, useEffect,useCallback } from "react";
import { useSelector, useDispatch  } from "react-redux";
import {
  addyo frontend,
  getyo frontends,
  getyo frontend,
  edityo frontend,
  deleteyo frontend,
  getAllyo frontends,
} from "../../store/actions/yo frontend_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllyo frontends = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.yo frontend);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);
 
  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteyo frontend(deleteEntry));
  }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
     
      dispatch(
        getyo frontends({
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
export const useSingleyo frontend = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.yo frontend);
  useEffect(() => {
    dispatch(getyo frontend(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateyo frontend = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.yo frontend);
  const addData = async (data) => {
    await dispatch(addyo frontend(data));
  };
  return [data, addData];
};
export const useUpdateyo frontend = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.yo frontend);
  const updateData = async (id, data) => {
    await dispatch(edityo frontend(id, data));
  };
  return [updateData];
};

export const useSelectAllyo frontend = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.yo frontend);
  useEffect(() => {
    dispatch(getAllyo frontends({ term, value }));
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