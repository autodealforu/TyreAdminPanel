import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addVehicle,
  getVehicles,
  getVehicle,
  editVehicle,
  deleteVehicle,
  getAllVehicles,
} from '../../store/actions/vehicle_action';
import { useSelectAllMakeModel } from './UseMakeModel';
import _debounce from 'lodash/debounce';
import { useSelectAllCustomer } from './UseCustomer';
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllVehicles = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.vehicle);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteVehicle(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(
        getVehicles({
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
export const useSingleVehicle = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.vehicle);
  useEffect(() => {
    dispatch(getVehicle(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateVehicle = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.vehicle);
  const addData = async (data) => {
    await dispatch(addVehicle(data));
  };
  return [data, addData];
};
export const useUpdateVehicle = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.vehicle);
  const updateData = async (id, data) => {
    await dispatch(editVehicle(id, data));
  };
  return [updateData];
};

export const useSelectAllVehicle = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.vehicle);
  useEffect(() => {
    dispatch(getAllVehicles({ term, value }));
  }, [term, value]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  const [makemodel, setMakeModelSearchField, setMakeModelSearchValue] =
    useSelectAllMakeModel();
  const [customer] = useSelectAllCustomer();

  const [dropdownOptions, setDropdownOptions] = useState({});

  useEffect(() => {
    if (makemodel && makemodel.all_makemodels) {
      const newData = makemodel.all_makemodels.map((item) => {
        return { label: item.name, value: item._id };
      });

      setDropdownOptions((prevOptions) => ({
        ...prevOptions,
        makeModel: newData,
      }));
    }
  }, [makemodel]);

  useEffect(() => {
    if (customer && customer.all_customers) {
      const newData = customer.all_customers.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, owner: newData });
    }
  }, [customer]);

  const loadOptions = async (inputValue, callback, field) => {
    if (field === 'makemodel') {
      await setMakeModelSearchField('name');
      await setMakeModelSearchValue(inputValue);
      if (dropdownOptions.makemodel) {
        callback(dropdownOptions.makemodel);
      }
    }
  };

  return [dropdownOptions, loadOptions];
};
