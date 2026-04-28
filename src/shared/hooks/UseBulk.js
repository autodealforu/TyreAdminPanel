import { useState, useEffect,useCallback } from "react";
import { useSelector, useDispatch  } from "react-redux";
import {
  addBulk,
  getBulks,
  getBulk,
  editBulk,
  deleteBulk,
  getAllBulks,
} from "../../store/actions/bulk_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllBulks = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.bulk);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);
 
  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteBulk(deleteEntry));
  }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
     
      dispatch(
        getBulks({
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
export const useSingleBulk = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.bulk);
  useEffect(() => {
    dispatch(getBulk(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateBulk = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.bulk);
  const addData = async (data) => {
    await dispatch(addBulk(data));
  };
  return [data, addData];
};
export const useUpdateBulk = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.bulk);
  const updateData = async (id, data) => {
    await dispatch(editBulk(id, data));
  };
  return [updateData];
};

export const useSelectAllBulk = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.bulk);
  useEffect(() => {
    dispatch(getAllBulks({ term, value }));
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