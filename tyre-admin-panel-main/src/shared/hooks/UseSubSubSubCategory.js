import { useState, useEffect,useCallback } from "react";
import { useSelector, useDispatch  } from "react-redux";
import {
  addSubSubSubCategory,
  getSubSubSubCategorys,
  getSubSubSubCategory,
  editSubSubSubCategory,
  deleteSubSubSubCategory,
  getAllSubSubSubCategorys,
} from "../../store/actions/subsubsubcategory_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllSubSubSubCategorys = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.subsubsubcategory);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);
 
  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteSubSubSubCategory(deleteEntry));
  }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
     
      dispatch(
        getSubSubSubCategorys({
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
export const useSingleSubSubSubCategory = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.subsubsubcategory);
  useEffect(() => {
    dispatch(getSubSubSubCategory(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateSubSubSubCategory = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.subsubsubcategory);
  const addData = async (data) => {
    await dispatch(addSubSubSubCategory(data));
  };
  return [data, addData];
};
export const useUpdateSubSubSubCategory = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.subsubsubcategory);
  const updateData = async (id, data) => {
    await dispatch(editSubSubSubCategory(id, data));
  };
  return [updateData];
};

export const useSelectAllSubSubSubCategory = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.subsubsubcategory);
  useEffect(() => {
    dispatch(getAllSubSubSubCategorys({ term, value }));
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