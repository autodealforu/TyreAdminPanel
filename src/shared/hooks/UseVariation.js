import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    addVariation,
    getVariations,
    getVariation,
    editVariation,
    deleteVariation,
    getAllVariations,
} from "../../store/actions/variation_action";
import _debounce from "lodash/debounce";
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllVariations = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.variation);
    const [pageNumber, setPageNumber] = useState(1);
    const [deleteEntry, setDeleteEntry] = useState(null);

    useEffect(() => {
        if (deleteEntry) {
            dispatch(deleteVariation(deleteEntry));
        }
        allQuery();
    }, [deleteEntry, pageNumber, window.location.search]);
    const allQuery = useCallback(
        _debounce(() => {
            dispatch(getVariations({}));
        }, 1000),
        []
    );

    const deleteBtnClicked = async (id) => {
        setDeleteEntry(id);
    };

    return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleVariation = (id) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.variation);
    useEffect(() => {
        dispatch(getVariation(id));
    }, [id]);
    return [data];
};
// Add Data
export const useCreateVariation = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.variation);
    const addData = async (data) => {
        await dispatch(addVariation(data));
    };
    return [data, addData];
};
export const useUpdateVariation = () => {
    const dispatch = useDispatch();
    // const data = useSelector((state) => state.variation);
    const updateData = async (id, data) => {
        await dispatch(editVariation(id, data));
    };
    return [updateData];
};

export const useSelectAllVariation = () => {
    const dispatch = useDispatch();
    const [term, setTerm] = useState("");
    const [value, setValue] = useState("");
    const data = useSelector((state) => state.variation);
    useEffect(() => {
        dispatch(getAllVariations({ term, value }));
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
        // if (field == "parent_variation") {
        //   await setVariationSearchField("name");
        //   await setVariationSearchValue(inputValue);
        //   callback(dropdownOptions.parent_variation);
        // }
    };

    return [dropdownOptions, loadOptions];
};
