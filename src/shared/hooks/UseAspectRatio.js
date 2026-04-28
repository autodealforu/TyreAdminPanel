import { useState, useEffect,useCallback } from "react";
import { useSelector, useDispatch  } from "react-redux";
import {
  addAspectRatio,
  getAspectRatios,
  getAspectRatio,
  editAspectRatio,
  deleteAspectRatio,
  getAllAspectRatios,
} from "../../store/actions/aspectratio_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllAspectRatios = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.aspectratio);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);
 
  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteAspectRatio(deleteEntry));
  }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
     
      dispatch(
        getAspectRatios({
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
export const useSingleAspectRatio = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.aspectratio);
  useEffect(() => {
    dispatch(getAspectRatio(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateAspectRatio = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.aspectratio);
  const addData = async (data) => {
    await dispatch(addAspectRatio(data));
  };
  return [data, addData];
};
export const useUpdateAspectRatio = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.aspectratio);
  const updateData = async (id, data) => {
    await dispatch(editAspectRatio(id, data));
  };
  return [updateData];
};

export const useSelectAllAspectRatio = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.aspectratio);
  useEffect(() => {
    dispatch(getAllAspectRatios({ term, value }));
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