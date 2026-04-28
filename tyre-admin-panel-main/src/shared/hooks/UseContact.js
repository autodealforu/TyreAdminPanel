import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addContact,
  getContacts,
  getContact,
  editContact,
  deleteContact,
  getAllContacts,
} from "../../store/actions/contact_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllContacts = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.contact);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteContact(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getContacts({}));
    }, 1000),
    []
  );

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleContact = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.contact);
  useEffect(() => {
    dispatch(getContact(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateContact = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.contact);
  const addData = async (data) => {
    await dispatch(addContact(data));
  };
  return [data, addData];
};
export const useUpdateContact = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.contact);
  const updateData = async (id, data) => {
    await dispatch(editContact(id, data));
  };
  return [updateData];
};

export const useSelectAllContact = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.contact);
  useEffect(() => {
    dispatch(getAllContacts({ term, value }));
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
