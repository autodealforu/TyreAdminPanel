import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addService,
  getServices,
  getService,
  editService,
  deleteService,
  getAllServices,
} from '../../store/actions/service_action';
import { useSelectAllProductType } from './UseProductType';

// Get All Data
export const useAllServices = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.service);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  const allQuery = useCallback(() => {
    dispatch(
      getServices({
        pageNumber,
      })
    );
  }, [dispatch, pageNumber]);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteService(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, allQuery, dispatch]);

  useEffect(() => {
    setPageNumber(1);
  }, []);

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleService = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.service);
  useEffect(() => {
    dispatch(getService(id));
  }, [id, dispatch]);
  return [data];
};

// Add Data
export const useCreateService = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.service);
  const addData = async (data) => {
    await dispatch(addService(data));
  };
  return [data, addData];
};

export const useUpdateService = () => {
  const dispatch = useDispatch();
  const updateData = async (id, data) => {
    await dispatch(editService(id, data));
  };
  return [updateData];
};

export const useSelectAllService = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.service);
  useEffect(() => {
    dispatch(getAllServices({ term: '', value: '' }));
  }, [dispatch]);
  return [data];
};

export const useGetDropdownOptions = () => {
  const [producttype] = useSelectAllProductType();
  const [dropdownOptions, setDropdownOptions] = useState({});

  useEffect(() => {
    if (producttype && producttype.all_producttypes) {
      const newData = producttype.all_producttypes.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions((prev) => ({ ...prev, productType: newData }));
    }
  }, [producttype]);

  const loadOptions = async () => {
    // Additional loading logic if needed
  };

  return [dropdownOptions, loadOptions];
};
