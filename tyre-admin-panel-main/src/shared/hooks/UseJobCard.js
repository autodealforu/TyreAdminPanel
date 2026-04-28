import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addJobCard,
  getJobCards,
  getJobCard,
  editJobCard,
  deleteJobCard,
  getAllJobCards,
} from '../../store/actions/job_card_action';
import _debounce from 'lodash/debounce';
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllJobCards = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.job_card);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteJobCard(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(
        getJobCards({
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
export const useSingleJobCard = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.job_card);
  useEffect(() => {
    dispatch(getJobCard(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateJobCard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.job_card);
  const addData = async (data) => {
    await dispatch(addJobCard(data));
  };
  return [data, addData];
};
export const useUpdateJobCard = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.job_card);
  const updateData = async (id, data) => {
    await dispatch(editJobCard(id, data));
  };
  return [updateData];
};

export const useSelectAllJobCard = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.job_card);
  useEffect(() => {
    dispatch(getAllJobCards({ term, value }));
  }, [term, value]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  const [dropdownOptions, setDropdownOptions] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        // Import api dynamically to avoid circular dependencies
        const { default: api } = await import('../../domain/api');

        // Fetch vendors
        const vendorsResponse = await api.get('/vendors/all');
        const vendors = vendorsResponse.data || [];

        const vehiclesResponse = await api.get(
          `/vehicles/all?term=vehicle_number&value=${searchTerm}`
        );
        const vehicles = vehiclesResponse.data || [];
        const mappedVehicles = vehicles.map((vehicle) => ({
          ...vehicle,
          label: vehicle.vehicle_number,
          value: vehicle._id,
        }));

        setDropdownOptions((prev) => ({
          ...prev,
          vendors: vendors,
          vehicle: mappedVehicles,
        }));
      } catch (error) {
        console.error('Error fetching dropdown options:', error);
        setDropdownOptions((prev) => ({
          ...prev,
          vendors: [],
        }));
      }
    };

    fetchDropdownOptions();
  }, [searchTerm]);

  const loadOptions = async (inputValue, callback, field) => {
    if (field == 'vehicle') {
      console.log('Changes in Field');

      setSearchTerm(inputValue);
      callback(dropdownOptions.vehicle);
    }
  };

  return [dropdownOptions, loadOptions];
};
