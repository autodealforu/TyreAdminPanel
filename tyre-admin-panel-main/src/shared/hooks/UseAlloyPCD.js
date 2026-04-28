import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addAlloyPCD,
  getAlloyPCDS,
  getAlloyPCD,
  editAlloyPCD,
  deleteAlloyPCD,
  getAllAlloyPCDs,
} from '../../store/actions/alloypcd_action';

export const useAllAlloyPCDs = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.alloypcd);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  const allQuery = useCallback(() => {
    dispatch(
      getAlloyPCDS({
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
        await dispatch(deleteAlloyPCD(deleteEntry));
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
    if (window.confirm('Are you sure you want to delete this alloy PCD?')) {
      setDeleteEntry(id);
    }
  };

  return [data, setPageNumber, deleteBtnClicked];
};

export const useSingleAlloyPCD = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.alloypcd);
  useEffect(() => {
    dispatch(getAlloyPCD(id));
  }, [id, dispatch]);
  return [data];
};

export const useCreateAlloyPCD = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.alloypcd);
  const addData = async (data) => {
    await dispatch(addAlloyPCD(data));
  };
  return [data, addData];
};

export const useUpdateAlloyPCD = () => {
  const dispatch = useDispatch();
  const updateData = async (id, data) => {
    await dispatch(editAlloyPCD(id, data));
  };
  return [updateData];
};

export const useSelectAllAlloyPCD = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.alloypcd);
  useEffect(() => {
    dispatch(getAllAlloyPCDs({ term, value }));
  }, [term, value, dispatch]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  return [{}, () => {}];
};
