import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addSubSubCategory,
  getSubSubCategorys,
  getSubSubCategory,
  editSubSubCategory,
  deleteSubSubCategory,
  getAllSubSubCategorys,
} from '../../store/actions/subsubcategory_action';
import _debounce from 'lodash/debounce';
// import { useSelectAllIndustry } from "./UseIndustry";
import { useSelectAllProductcategory } from './UseProductcategory';
import { useSelectAllSubCategory } from './UseSubCategory';

// Get All Data
export const useAllSubSubCategorys = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.subsubcategory);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteSubSubCategory(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(
        getSubSubCategorys({
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
export const useSingleSubSubCategory = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.subsubcategory);
  useEffect(() => {
    dispatch(getSubSubCategory(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateSubSubCategory = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.subsubcategory);
  const addData = async (data) => {
    await dispatch(addSubSubCategory(data));
  };
  return [data, addData];
};
export const useUpdateSubSubCategory = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.subsubcategory);
  const updateData = async (id, data) => {
    await dispatch(editSubSubCategory(id, data));
  };
  return [updateData];
};

export const useSelectAllSubSubCategory = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.subsubcategory);
  useEffect(() => {
    dispatch(getAllSubSubCategorys({ term, value }));
  }, [term, value]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  const [product_category, setClientSearchField, setClientSearchValue] =
    useSelectAllProductcategory();

  const [dropdownOptions, setDropdownOptions] = useState({});
  useEffect(() => {
    if (product_category && product_category.all_productcategorys) {
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
