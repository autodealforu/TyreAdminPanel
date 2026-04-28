import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addAlloyDiameter,
  getAlloyDiameters,
  getAlloyDiameter,
  editAlloyDiameter,
  deleteAlloyDiameter,
  getAllAlloyDiameters,
} from '../../store/actions/alloydiameter_action';

export const useAllAlloyDiameters = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.alloydiameter);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  const allQuery = useCallback(() => {
    dispatch(
      getAlloyDiameters({
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
        await dispatch(deleteAlloyDiameter(deleteEntry));
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
    if (
      window.confirm('Are you sure you want to delete this alloy diameter?')
    ) {
      setDeleteEntry(id);
    }
  };

  return [data, setPageNumber, deleteBtnClicked];
};

export const useSingleAlloyDiameter = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.alloydiameter);
  useEffect(() => {
    dispatch(getAlloyDiameter(id));
  }, [id, dispatch]);
  return [data];
};

export const useCreateAlloyDiameter = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.alloydiameter);
  const addData = async (data) => {
    await dispatch(addAlloyDiameter(data));
  };
  return [data, addData];
};

export const useUpdateAlloyDiameter = () => {
  const dispatch = useDispatch();
  const updateData = async (id, data) => {
    await dispatch(editAlloyDiameter(id, data));
  };
  return [updateData];
};

export const useSelectAllAlloyDiameter = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.alloydiameter);
  useEffect(() => {
    dispatch(getAllAlloyDiameters({ term, value }));
  }, [term, value, dispatch]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  return [{}, () => {}];
};
