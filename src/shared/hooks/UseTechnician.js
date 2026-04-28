import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTechnician,
  getTechnicians,
  getTechnician,
  editTechnician,
  deleteTechnician,
  getAllTechnicians,
} from '../../store/actions/technician_action';
import _debounce from 'lodash/debounce';
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllTechnicians = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.technician);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteTechnician(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(
        getTechnicians({
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
export const useSingleTechnician = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.technician);
  useEffect(() => {
    dispatch(getTechnician(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateTechnician = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.technician);
  const addData = async (data) => {
    await dispatch(addTechnician(data));
  };
  return [data, addData];
};
export const useUpdateTechnician = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.technician);
  const updateData = async (id, data) => {
    await dispatch(editTechnician(id, data));
  };
  return [updateData];
};

export const useSelectAllTechnician = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.technician);
  useEffect(() => {
    dispatch(getAllTechnicians({ term, value }));
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
