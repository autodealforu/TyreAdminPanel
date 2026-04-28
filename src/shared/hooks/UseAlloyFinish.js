import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addAlloyFinish,
  getAlloyFinishes,
  getAlloyFinish,
  editAlloyFinish,
  deleteAlloyFinish,
  getAllAlloyFinishes,
} from '../../store/actions/alloyfinish_action';

export const useAllAlloyFinishes = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.alloyfinish);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  const allQuery = useCallback(() => {
    dispatch(
      getAlloyFinishes({
        pageNumber,
      })
    );
  }, [dispatch, pageNumber]);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteAlloyFinish(deleteEntry));
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

export const useSingleAlloyFinish = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.alloyfinish);
  useEffect(() => {
    dispatch(getAlloyFinish(id));
  }, [id, dispatch]);
  return [data];
};

export const useCreateAlloyFinish = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.alloyfinish);
  const addData = async (data) => {
    await dispatch(addAlloyFinish(data));
  };
  return [data, addData];
};

export const useUpdateAlloyFinish = () => {
  const dispatch = useDispatch();
  const updateData = async (id, data) => {
    await dispatch(editAlloyFinish(id, data));
  };
  return [updateData];
};

export const useSelectAllAlloyFinish = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.alloyfinish);
  useEffect(() => {
    dispatch(getAllAlloyFinishes({ term, value }));
  }, [term, value, dispatch]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  return [{}, () => {}];
};
