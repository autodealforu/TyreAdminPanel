import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addProductcategory,
  getProductcategorys,
  getProductcategory,
  editProductcategory,
  deleteProductcategory,
  getAllProductcategorys,
} from '../../store/actions/productcategory_action';
import _debounce from 'lodash/debounce';

// Get All Data
export const useAllProductcategorys = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.productcategory);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteProductcategory(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(
        getProductcategorys({
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
export const useSingleProductcategory = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.productcategory);
  useEffect(() => {
    dispatch(getProductcategory(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateProductcategory = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.productcategory);
  const addData = async (data) => {
    await dispatch(addProductcategory(data));
  };
  return [data, addData];
};
export const useUpdateProductcategory = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.productcategory);
  const updateData = async (id, data) => {
    await dispatch(editProductcategory(id, data));
  };
  return [updateData];
};

export const useSelectAllProductcategory = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.productcategory);
  useEffect(() => {
    dispatch(getAllProductcategorys({ term, value }));
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
