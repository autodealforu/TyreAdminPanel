import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addNotification,
  getNotifications,
  getNotification,
  editNotification,
  deleteNotification,
  getAllNotifications,
} from "../../store/actions/notification_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllNotifications = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.notification);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteNotification(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getNotifications({}));
    }, 1000),
    []
  );

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleNotification = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.notification);
  useEffect(() => {
    dispatch(getNotification(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateNotification = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.notification);
  const addData = async (data) => {
    await dispatch(addNotification(data));
  };
  return [data, addData];
};
export const useUpdateNotification = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.notification);
  const updateData = async (id, data) => {
    await dispatch(editNotification(id, data));
  };
  return [updateData];
};

export const useSelectAllNotification = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.notification);
  useEffect(() => {
    dispatch(getAllNotifications({}));
  }, []);
  const reloadData = () => {
    dispatch(getAllNotifications({}));
  };
  return [data, reloadData];
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
