import { useState, useEffect,useCallback } from "react";
import { useSelector, useDispatch  } from "react-redux";
import {
  addProductType,
  getProductTypes,
  getProductType,
  editProductType,
  deleteProductType,
  getAllProductTypes,
} from "../../store/actions/producttype_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllProductTypes = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.producttype);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);
 
  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteProductType(deleteEntry));
  }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
     
      dispatch(
        getProductTypes({
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
export const useSingleProductType = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.producttype);
  useEffect(() => {
    dispatch(getProductType(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateProductType = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.producttype);
  const addData = async (data) => {
    await dispatch(addProductType(data));
  };
  return [data, addData];
};
export const useUpdateProductType = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.producttype);
  const updateData = async (id, data) => {
    await dispatch(editProductType(id, data));
  };
  return [updateData];
};

export const useSelectAllProductType = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.producttype);
  useEffect(() => {
    dispatch(getAllProductTypes({ term, value }));
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