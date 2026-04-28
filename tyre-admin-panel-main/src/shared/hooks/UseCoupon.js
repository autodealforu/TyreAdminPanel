import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addCoupon,
  getCoupons,
  getCoupon,
  editCoupon,
  deleteCoupon,
  getAllCoupons,
} from '../../store/actions/coupon_action';
import _debounce from 'lodash/debounce';
import { useSelectAllProductcategory } from './UseProductcategory';

// Get All Data
export const useAllCoupons = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.coupon);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteCoupon(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getCoupons({}));
    }, 1000),
    []
  );

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleCoupon = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.coupon);
  useEffect(() => {
    dispatch(getCoupon(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateCoupon = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.coupon);
  const addData = async (data) => {
    await dispatch(addCoupon(data));
  };
  return [data, addData];
};
export const useUpdateCoupon = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.coupon);
  const updateData = async (id, data) => {
    await dispatch(editCoupon(id, data));
  };
  return [updateData];
};

export const useSelectAllCoupon = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.coupon);
  useEffect(() => {
    dispatch(getAllCoupons({ term, value }));
  }, [term, value]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  const [productcategory] = useSelectAllProductcategory();

  const [dropdownOptions, setDropdownOptions] = useState({});
  useEffect(() => {
    if (productcategory && productcategory.all_productcategorys) {
      const newData = productcategory.all_productcategorys.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, product_category: newData });
    }
  }, [productcategory]);

  const loadOptions = async (inputValue, callback, field) => {
    // if (field == "parent_category") {
    //   await setCategorySearchField("name");
    //   await setCategorySearchValue(inputValue);
    //   callback(dropdownOptions.parent_category);
    // }
  };

  return [dropdownOptions, loadOptions];
};
