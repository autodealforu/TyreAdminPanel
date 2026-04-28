import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addOrder,
  getOrders,
  getOrder,
  editOrder,
  deleteOrder,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
  updateDeliveryCharges,
  updatePayoutStatus,
} from '../../store/actions/order_action';
import _debounce from 'lodash/debounce';
import { useSelectAllProduct } from './UseProduct';
import { useSelectAllVendor } from './UseVendor';

// Get All Data
export const useAllOrders = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.order);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteOrder(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getOrders({}));
    }, 1000),
    []
  );

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleOrder = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrder(id));
  }, [id]);
  const reloadData = (id) => {
    dispatch(getOrder(id));
  };
  return [data, reloadData];
};
// Add Data
export const useCreateOrder = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.order);
  const addData = async (data) => {
    await dispatch(addOrder(data));
  };
  return [data, addData];
};
export const useUpdateOrder = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.order);
  const updateData = async (id, data) => {
    await dispatch(editOrder(id, data));
  };
  return [updateData];
};
export const useUpdateOrderStatus = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.order);
  const updateData = async (id, data) => {
    await dispatch(updateOrderStatus(id, data));
  };
  return [updateData];
};
export const useUpdatePaymentStatus = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.order);
  const updateData = async (id, data) => {
    await dispatch(updatePaymentStatus(id, data));
  };
  return [updateData];
};
export const useUpdateDeliveryCharges = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.order);
  const updateData = async (id, data) => {
    await dispatch(updateDeliveryCharges(id, data));
  };
  return [updateData];
};
export const useUpdatePayoutStatus = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.order);
  const updateData = async (id, data) => {
    await dispatch(updatePayoutStatus(id, data));
  };
  return [updateData];
};

export const useSelectAllOrder = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(getAllOrders({ term, value }));
  }, [term, value]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  const [product, setProductSearchField, setProductSearchValue] =
    useSelectAllProduct();
  const [vendor, setVendorSearchField, setVendorSearchValue] =
    useSelectAllVendor();

  const [dropdownOptions, setDropdownOptions] = useState({});
  useEffect(() => {
    if (product && product.all_products) {
      const newData = product.all_products.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, product: newData });
    }
  }, [product]);
  useEffect(() => {
    if (vendor && vendor.all_vendors) {
      const newData = vendor.all_vendors.map((item) => {
        return {
          label: item.vendor && item.vendor.store_name,
          value: item._id,
        };
      });
      setDropdownOptions({ ...dropdownOptions, vendor: newData });
    }
  }, [vendor]);
  const loadOptions = async (inputValue, callback, field) => {
    if (field == 'product') {
      await setProductSearchField('name');
      await setProductSearchValue(inputValue);
      callback(dropdownOptions.product);
    }
    if (field == 'vendor') {
      await setVendorSearchField('vendor.store_name');
      await setVendorSearchValue(inputValue);
      callback(dropdownOptions.vendor);
    }
  };

  return [dropdownOptions, loadOptions];
};
