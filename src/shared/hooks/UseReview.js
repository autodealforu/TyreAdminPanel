import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addReview,
  getReviews,
  getReview,
  editReview,
  deleteReview,
  getAllReviews,
} from '../../store/actions/review_action';
import _debounce from 'lodash/debounce';
import { useSelectAllProduct } from './UseProduct';

// Get All Data
export const useAllReviews = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.review);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteEntry, setDeleteEntry] = useState(null);

  useEffect(() => {
    if (deleteEntry) {
      dispatch(deleteReview(deleteEntry));
    }
    allQuery();
  }, [deleteEntry, pageNumber, window.location.search]);
  const allQuery = useCallback(
    _debounce(() => {
      dispatch(getReviews({}));
    }, 1000),
    []
  );

  const deleteBtnClicked = async (id) => {
    setDeleteEntry(id);
  };

  return [data, setPageNumber, deleteBtnClicked];
};

// Get Single Data
export const useSingleReview = (id) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.review);
  useEffect(() => {
    dispatch(getReview(id));
  }, [id]);
  return [data];
};
// Add Data
export const useCreateReview = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.review);
  const addData = async (data) => {
    await dispatch(addReview(data));
  };
  return [data, addData];
};
export const useUpdateReview = () => {
  const dispatch = useDispatch();
  // const data = useSelector((state) => state.review);
  const updateData = async (id, data) => {
    await dispatch(editReview(id, data));
  };
  return [updateData];
};

export const useSelectAllReview = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [value, setValue] = useState('');
  const data = useSelector((state) => state.review);
  useEffect(() => {
    dispatch(getAllReviews({ term, value }));
  }, [term, value]);
  return [data, setTerm, setValue];
};

export const useGetDropdownOptions = () => {
  const [product, setProductSearchField, setProductSearchValue] =
    useSelectAllProduct();

  const [dropdownOptions, setDropdownOptions] = useState({});
  useEffect(() => {
    if (product && product.all_products) {
      const newData = product.all_products.map((item) => {
        let productLabel = '';

        // Format label based on product category
        if (item.product_category === 'TYRE' && item.tyre) {
          // Tyre format: Brand Width/Aspect Construction RimDiameter PlyRating LoadIndex SpeedSymbol ThreadPattern Unit
          productLabel = `${item.tyre?.productBrand?.name || ''} ${
            item.tyre?.tyreWidth?.name || ''
          }${
            item?.tyre?.tyreWidthType === 'IN MM'
              ? `/${item.tyre?.aspectRatio?.name}`
              : ''
          }${item.tyre?.construction || ''} ${
            item?.tyre?.rimDiameter?.name || ''
          } ${item?.tyre?.plyRating?.name || ''} ${
            item?.tyre?.loadIndex?.name || ''
          } ${item?.tyre?.speedSymbol?.name || ''} ${
            item?.tyre?.productThreadPattern?.name || ''
          } ${item?.tyre?.unit || ''}`
            .trim()
            .replace(/\s+/g, ' ');
        } else if (
          item.product_category === 'ALLOY_WHEEL' &&
          item.alloy_wheel
        ) {
          // Alloy Wheel format: Brand DiameterXWidth Finish
          productLabel = `${
            item?.alloy_wheel?.alloyBrand?.name || 'Unknown Brand'
          } ${item?.alloy_wheel?.alloyDiameterInches?.name || ''}X${
            item?.alloy_wheel?.alloyWidth?.name || ''
          } ${item?.alloy_wheel?.alloyFinish?.name || ''}`
            .trim()
            .replace(/\s+/g, ' ');
        } else if (item.product_category === 'SERVICE' && item.service) {
          // Service format: ServiceName (ServiceType - EstimatedTime)
          const serviceType = item.service?.serviceType || '';
          const estimatedTime = item.service?.estimatedTime
            ? `(${item.service.estimatedTime})`
            : '';
          productLabel = `${
            item.service?.serviceName ||
            item.service?.serviceShortName ||
            'Service'
          } ${serviceType} ${estimatedTime}`
            .trim()
            .replace(/\s+/g, ' ');
        } else {
          productLabel = item.name || 'Unknown Product';
        }

        return { label: productLabel, value: item._id };
      });
      setDropdownOptions({ ...dropdownOptions, product: newData });
    }
  }, [product]);
  const loadOptions = async (inputValue, callback, field) => {
    // if (field == "parent_category") {
    //   await setCategorySearchField("name");
    //   await setCategorySearchValue(inputValue);
    //   callback(dropdownOptions.parent_category);
    // }
  };

  return [dropdownOptions, loadOptions];
};
