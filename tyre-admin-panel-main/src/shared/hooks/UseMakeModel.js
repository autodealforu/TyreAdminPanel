import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addMakeModel,
  getMakeModels,
  getMakeModel,
  editMakeModel,
  deleteMakeModel,
  getAllMakeModels,
} from '../../store/actions/makemodel_action';
import _debounce from 'lodash/debounce';

// Get All Data
export const useAllMakeModels = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.makemodel);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteMakeModel(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(
        getMakeModels({
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
export const useSingleMakeModel = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.makemodel);
  useEffect(() => {
    dispatch(getMakeModel(id));
  }, [id]);
  return [data];
};

// Add Data
export const useCreateMakeModel = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.makemodel);
  const addData = async (data) => {
    await dispatch(addMakeModel(data));
  };
  return [data, addData];
};

export const useUpdateMakeModel = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.makemodel);
  const updateData = async (id, data) => {
    await dispatch(editMakeModel(id, data));
  };
  return [updateData];
};

export const useSelectAllMakeModel = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.makemodel);
  useEffect(() => {
    dispatch(getAllMakeModels({ term, value }));
  }, [term, value]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  const [dropdownOptions, setDropdownOptions] = useState({});

  const loadOptions = async (inputValue, callback, field) => {
    // Implementation for dropdown options if needed
  };

  return [dropdownOptions, loadOptions];
};
