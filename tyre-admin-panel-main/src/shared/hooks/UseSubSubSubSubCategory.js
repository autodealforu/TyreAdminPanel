import { useState, useEffect,useCallback } from "react";
import { useSelector, useDispatch  } from "react-redux";
import {
  addSubSubSubSubCategory,
  getSubSubSubSubCategorys,
  getSubSubSubSubCategory,
  editSubSubSubSubCategory,
  deleteSubSubSubSubCategory,
  getAllSubSubSubSubCategorys,
} from "../../store/actions/subsubsubsubcategory_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllSubSubSubSubCategorys = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.subsubsubsubcategory);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);
 
  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteSubSubSubSubCategory(deleteEntry));
  }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
     
      dispatch(
        getSubSubSubSubCategorys({
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
export const useSingleSubSubSubSubCategory = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.subsubsubsubcategory);
  useEffect(() => {
    dispatch(getSubSubSubSubCategory(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateSubSubSubSubCategory = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.subsubsubsubcategory);
  const addData = async (data) => {
    await dispatch(addSubSubSubSubCategory(data));
  };
  return [data, addData];
};
export const useUpdateSubSubSubSubCategory = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.subsubsubsubcategory);
  const updateData = async (id, data) => {
    await dispatch(editSubSubSubSubCategory(id, data));
  };
  return [updateData];
};

export const useSelectAllSubSubSubSubCategory = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.subsubsubsubcategory);
  useEffect(() => {
    dispatch(getAllSubSubSubSubCategorys({ term, value }));
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

 
  return [dropdownOptions
    // setClientSearchField, setClientSearchValue
  ];
};