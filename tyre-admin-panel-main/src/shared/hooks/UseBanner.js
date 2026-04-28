import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addBanner,
  getBanners,
  getBanner,
  editBanner,
  deleteBanner,
  getAllBanners,
} from '../../store/actions/banner_action';
import _debounce from 'lodash/debounce';

// Get All Data
export const useAllBanners = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.banner);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteBanner(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getBanners({}));
    }, 1000),
    []
  );

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleBanner = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.banner);
  useEffect(() => {
    dispatch(getBanner(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateBanner = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.banner);
  const addData = async (data) => {
    await dispatch(addBanner(data));
  };
  return [data, addData];
};
export const useUpdateBanner = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.banner);
  const updateData = async (id, data) => {
    await dispatch(editBanner(id, data));
  };
  return [updateData];
};

export const useSelectAllBanner = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.banner);
  useEffect(() => {
    dispatch(getAllBanners({ term, value }));
  }, [term, value]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
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
