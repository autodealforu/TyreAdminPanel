import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addAlloyBore,
  getAlloyBores,
  getAlloyBore,
  editAlloyBore,
  deleteAlloyBore,
  getAllAlloyBores,
} from '../../store/actions/alloybore_action';

export const useAllAlloyBores = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.alloybore);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  const allQuery = useCallback(() => {
    dispatch(
      getAlloyBores({
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
        await dispatch(deleteAlloyBore(deleteEntry));
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
    if (window.confirm('Are you sure you want to delete this alloy bore?')) {
      setDeleteEntry(id);
    }
  };

  return [data, setPageNumber, deleteBtnClicked];
};

export const useSingleAlloyBore = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.alloybore);
  useEffect(() => {
    dispatch(getAlloyBore(id));
  }, [id, dispatch]);
  return [data];
};

export const useCreateAlloyBore = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.alloybore);
  const addData = async (data) => {
    await dispatch(addAlloyBore(data));
  };
  return [data, addData];
};

export const useUpdateAlloyBore = () => {
  const dispatch = useDispatch();
  const updateData = async (id, data) => {
    await dispatch(editAlloyBore(id, data));
  };
  return [updateData];
};

export const useSelectAllAlloyBore = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.alloybore);
  useEffect(() => {
    dispatch(getAllAlloyBores({ term, value }));
  }, [term, value, dispatch]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  return [{}, () => {}];
};
