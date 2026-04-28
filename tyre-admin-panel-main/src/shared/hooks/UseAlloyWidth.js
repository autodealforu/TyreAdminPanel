import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addAlloyWidth,
  getAlloyWidths,
  getAlloyWidth,
  editAlloyWidth,
  deleteAlloyWidth,
  getAllAlloyWidths,
} from '../../store/actions/alloywidth_action';

// Get All Data
export const useAllAlloyWidths = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.alloywidth);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  const allQuery = useCallback(() => {
    dispatch(
      getAlloyWidths({
        pageNumber,
      })
    );
  }, [dispatch, pageNumber]);

  useEffect(() => {
    allQuery();
  }, [pageNumber, allQuery]);

  useEffect(() => {
    if (deleteEntry) {
      const performDelete = async () => {
        await dispatch(deleteAlloyWidth(deleteEntry));
        setDeleteEntry(null);
        // Refresh the list after deletion
        allQuery();
      };
      performDelete();
    }
  }, [deleteEntry, dispatch, allQuery]);

  useEffect(() => {
    setPageNumber(1);
  }, []);

  const deleteBtnClicked = async (id) => {
    if (window.confirm('Are you sure you want to delete this alloy width?')) {
      setDeleteEntry(id);
    }
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleAlloyWidth = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.alloywidth);
  useEffect(() => {
    dispatch(getAlloyWidth(id));
  }, [id, dispatch]);
  return [data];
};

// Add Data
export const useCreateAlloyWidth = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.alloywidth);
  const addData = async (data) => {
    await dispatch(addAlloyWidth(data));
  };
  return [data, addData];
};

export const useUpdateAlloyWidth = () => {
  const dispatch = useDispatch();
  const updateData = async (id, data) => {
    await dispatch(editAlloyWidth(id, data));
  };
  return [updateData];
};

export const useSelectAllAlloyWidth = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.alloywidth);
  useEffect(() => {
    dispatch(getAllAlloyWidths({ term, value }));
  }, [term, value, dispatch]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  return [{}, () => {}];
};
