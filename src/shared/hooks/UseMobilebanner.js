import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addMobilebanner,
  getMobilebanners,
  getMobilebanner,
  editMobilebanner,
  deleteMobilebanner,
  getAllMobilebanners,
} from '../../store/actions/mobilebanner_action';
import _debounce from 'lodash/debounce';
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllMobilebanners = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.mobilebanner);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteMobilebanner(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getMobilebanners({}));
    }, 1000),
    []
  );

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleMobilebanner = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.mobilebanner);
  useEffect(() => {
    dispatch(getMobilebanner(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateMobilebanner = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.mobilebanner);
  const addData = async (data) => {
    await dispatch(addMobilebanner(data));
  };
  return [data, addData];
};
export const useUpdateMobilebanner = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.mobilebanner);
  const updateData = async (id, data) => {
    await dispatch(editMobilebanner(id, data));
  };
  return [updateData];
};

export const useSelectAllMobilebanner = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.mobilebanner);
  useEffect(() => {
    dispatch(getAllMobilebanners({ term, value }));
  }, [term, value]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  //  const [client, setClientSearchField, setClientSearchValue] =
  // useSelectAllClient();

  const [dropdownOptions, setDropdownOptions] = useState({});

  const loadOptions = async (inputValue, callback, field) => {
    // if (field == "parent_category") {
    //   await setCategorySearchField("name");
    //   await setCategorySearchValue(inputValue);
    //   callback(dropdownOptions.parent_category);
    // }
  };

  return [dropdownOptions, loadOptions];
};
