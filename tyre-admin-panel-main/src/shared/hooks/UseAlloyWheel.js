import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addAlloyWheel,
  getAlloyWheels,
  getAlloyWheel,
  editAlloyWheel,
  deleteAlloyWheel,
  getAllAlloyWheels,
} from '../../store/actions/alloywheel_action';
import { useSelectAllBrand } from './UseBrand';
import { useSelectAllProductType } from './UseProductType';
import { useSelectAllAlloyDiameter } from './UseAlloyDiameter';
import { useSelectAllAlloyWidth } from './UseAlloyWidth';
import { useSelectAllAlloyPCD } from './UseAlloyPCD';
import { useSelectAllAlloyOffset } from './UseAlloyOffset';
import { useSelectAllAlloyBore } from './UseAlloyBore';
import { useSelectAllAlloyFinish } from './UseAlloyFinish';
import api from '../../domain/api';

// Get All Data
export const useAllAlloyWheels = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.alloywheel);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  const allQuery = useCallback(() => {
    dispatch(
      getAlloyWheels({
        pageNumber,
      })
    );
  }, [dispatch, pageNumber]);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteAlloyWheel(deleteEntry));
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

// Get Single Data
export const useSingleAlloyWheel = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.alloywheel);
  useEffect(() => {
    dispatch(getAlloyWheel(id));
  }, [id, dispatch]);
  return [data];
};

// Add Data
export const useCreateAlloyWheel = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.alloywheel);
  const addData = async (data) => {
    await dispatch(addAlloyWheel(data));
  };
  return [data, addData];
};

export const useUpdateAlloyWheel = () => {
  const dispatch = useDispatch();
  const updateData = async (id, data) => {
    await dispatch(editAlloyWheel(id, data));
  };
  return [updateData];
};

export const useSelectAllAlloyWheel = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.alloywheel);
  useEffect(() => {
    dispatch(getAllAlloyWheels({ term, value }));
  }, [term, value, dispatch]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  const [brand] = useSelectAllBrand();
  const [producttype] = useSelectAllProductType();
  const [alloyDiameter] = useSelectAllAlloyDiameter();
  const [alloyWidth] = useSelectAllAlloyWidth();
  const [alloyPCD] = useSelectAllAlloyPCD();
  const [alloyOffset] = useSelectAllAlloyOffset();
  const [alloyBore] = useSelectAllAlloyBore();
  const [alloyFinish] = useSelectAllAlloyFinish();

  const [dropdownOptions, setDropdownOptions] = useState({});

  // Set up all dropdown options from hooks
  useEffect(() => {
    if (brand && brand.all_brands) {
      const newData = brand.all_brands.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions((prev) => ({ ...prev, alloyBrand: newData }));
    }
  }, [brand]);

  useEffect(() => {
    if (producttype && producttype.all_producttypes) {
      const newData = producttype.all_producttypes.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions((prev) => ({ ...prev, productType: newData }));
    }
  }, [producttype]);

  useEffect(() => {
    if (alloyDiameter && alloyDiameter.all_alloydiameters) {
      const newData = alloyDiameter.all_alloydiameters.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions((prev) => ({ ...prev, alloyDiameterInches: newData }));
    }
  }, [alloyDiameter]);

  useEffect(() => {
    if (alloyWidth && alloyWidth.all_alloywidths) {
      const newData = alloyWidth.all_alloywidths.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions((prev) => ({ ...prev, alloyWidth: newData }));
    }
  }, [alloyWidth]);

  useEffect(() => {
    if (alloyPCD && alloyPCD.all_alloypcds) {
      const newData = alloyPCD.all_alloypcds.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions((prev) => ({ ...prev, alloyPCD: newData }));
    }
  }, [alloyPCD]);

  useEffect(() => {
    if (alloyOffset && alloyOffset.all_alloyoffsets) {
      const newData = alloyOffset.all_alloyoffsets.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions((prev) => ({ ...prev, alloyOffset: newData }));
    }
  }, [alloyOffset]);

  useEffect(() => {
    if (alloyBore && alloyBore.all_alloybores) {
      const newData = alloyBore.all_alloybores.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions((prev) => ({ ...prev, alloyBoreSizeMM: newData }));
    }
  }, [alloyBore]);

  useEffect(() => {
    if (alloyFinish && alloyFinish.all_alloyfinishes) {
      const newData = alloyFinish.all_alloyfinishes.map((item) => {
        return { label: item.name, value: item._id };
      });
      setDropdownOptions((prev) => ({ ...prev, alloyFinish: newData }));
    }
  }, [alloyFinish]);

  const loadOptions = async (inputValue, callback, field) => {
    // Return dropdown options from hooks
    if (field === 'alloyBrand') {
      return callback(dropdownOptions.alloyBrand || []);
    }
    if (field === 'productType') {
      return callback(dropdownOptions.productType || []);
    }
    if (field === 'alloyDiameterInches') {
      return callback(dropdownOptions.alloyDiameterInches || []);
    }
    if (field === 'alloyWidth') {
      return callback(dropdownOptions.alloyWidth || []);
    }
    if (field === 'alloyPCD') {
      return callback(dropdownOptions.alloyPCD || []);
    }
    if (field === 'alloyOffset') {
      return callback(dropdownOptions.alloyOffset || []);
    }
    if (field === 'alloyBoreSizeMM') {
      return callback(dropdownOptions.alloyBoreSizeMM || []);
    }
    if (field === 'alloyFinish') {
      return callback(dropdownOptions.alloyFinish || []);
    }

    // Fallback to API calls if hooks fail
    try {
      if (field === 'alloyDiameterInches') {
        const { data } = await api.get(`/alloy-diameters/all`);
        return callback(
          (data || []).map((d) => ({ label: d.name, value: d._id }))
        );
      }
      if (field === 'alloyWidth') {
        const { data } = await api.get(`/alloy-widths/all`);
        return callback(
          (data || []).map((d) => ({ label: d.name, value: d._id }))
        );
      }
      if (field === 'alloyPCD') {
        const { data } = await api.get(`/alloy-pcds/all`);
        return callback(
          (data || []).map((d) => ({ label: d.name, value: d._id }))
        );
      }
      if (field === 'alloyOffset') {
        const { data } = await api.get(`/alloy-offsets/all`);
        return callback(
          (data || []).map((d) => ({ label: d.name, value: d._id }))
        );
      }
      if (field === 'alloyBoreSizeMM') {
        const { data } = await api.get(`/alloy-bores/all`);
        return callback(
          (data || []).map((d) => ({ label: d.name, value: d._id }))
        );
      }
      if (field === 'alloyFinish') {
        const { data } = await api.get(`/alloy-finishes/all`);
        return callback(
          (data || []).map((d) => ({ label: d.name, value: d._id }))
        );
      }
    } catch (e) {
      console.error('Error loading dropdown options:', e);
      return callback([]);
    }
  };

  return [dropdownOptions, loadOptions];
};
