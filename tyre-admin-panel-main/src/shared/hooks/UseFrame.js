import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    addFrame,
    getFrames,
    getFrame,
    editFrame,
    deleteFrame,
    getAllFrames,
} from "../../store/actions/frame_action";
import _debounce from "lodash/debounce";
import { useSelectAllCategory } from "./UseCategory";

// Get All Data
export const useAllFrames = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.frame);
    const [pageNumber, setPageNumber] = useState(1);
    const [deleteEntry, setDeleteEntry] = useState(null);

    useEffect(() => {
        if (deleteEntry) {
            dispatch(deleteFrame(deleteEntry));
        }
        allQuery();
    }, [deleteEntry, pageNumber, window.location.search]);
    const allQuery = useCallback(
        _debounce(() => {
            dispatch(getFrames({}));
        }, 1000),
        []
    );

    const deleteBtnClicked = async (id) => {
        setDeleteEntry(id);
    };

    return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleFrame = (id) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.frame);
    useEffect(() => {
        dispatch(getFrame(id));
    }, [id]);
    return [data];
};
// Add Data
export const useCreateFrame = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.frame);
    const addData = async (data) => {
        await dispatch(addFrame(data));
    };
    return [data, addData];
};
export const useUpdateFrame = () => {
    const dispatch = useDispatch();
    // const data = useSelector((state) => state.frame);
    const updateData = async (id, data) => {
        await dispatch(editFrame(id, data));
    };
    return [updateData];
};

export const useSelectAllFrame = () => {
    const dispatch = useDispatch();
    const [term, setTerm] = useState("");
    const [value, setValue] = useState("");
    const data = useSelector((state) => state.frame);
    useEffect(() => {
        dispatch(getAllFrames({ term, value }));
    }, [term, value]);
    return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
    const [category, setBCategorySearchField, setCategorySearchValue] =
        useSelectAllCategory();

    const [dropdownOptions, setDropdownOptions] = useState({});
    useEffect(() => {
        if (category && category.all_categorys) {
            const newData = category.all_categorys.map((item) => {
                return { label: item.name, value: item._id };
            });
            setDropdownOptions({ ...dropdownOptions, category: newData });
        }
    }, [category]);
    const loadOptions = async (inputValue, callback, field) => {
        // if (field == "parent_category") {
        //   await setCategorySearchField("name");
        //   await setCategorySearchValue(inputValue);
        //   callback(dropdownOptions.parent_category);
        // }
    };

    return [dropdownOptions, loadOptions];
};
