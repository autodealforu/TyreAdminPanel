import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addBrand,
  getBrands,
  getBrand,
  editBrand,
  deleteBrand,
  getAllBrands,
} from '../../store/actions/brand_action';
import _debounce from 'lodash/debounce';
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllBrands = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.brand);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteBrand(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(
        getBrands({
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
export const useSingleBrand = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.brand);
  useEffect(() => {
    dispatch(getBrand(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateBrand = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.brand);
  const addData = async (data) => {
    await dispatch(addBrand(data));
  };
  return [data, addData];
};
export const useUpdateBrand = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.brand);
  const updateData = async (id, data) => {
    await dispatch(editBrand(id, data));
  };
  return [updateData];
};

export const useSelectAllBrand = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.brand);
  useEffect(() => {
    dispatch(getAllBrands({ term, value }));
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
