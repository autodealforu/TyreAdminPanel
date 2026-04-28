import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTyre,
  getTyres,
  getTyre,
  editTyre,
  deleteTyre,
  getAllTyres,
} from '../../store/actions/tyre_action';
import _debounce from 'lodash/debounce';
import { useSelectAllAspectRatio } from './UseAspectRatio';
import { useSelectAllRimDiameter } from './UseRimDiameter';
import { useSelectAllLoadIndex } from './UseLoadIndex';
import { useSelectAllSpeedSymbol } from './UseSpeedSymbol';
import { useSelectAllPlyrating } from './UsePlyrating';
import { useSelectAllBrand } from './UseBrand';
import { useSelectAllThreadPattern } from './UseThreadPattern';
import { useSelectAllProductType } from './UseProductType';
import { useSelectAllProductcategory } from './UseProductcategory';
import { useSelectAllTyreWidth } from './UseTyreWidth';
// import { useSelectAllIndustry } from "./UseIndustry";

// Get All Data
export const useAllTyres = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.tyre);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteTyre(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(
        getTyres({
          pageNumber,
        })
      );
    }, 1000),
    []
  );

  useEffect(() => {
    setPageNumber(1);
  }, [window.location.search]);

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleTyre = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.tyre);
  useEffect(() => {
    dispatch(getTyre(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateTyre = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.tyre);
  const addData = async (data) => {
    await dispatch(addTyre(data));
  };
  return [data, addData];
};
export const useUpdateTyre = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.tyre);
  const updateData = async (id, data) => {
    await dispatch(editTyre(id, data));
  };
  return [updateData];
};

export const useSelectAllTyre = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.tyre);
  useEffect(() => {
    dispatch(getAllTyres({ term, value }));
  }, [term, value]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  const [aspectratio, setAspectrationSearchField, setAspectrationSearchValue] =
    useSelectAllAspectRatio();
  const [rimdiameter] = useSelectAllRimDiameter();
  const [tyreWidth] = useSelectAllTyreWidth();
  const [aspectRatio] = useSelectAllAspectRatio();
  const [loadIndex] = useSelectAllLoadIndex();
  const [speedSymbol] = useSelectAllSpeedSymbol();
  const [plyRating] = useSelectAllPlyrating();
  const [brand] = useSelectAllBrand();
  const [productThreadPattern] = useSelectAllThreadPattern();
  const [productType] = useSelectAllProductType();
  const [productcategory] = useSelectAllProductcategory();

  const [dropdownOptions, setDropdownOptions] = useState({});
  useEffect(() => {
    setDropdownOptions({
      ...dropdownOptions,
      tyreWidthType: [
        {
          label: 'IN MM',
          value: 'MM',
        },
        {
          label: 'IN INCH',
          value: 'INCH',
        },
      ],
    });
  }, []);

  useEffect(() => {
    if (rimdiameter && rimdiameter.all_rimdiameters) {
      const newData = rimdiameter.all_rimdiameters.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, rimDiameter: newData });
    }
  }, [rimdiameter]);

  useEffect(() => {
    if (tyreWidth && tyreWidth.all_tyrewidths) {
      const newData = tyreWidth.all_tyrewidths.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, tyreWidth: newData });
    }
  }, [tyreWidth]);

  useEffect(() => {
    if (tyreWidth && tyreWidth.all_tyrewidths) {
      const newData = tyreWidth.all_tyrewidths.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, tyreWidth: newData });
    }
  }, [tyreWidth]);

  useEffect(() => {
    if (aspectRatio && aspectRatio.all_aspectratios) {
      const newData = aspectRatio.all_aspectratios.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, aspectRatio: newData });
    }
  }, [aspectRatio]);

  useEffect(() => {
    if (loadIndex && loadIndex.all_loadindexs) {
      const newData = loadIndex.all_loadindexs.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, loadIndex: newData });
    }
  }, [loadIndex]);

  useEffect(() => {
    if (speedSymbol && speedSymbol.all_speedsymbols) {
      const newData = speedSymbol.all_speedsymbols.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, speedSymbol: newData });
    }
  }, [speedSymbol]);

  useEffect(() => {
    if (plyRating && plyRating.all_plyratings) {
      const newData = plyRating.all_plyratings.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, plyRating: newData });
    }
  }, [plyRating]);

  useEffect(() => {
    if (brand && brand.all_brands) {
      const newData = brand.all_brands.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, productBrand: newData });
    }
  }, [brand]);
  useEffect(() => {
    if (productThreadPattern && productThreadPattern.all_threadpatterns) {
      const newData = productThreadPattern.all_threadpatterns.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, productThreadPattern: newData });
    }
  }, [productThreadPattern]);
  useEffect(() => {
    if (productType && productType.all_producttypes) {
      const newData = productType.all_producttypes.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, productType: newData });
    }
  }, [productType]);

  useEffect(() => {
    if (productcategory && productcategory.all_productcategorys) {
      const newData = productcategory.all_productcategorys.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, productcategory: newData });
    }
  }, [productcategory]);

  const loadOptions = async (inputValue, callback, field) => {
    if (field == 'tyreWidthType') {
      await setAspectrationSearchField('name');
      await setAspectrationSearchValue(inputValue);
      callback(dropdownOptions.aspectRatio);
    }
  };

  return [dropdownOptions, loadOptions];
};
