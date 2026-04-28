import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addSubCategory,
  getSubCategorys,
  getSubCategory,
  editSubCategory,
  deleteSubCategory,
  getAllSubCategorys,
} from '../../store/actions/subcategory_action';
import _debounce from 'lodash/debounce';
import { useSelectAllProductcategory } from './UseProductcategory';

// Get All Data
export const useAllSubCategorys = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.subcategory);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteSubCategory(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(
        getSubCategorys({
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
export const useSingleSubCategory = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.subcategory);
  useEffect(() => {
    dispatch(getSubCategory(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateSubCategory = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.subcategory);
  const addData = async (data) => {
    await dispatch(addSubCategory(data));
  };
  return [data, addData];
};
export const useUpdateSubCategory = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.subcategory);
  const updateData = async (id, data) => {
    await dispatch(editSubCategory(id, data));
  };
  return [updateData];
};

export const useSelectAllSubCategory = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.subcategory);
  useEffect(() => {
    dispatch(getAllSubCategorys({ term, value }));
  }, [term, value]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  const [product_category, setClientSearchField, setClientSearchValue] =
    useSelectAllProductcategory();

  const [dropdownOptions, setDropdownOptions] = useState({});
  useEffect(() => {
    if (
      product_category &&
      product_category.all_productcategorys &&
      product_category.all_productcategorys.length > 0
    ) {
      const newData = product_category.all_productcategorys.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, category: newData });
    }
  }, [product_category]);

  return [
    dropdownOptions,
    // setClientSearchField, setClientSearchValue
  ];
};
