import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addAlloyOffset,
  getAlloyOffsets,
  getAlloyOffset,
  editAlloyOffset,
  deleteAlloyOffset,
  getAllAlloyOffsets,
} from '../../store/actions/alloyoffset_action';

export const useAllAlloyOffsets = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.alloyoffset);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  const allQuery = useCallback(() => {
    dispatch(
      getAlloyOffsets({
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
        await dispatch(deleteAlloyOffset(deleteEntry));
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
    if (window.confirm('Are you sure you want to delete this alloy offset?')) {
      setDeleteEntry(id);
    }
  };

  return [data, setPageNumber, deleteBtnClicked];
};

export const useSingleAlloyOffset = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.alloyoffset);
  useEffect(() => {
    dispatch(getAlloyOffset(id));
  }, [id, dispatch]);
  return [data];
};

export const useCreateAlloyOffset = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.alloyoffset);
  const addData = async (data) => {
    await dispatch(addAlloyOffset(data));
  };
  return [data, addData];
};

export const useUpdateAlloyOffset = () => {
  const dispatch = useDispatch();
  const updateData = async (id, data) => {
    await dispatch(editAlloyOffset(id, data));
  };
  return [updateData];
};

export const useSelectAllAlloyOffset = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.alloyoffset);
  useEffect(() => {
    dispatch(getAllAlloyOffsets({ term, value }));
  }, [term, value, dispatch]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  return [{}, () => {}];
};
