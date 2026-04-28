import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';
import {
  addUnifiedProduct,
  getUnifiedProducts,
  getUnifiedProductById,
  editUnifiedProduct,
  deleteUnifiedProduct,
} from '../../store/actions/unified_product_action';
import { useAllVendors } from './UseVendor';
import { useSelectAllProductType } from './UseProductType';
import { useSelectAllBrand } from './UseBrand';
import { useSelectAllRimDiameter } from './UseRimDiameter';
import { useSelectAllTyreWidth } from './UseTyreWidth';
import { useSelectAllAspectRatio } from './UseAspectRatio';
import { useSelectAllLoadIndex } from './UseLoadIndex';
import { useSelectAllSpeedSymbol } from './UseSpeedSymbol';
import { useSelectAllPlyrating } from './UsePlyrating';
import { useSelectAllThreadPattern } from './UseThreadPattern';

export const useAddUnifiedProduct = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.unified_product);

  const addData = async (formData) => {
    try {
      await dispatch(addUnifiedProduct(formData));
    } catch (error) {
      console.error('Error adding unified product:', error);
    }
  };

  return [data, addData];
};

export const useAllUnifiedProducts = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.unified_product);

  const getData = useCallback(
    async (pageNumber = 1, search = {}) => {
      await dispatch(getUnifiedProducts(pageNumber, search));
    },
    [dispatch]
  );

  useEffect(() => {
    getData();
  }, [getData]);

  return [data, getData];
};

export const useSingleUnifiedProduct = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.unified_product);

  useEffect(() => {
    if (id) {
      dispatch(getUnifiedProductById(id));
    }
  }, [dispatch, id]);

  return [data];
};

export const useEditUnifiedProduct = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.unified_product);

  const editData = async (id, formData) => {
    try {
      await dispatch(editUnifiedProduct(id, formData));
    } catch (error) {
      console.error('Error editing unified product:', error);
    }
  };

  return [data, editData];
};

export const useDeleteUnifiedProduct = () => {
  const dispatch = useDispatch();

  const deleteData = async (id) => {
    try {
      await dispatch(deleteUnifiedProduct(id));
    } catch (error) {
      console.error('Error deleting unified product:', error);
    }
  };

  return [deleteData];
};

// Hook to get all dropdown options for the unified product form
export const useGetUnifiedDropdownOptions = () => {
  // Get all the dropdown options
  const [vendorData] = useAllVendors();
  const [productTypeData] = useSelectAllProductType();
  const [brandData] = useSelectAllBrand();

  // Tyre-specific dropdowns
  const [rimDiameterData] = useSelectAllRimDiameter();
  const [tyreWidthData] = useSelectAllTyreWidth();
  const [aspectRatioData] = useSelectAllAspectRatio();
  const [loadIndexData] = useSelectAllLoadIndex();
  const [speedSymbolData] = useSelectAllSpeedSymbol();
  const [plyRatingData] = useSelectAllPlyrating();
  const [threadPatternData] = useSelectAllThreadPattern();

  const dropdownOptions = {
    // Common options - transform to {label, value} format
    vendor:
      vendorData?.vendors?.map((item) => ({
        label: `${item.name}${item.store_name ? ' - ' + item.store_name : ''}`,
        value: item._id,
      })) || [],
    productType:
      productTypeData?.all_producttypes?.map((item) => ({
        label: item.name,
        value: item._id,
      })) || [],
    productBrand:
      brandData?.all_brands?.map((item) => ({
        label: item.name,
        value: item._id,
      })) || [],

    // Tyre-specific options - transform to {label, value} format
    rimDiameter:
      rimDiameterData?.all_rimdiameters?.map((item) => ({
        label: item.name,
        value: item._id,
      })) || [],
    tyreWidth:
      tyreWidthData?.all_tyrewidths?.map((item) => ({
        label: item.name,
        value: item._id,
      })) || [],
    aspectRatio:
      aspectRatioData?.all_aspectratios?.map((item) => ({
        label: item.name,
        value: item._id,
      })) || [],
    loadIndex:
      loadIndexData?.all_loadindexs?.map((item) => ({
        label: item.name,
        value: item._id,
      })) || [],
    speedSymbol:
      speedSymbolData?.all_speedsymbols?.map((item) => ({
        label: item.name,
        value: item._id,
      })) || [],
    plyRating:
      plyRatingData?.all_plyratings?.map((item) => ({
        label: item.name,
        value: item._id,
      })) || [],
    productThreadPattern:
      threadPatternData?.all_threadpatterns?.map((item) => ({
        label: item.name,
        value: item._id,
      })) || [],

    // Empty arrays for alloy wheel options since we don't need them for tyre form
    alloyDiameterInches: [],
    alloyWidth: [],
    alloyPCD: [],
    alloyOffset: [],
    alloyBoreSizeMM: [],
    alloyBrand: [],
    alloyFinish: [],
  };

  return [dropdownOptions];
};

// Hook to load options dynamically (for async loading)
export const useLoadOptions = () => {
  const loadOptions = async (searchItem, searchTerm = '') => {
    // This can be used for async loading of options
    // For now, we'll return empty array as all options are loaded upfront
    return [];
  };

  return loadOptions;
};
