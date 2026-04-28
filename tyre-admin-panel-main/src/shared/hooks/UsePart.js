import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addPart,
  getParts,
  getPart,
  editPart,
  deletePart,
  getAllParts,
} from '../../store/actions/part_action';
import _debounce from 'lodash/debounce';
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllParts = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.part);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deletePart(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(
        getParts({
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

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSinglePart = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.part);
  useEffect(() => {
    dispatch(getPart(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreatePart = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.part);
  const addData = async (data) => {
    await dispatch(addPart(data));
  };
  return [data, addData];
};
export const useUpdatePart = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.part);
  const updateData = async (id, data) => {
    await dispatch(editPart(id, data));
  };
  return [updateData];
};

export const useSelectAllPart = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.part);
  useEffect(() => {
    dispatch(getAllParts({ term, value }));
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

  return [dropdownOptions, loadOptions];
};
