import { Field, FieldArray, Form, Formik, ErrorMessage } from 'formik';

import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import AsyncSelect from 'react-select/async';
import generateFields from '../../domain/generateFields';
import generateRequired from '../../domain/generateRequired';
import FindCustomerComponent from './FindCustomerComponent';
import api from '../../domain/api';
import { useSelectAllService } from '../../shared/hooks/UseService';
import { useSelectAllPart } from '../../shared/hooks/UsePart';
import { useSelectAllProduct } from '../../shared/hooks/UseProduct';
import { useSelectAllTechnician } from '../../shared/hooks/UseTechnician';
function JobCardForm({
  data,
  edit,
  submitForm,
  setFeaturedImage,
  setGallery,
  inputFields,

  dropdown_options,
  loadOptions,
  initialValues: propsInitialValues,
}) {
  // DEBUG: Log raw data passed to form - FOCUSED ON services_used
  if (edit && data) {
    console.log('=== RAW DATA PASSED TO FORM (EDIT MODE) ===');
    console.log('services_used array:', data.services_used);
    if (data.services_used && data.services_used.length > 0) {
      console.log('First service object:', data.services_used[0]);
      console.log(
        'First service_id TYPE:',
        typeof data.services_used[0]?.service_id
      );
      console.log('First service_id VALUE:', data.services_used[0]?.service_id);
      console.log(
        'First service_id STRINGIFIED:',
        JSON.stringify(data.services_used[0]?.service_id, null, 2)
      );

      // Check if it's an object
      if (
        typeof data.services_used[0]?.service_id === 'object' &&
        data.services_used[0]?.service_id !== null
      ) {
        console.log('service_id._id:', data.services_used[0]?.service_id._id);
        console.log('service_id.id:', data.services_used[0]?.service_id.id);
      }
    }
    console.log('products_used array:', data.products_used);
    if (data.products_used && data.products_used.length > 0) {
      console.log(
        'First product_id TYPE:',
        typeof data.products_used[0]?.product_id
      );
      console.log('First product_id VALUE:', data.products_used[0]?.product_id);
    }
    console.log('==============================================');
  }

  let history = useHistory();

  // Helper function to extract clean string ID from various formats
  const extractCleanId = (id) => {
    if (!id) return null;

    // If it's already a simple string, clean and return
    if (typeof id === 'string') {
      // Remove quotes if present
      let cleanId = id.replace(/^["']|["']$/g, '').trim();

      // Check if it's a stringified JSON object
      if (cleanId.startsWith('{') || cleanId.startsWith('[')) {
        try {
          const parsed = JSON.parse(cleanId);
          return extractCleanId(parsed); // Recursive call
        } catch (e) {
          // Not valid JSON, return as is
          return cleanId;
        }
      }

      return cleanId;
    }

    // If it's an object, try to extract _id or id
    if (typeof id === 'object' && id !== null) {
      const extractedId = id._id || id.id;
      if (extractedId) {
        return extractCleanId(extractedId); // Recursive call to handle nested objects
      }
    }

    return null;
  };

  // Default values for AddJobCard (when not editing)
  const defaultInitialValues = {
    customer: '',
    vendor: '',
    job_card_number: '',
    vehicle: '',
    service_type: data && edit ? data.service_type : 'Maintenance',

    service_date:
      data && edit
        ? data.service_date
          ? new Date(data.service_date).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
    service_status: data && edit ? data.service_status : 'Pending',
    service_notes: data && edit ? data.service_notes : '',
    service_technician:
      data && edit
        ? data.service_technician
          ? data.service_technician?._id
          : null
        : '',
    services_used:
      data && edit
        ? data.services_used?.length > 0
          ? data.services_used?.map((item, index) => {
              const cleanServiceId = extractCleanId(item?.service_id);
              console.log('item', item?.service_id?._id);

              return {
                service_id: item?.service_id?._id || 'other',
                service_name: item?.service_name || '',
                service_cost: item?.service_cost || 0,
                service_quantity: item?.service_quantity || 1,
                service_tax: item?.service_tax || 0,
                service_discount: item?.service_discount || 0,
                service_discount_type: item?.service_discount_type || 'FLAT',
                tax_type: item?.tax_type || 'INTRASTATE',
                service_total_cost: item?.service_total_cost || 0,
              };
            })
          : []
        : [],
    products_used:
      data && edit
        ? data.products_used?.map((item) => {
            const cleanProductId = extractCleanId(item?.product_id);
            return {
              product_id: cleanProductId || '',
              product_category: item?.product_category || 'TYRE',
              product_name: item?.product_name || '',
              product_cost: item?.product_cost || 0,
              product_quantity: item?.product_quantity || 1,
              product_tax: item?.product_tax || 0,
              product_discount: item?.product_discount || 0,
              product_discount_type: item?.product_discount_type || 'FLAT',
              tax_type: item?.tax_type || 'INTRASTATE',
              product_total_cost: item?.product_total_cost || 0,
            };
          }) || []
        : [],
    service_parts_used: data && edit ? data.service_parts_used : [],
    service_labor_cost: data && edit ? data.service_labor_cost : 0,
    service_total_cost: data && edit ? data.service_total_cost : 0,
    service_payment_status:
      data && edit ? data.service_payment_status : 'Unpaid',
    service_payment_method: data && edit ? data.service_payment_method : '',
    service_payment_date: data && edit ? data.service_payment_date : null,
    service_images: data && edit ? data.service_images : [],
    service_documents: data && edit ? data.service_documents : [],
    // New Zoho form fields

    form_type: data && edit ? data.form_type : [],
    odometer_reading: data && edit ? data.odometer_reading : 0,
    next_service_due_odometer_reading:
      data && edit ? data.next_service_due_odometer_reading : 5000,

    brake_pad_status: data && edit ? data.brake_pad_status : 1,

    check_list: data && edit ? data.check_list : [],
    terms_and_conditions_accepted:
      data && edit ? data.terms_and_conditions_accepted : false,

    // Draft/Active status
    status: 'draft', // 'draft' or 'active'
  };

  // Use prop values if provided (EditJobCard), else use defaults (AddJobCard)
  let initialValues = propsInitialValues || defaultInitialValues;

  // IMPORTANT: Clean up service_id and product_id in initialValues if they're objects
  if (initialValues && initialValues.services_used) {
    initialValues = {
      ...initialValues,
      services_used: initialValues.services_used.map((service) => {
        const cleanServiceId = extractCleanId(service.service_id);
        return {
          ...service,
          service_id: cleanServiceId || 'other',
        };
      }),
    };
  }

  if (initialValues && initialValues.products_used) {
    initialValues = {
      ...initialValues,
      products_used: initialValues.products_used.map((product) => {
        const cleanProductId = extractCleanId(product.product_id);
        return {
          ...product,
          product_id: cleanProductId || '',
        };
      }),
    };
  }

  const validationSchema = Yup.object({
    // Customer and Vehicle Validation
    customer: Yup.string().required('Customer selection is required'),
    vendor: Yup.string().required('Vendor selection is required'),
    vehicle: Yup.string().required('Vehicle selection is required'),

    // Service Basic Information
    service_type: Yup.string()
      .oneOf(['Maintenance', 'Repair', 'Inspection'], 'Invalid service type')
      .required('Service type is required'),

    service_date: Yup.date()
      .min(
        new Date(new Date().setHours(0, 0, 0, 0)),
        'Service date cannot be in the past'
      )
      .required('Service date is required'),
    service_status: Yup.string()
      .oneOf(['Pending', 'In Progress', 'Completed'], 'Invalid service status')
      .required('Service status is required'),
    service_notes: Yup.string().max(
      1000,
      'Service notes cannot exceed 1000 characters'
    ),
    service_technician: Yup.string().required('Service technician is required'),

    // Financial Validation
    service_labor_cost: Yup.number()
      .typeError('Service labor cost must be a number')
      .min(0, 'Service labor cost must be positive')
      .max(100000, 'Service labor cost seems too high (max: ₹1,00,000)')
      .required('Service labor cost is required'),
    service_total_cost: Yup.number()
      .typeError('Service total cost must be a number')
      .min(0, 'Service total cost must be positive'),

    // Payment Information
    service_payment_status: Yup.string()
      .oneOf(['Paid', 'Unpaid'], 'Invalid payment status')
      .required('Payment status is required'),
    service_payment_method: Yup.string().when('service_payment_status', {
      is: 'Paid',
      then: Yup.string()
        .oneOf(
          ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'UPI'],
          'Invalid payment method'
        )
        .required('Payment method is required when payment status is Paid'),
      otherwise: Yup.string().oneOf(
        ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'UPI'],
        'Invalid payment method'
      ),
    }),
    service_payment_date: Yup.date().when('service_payment_status', {
      is: 'Paid',
      then: Yup.date()
        .min(
          new Date(new Date().setHours(0, 0, 0, 0)),
          'Payment date cannot be in the past'
        )
        .required('Payment date is required when payment status is Paid'),
      otherwise: Yup.date().min(
        new Date(new Date().setHours(0, 0, 0, 0)),
        'Payment date cannot be in the past'
      ),
    }),

    // Rating and Feedback - Optional fields
    // service_rating: Yup.number()
    //   .min(1, 'Rating must be between 1-5')
    //   .max(5, 'Rating must be between 1-5'),
    // service_feedback: Yup.string().max(
    //   1000,
    //   'Feedback cannot exceed 1000 characters'
    // ),

    form_type: Yup.array()
      .of(
        Yup.string().oneOf(
          ['CLMRKC', 'CLMTELI', 'WORKC', 'WOTELI', 'SSRkc', 'SSTeli', 'Lead'],
          'Invalid form type'
        )
      )
      .min(1, 'At least one form type must be selected')
      .required('Form type is required'),

    odometer_reading: Yup.number()
      .typeError('Odometer reading must be a number')
      .min(0, 'Odometer reading must be positive')
      .max(9999999, 'Odometer reading seems too high (max: 9,999,999 km)')
      .integer('Odometer reading must be a whole number')
      .required('Odometer reading is required'),

    next_service_due_odometer_reading: Yup.number()
      .typeError('Next service odometer reading must be a number')
      .min(0, 'Next service odometer reading must be positive')
      .max(9999999, 'Next service odometer reading seems too high')
      .integer('Next service odometer reading must be a whole number')
      .test(
        'greater-than-current',
        'Next service odometer reading should be greater than current reading',
        function (value) {
          const currentReading = this.parent.odometer_reading;
          if (!value || !currentReading) return true;
          return value > currentReading;
        }
      ),

    brake_pad_status: Yup.number()
      .typeError('Brake pad status must be a number')
      .oneOf([1, 2, 3, 4, 5], 'Brake pad status must be between 1-5')
      .required('Brake pad status is required'),

    check_list: Yup.array()
      .of(Yup.string())
      .min(1, 'At least one checklist item must be selected')
      .required('Checklist is required'),

    terms_and_conditions_accepted: Yup.boolean()
      .oneOf([true], 'Terms and conditions must be accepted')
      .required('Terms and conditions must be accepted'),

    // Dynamic array validations for services, products, and parts
    services_used: Yup.array().of(
      Yup.object({
        service_id: Yup.string().required('Service selection is required'),
        service_name: Yup.string().when('service_id', {
          is: 'other',
          then: Yup.string()
            .required(
              'Service name is required when "Other Service" is selected'
            )
            .min(3, 'Service name must be at least 3 characters'),
          otherwise: Yup.string(),
        }),
        service_cost: Yup.number()
          .typeError('Service cost must be a number')
          .min(0, 'Service cost must be positive')
          .max(50000, 'Service cost seems too high')
          .required('Service cost is required'),
        service_quantity: Yup.number()
          .typeError('Service quantity must be a number')
          .min(1, 'Service quantity must be at least 1')
          .max(100, 'Service quantity seems too high')
          .integer('Service quantity must be a whole number')
          .required('Service quantity is required'),
        service_tax: Yup.number()
          .typeError('Service tax must be a number')
          .min(0, 'Service tax must be positive')
          .max(100, 'Service tax cannot exceed 100%'),
        service_discount: Yup.number()
          .typeError('Service discount must be a number')
          .min(0, 'Service discount must be positive'),
        service_discount_type: Yup.string().oneOf(
          ['FLAT', 'PERCENTAGE'],
          'Invalid discount type'
        ),
      })
    ),

    products_used: Yup.array().of(
      Yup.object({
        product_id: Yup.string().required('Product selection is required'),
        product_name: Yup.string().required('Product name is required'),
        product_cost: Yup.number()
          .typeError('Product cost must be a number')
          .min(0, 'Product cost must be positive')
          .max(100000, 'Product cost seems too high')
          .required('Product cost is required'),
        product_quantity: Yup.number()
          .typeError('Product quantity must be a number')
          .min(1, 'Product quantity must be at least 1')
          .max(100, 'Product quantity seems too high')
          .integer('Product quantity must be a whole number')
          .required('Product quantity is required'),
        product_tax: Yup.number()
          .typeError('Product tax must be a number')
          .min(0, 'Product tax must be positive')
          .max(100, 'Product tax cannot exceed 100%'),
        product_discount: Yup.number()
          .typeError('Product discount must be a number')
          .min(0, 'Product discount must be positive'),
        product_discount_type: Yup.string().oneOf(
          ['FLAT', 'PERCENTAGE'],
          'Invalid discount type'
        ),
      })
    ),

    service_parts_used: Yup.array().of(
      Yup.object({
        part_id: Yup.string().required('Part selection is required'),
        part_name: Yup.string().required('Part name is required'),
        part_cost: Yup.number()
          .typeError('Part cost must be a number')
          .min(0, 'Part cost must be positive')
          .max(50000, 'Part cost seems too high')
          .required('Part cost is required'),
        part_quantity: Yup.number()
          .typeError('Part quantity must be a number')
          .min(1, 'Part quantity must be at least 1')
          .max(100, 'Part quantity seems too high')
          .integer('Part quantity must be a whole number')
          .required('Part quantity is required'),
        part_tax: Yup.number()
          .typeError('Part tax must be a number')
          .min(0, 'Part tax must be positive')
          .max(100, 'Part tax cannot exceed 100%'),
        part_discount: Yup.number()
          .typeError('Part discount must be a number')
          .min(0, 'Part discount must be positive'),
        part_discount_type: Yup.string().oneOf(
          ['FLAT', 'PERCENTAGE'],
          'Invalid discount type'
        ),
      })
    ),
  });

  // Minimal validation schema for drafts
  const draftValidationSchema = Yup.object({
    // Only basic validations for drafts - just to ensure data types are correct
    // Allow empty strings and null values for most fields in draft mode
    customer: Yup.string(), // No required validation in draft
    vendor: Yup.string(), // No required validation in draft
    vehicle: Yup.string(), // No required validation in draft
    service_type: Yup.string(),
    service_date: Yup.date().nullable(),
    service_status: Yup.string(),
    service_technician: Yup.string(),
    service_labor_cost: Yup.number()
      .typeError('Service labor cost must be a number')
      .min(0, 'Service labor cost must be positive')
      .nullable(),
    service_total_cost: Yup.number()
      .typeError('Service total cost must be a number')
      .min(0, 'Service total cost must be positive')
      .nullable(),
    service_payment_status: Yup.string(),
    service_payment_method: Yup.string(),
    service_payment_date: Yup.date().nullable(),
    form_type: Yup.array(),
    odometer_reading: Yup.number()
      .typeError('Odometer reading must be a number')
      .min(0, 'Odometer reading must be positive')
      .nullable(),
    next_service_due_odometer_reading: Yup.number()
      .typeError('Next service odometer reading must be a number')
      .min(0, 'Next service odometer reading must be positive')
      .nullable(),
    brake_pad_status: Yup.number()
      .typeError('Brake pad status must be a number')
      .oneOf(
        [1, 2, 3, 4, 5, ''],
        'Brake pad status must be between 1-5 or empty'
      )
      .nullable(),
    check_list: Yup.array(),
    terms_and_conditions_accepted: Yup.boolean(),
    // Arrays for services, products, and parts - no validation in draft
    services_used: Yup.array(),
    products_used: Yup.array(),
    service_parts_used: Yup.array(),
  });

  const [requiredCheck, setRequiredCheck] = useState({});
  const [customData, setCustomData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);

  // Ref to track if component is mounted to prevent state updates on unmounted components
  const isMountedRef = useRef(true);

  // Ref to store Formik's setFieldValue function
  const setFieldValueRef = useRef(null);

  // Cleanup function to prevent memory leaks
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Check if we're in draft mode based on initial values or data
  const isInitiallyDraft =
    customData?.status === 'draft' || data?.status === 'draft' || !edit;

  useEffect(() => {
    const newData = generateRequired({ inputFields });
    if (isMountedRef.current) {
      setRequiredCheck(newData);
    }
  }, []);
  useEffect(() => {
    if (data) {
      // In edit mode, use the data directly with minimal processing
      if (edit && data) {
        // For edit mode, we'll use the data directly instead of relying on generateFields
        // since inputFields only defines job_card_number
        const enhancedData = {
          ...data, // Include all data fields directly
          customer: data.customer?._id || data.customer || '',
          vehicle: data.vehicle?._id || data.vehicle || '',
          vendor: data.vendor?._id || data.vendor || '',
          // Ensure arrays are properly handled with all necessary fields

          services_used:
            data.services_used?.map((item) => ({
              service_id:
                typeof item?.service_id === 'object' &&
                item?.service_id !== null
                  ? item.service_id._id
                  : item?.service_id === null || !item?.service_id
                  ? 'other'
                  : item?.service_id,
              service_name: item?.service_name || '',
              service_cost: item?.service_cost || 0,
              service_quantity: item?.service_quantity || 1,
              service_tax: item?.service_tax || 0,
              service_discount: item?.service_discount || 0,
              service_discount_type: item?.service_discount_type || 'FLAT',
              tax_type: item?.tax_type || 'INTRASTATE',
              service_total_cost: item?.service_total_cost || 0,
            })) || [],
          products_used:
            data.products_used?.map((item) => ({
              product_id:
                typeof item?.product_id === 'object' &&
                item?.product_id !== null
                  ? item.product_id._id
                  : item?.product_id || '',
              product_category: item?.product_category || 'TYRE',
              product_name: item?.product_name || '',
              product_cost: item?.product_cost || 0,
              product_quantity: item?.product_quantity || 1,
              product_tax: item?.product_tax || 0,
              product_discount: item?.product_discount || 0,
              product_discount_type: item?.product_discount_type || 'FLAT',
              tax_type: item?.tax_type || 'INTRASTATE',
              product_total_cost: item?.product_total_cost || 0,
            })) || [],
          service_parts_used: data.service_parts_used || [],
          service_images: data.service_images || [],
          service_documents: data.service_documents || [],
          form_type: data.form_type || [],
          check_list: data.check_list || [],
          // Handle service_technician properly - it might be an object
          service_technician:
            data.service_technician?._id || data.service_technician || '',
          // Handle dates properly for form inputs
          service_date: data.service_date
            ? new Date(data.service_date).toISOString().split('T')[0]
            : '',
          service_payment_date: data.service_payment_date
            ? new Date(data.service_payment_date).toISOString().split('T')[0]
            : '',
        };

        if (isMountedRef.current) {
          setCustomData(enhancedData);

          // Set selected customer if it exists
          if (data.customer) {
            setSelectedCustomer(data.customer);
          }

          // Set selected vehicle if it exists
          if (data.vehicle) {
            setSelectedVehicle(data.vehicle);
          }

          // Set selected vendor if it exists
          if (data.vendor) {
            setSelectedVendor(data.vendor);
          }
        }
      } else {
        // For non-edit mode, use generateFields
        const newData = generateFields({
          inputFields: inputFields,
          data: data,
        });
        if (isMountedRef.current) {
          setCustomData(newData);
        }
      }
    }
  }, [data, edit]);

  // Update selected vendor when dropdown options are loaded and we have a vendor ID
  useEffect(() => {
    if (edit && data && dropdown_options?.vendors && customData?.vendor) {
      const vendorObject = dropdown_options.vendors.find(
        (v) => v._id === customData.vendor
      );
      if (vendorObject && !selectedVendor && isMountedRef.current) {
        setSelectedVendor(vendorObject);
      }
    }
  }, [dropdown_options, customData, edit, data, selectedVendor]);

  // Fetch products for dropdown
  const [productsData] = useSelectAllProduct();
  const [vendorProducts, setVendorProducts] = useState([]);
  const [vendorTyres, setVendorTyres] = useState([]);
  const [vendorAlloyWheels, setVendorAlloyWheels] = useState([]);

  const products = productsData?.all_products || [];

  // Fetch services for dropdown
  const [servicesData] = useSelectAllService();
  const [vendorServices, setVendorServices] = useState([]);
  const services = servicesData?.all_services || [];

  // Fetch parts for dropdown
  const [partsData] = useSelectAllPart();
  const parts = partsData?.all_parts || [];

  // Fetch technicians for dropdown
  const [techniciansData] = useSelectAllTechnician();
  const technicians = techniciansData?.all_technicians || [];

  // Helper function to format product labels matching UseProduct.js
  const formatProductLabel = (product, category) => {
    if (category === 'TYRE' && product.tyre) {
      const t = product.tyre;
      return `${t.productBrand?.name || ''} ${t.tyreWidth?.name || ''}${
        t.tyreWidthType === 'IN MM' ? `/${t.aspectRatio?.name || ''}` : ''
      }${t.construction || ''}${t.rimDiameter?.name || ''} ${
        t.plyRating?.name || ''
      } ${t.loadIndex?.name || ''} ${t.speedSymbol?.name || ''} ${
        t.productThreadPattern?.name || ''
      } ${t.unit || ''}`.trim();
    } else if (category === 'ALLOY_WHEEL' && product.alloy_wheel) {
      const a = product.alloy_wheel;

      // Check if alloy_wheel is just an ID string (not populated)
      if (typeof a === 'string') {
        console.log(
          'Alloy wheel not populated, using product name:',
          product.product_name
        );
        // Alloy wheel reference is not populated, use product_name
        return (
          product.product_name || `Alloy Wheel (ID: ${a.substring(0, 8)}...)`
        );
      }

      // Alloy wheel is populated as an object
      console.log('Full Alloy Wheel Product:', product);
      console.log('Alloy Wheel Data (populated):', a);

      // Handle both object with name property and direct string values
      const brandName =
        typeof a.alloyBrand === 'string'
          ? a.alloyBrand
          : a.alloyBrand?.name || 'Unknown Brand';
      const diameter =
        typeof a.alloyDiameterInches === 'string'
          ? a.alloyDiameterInches
          : a.alloyDiameterInches?.name || '';
      const width =
        typeof a.alloyWidth === 'string'
          ? a.alloyWidth
          : a.alloyWidth?.name || '';
      const finish =
        typeof a.alloyFinish === 'string'
          ? a.alloyFinish
          : a.alloyFinish?.name || '';

      const label = `${brandName} ${diameter}X${width} ${finish}`.trim();
      console.log('Formatted Alloy Label:', label);
      return label;
    } else if (category === 'ALLOY_WHEEL') {
      console.log('Alloy wheel product but no alloy_wheel data:', product);
      return (
        product.product_name || `Alloy Wheel - ${product._id || 'No Name'}`
      );
    }
    return 'Unnamed Product';
  };

  const handleSelectCustomer = (customer, vehicle) => {
    console.log('Selected Customer:', customer);
    console.log('Selected Vehicle:', vehicle);
    if (isMountedRef.current) {
      setSelectedCustomer(customer);
      setSelectedVehicle(vehicle);
      setShowModal(false);

      // Update Formik values
      if (setFieldValueRef.current) {
        setFieldValueRef.current('customer', customer?._id || '');
        setFieldValueRef.current(
          'vehicle',
          vehicle?._id || vehicle?.vehicle_number || ''
        );
      }
    }
  };

  // Auto-populate customer and vehicle when editing an existing job card
  useEffect(() => {
    if (data && data.customer && data.vehicle && edit) {
      // For editing: data contains populated references from EditJobCard component
      setSelectedCustomer(data.customer);
      setSelectedVehicle(data.vehicle);
      if (data.vendor) {
        setSelectedVendor(data.vendor);
      }

      // Update Formik values for editing
      if (setFieldValueRef.current) {
        setFieldValueRef.current('customer', data.customer?._id || '');
        setFieldValueRef.current('vehicle', data.vehicle?._id || '');
      }
    }
  }, [data, edit]);

  // Filter products and services when vendor is selected
  // Fetch products with search functionality
  const fetchProductsWithSearch = async (
    searchTerm = '',
    productCategory = ''
  ) => {
    if (!selectedVendor || !selectedVendor._id) return [];

    try {
      let url = `/products/all?vendor=${selectedVendor._id}`;

      // Add search parameters if provided
      if (searchTerm) {
        url += `&term=product_name&value=${encodeURIComponent(searchTerm)}`;
      }

      const response = await api.get(url);
      // API returns array directly
      const productsData = Array.isArray(response.data) ? response.data : [];

      console.log('Fetched products:', productsData.length);

      // Filter by product category if specified
      if (productCategory) {
        return productsData.filter(
          (p) => p.product_category === productCategory
        );
      }

      return productsData;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };

  // Fetch services with search functionality (from products API)
  const fetchServicesWithSearch = async (searchTerm = '') => {
    if (!selectedVendor || !selectedVendor._id) return [];

    try {
      let url = `/products/all?vendor=${selectedVendor._id}`;

      // Add search parameters if provided
      if (searchTerm) {
        url += `&term=product_name&value=${encodeURIComponent(searchTerm)}`;
      }

      const response = await api.get(url);
      const productsData = Array.isArray(response.data) ? response.data : [];

      // Filter only SERVICE category products
      const servicesList = productsData.filter(
        (p) => p.product_category === 'SERVICE'
      );

      console.log('Fetched services:', servicesList.length);

      return servicesList;
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  };

  useEffect(() => {
    if (selectedVendor && selectedVendor._id) {
      // Filter products by vendor
      const fetchVendorProducts = async () => {
        try {
          const productsData = await fetchProductsWithSearch();

          console.log('Vendor Products Response:', productsData);

          // Separate tyres, alloy wheels, and services
          const tyres = productsData.filter(
            (p) => p.product_category === 'TYRE'
          );
          const alloyWheels = productsData.filter(
            (p) => p.product_category === 'ALLOY_WHEEL'
          );
          const productServices = productsData.filter(
            (p) => p.product_category === 'SERVICE'
          );

          console.log('Filtered Tyres:', tyres.length);
          console.log('Filtered Alloy Wheels:', alloyWheels.length);
          console.log('Filtered Services:', productServices.length);
          console.log('Sample Alloy Wheel:', alloyWheels[0]);

          setVendorProducts(productsData);
          setVendorTyres(tyres);
          setVendorAlloyWheels(alloyWheels);
          setVendorServices(productServices);
        } catch (error) {
          console.error('Error fetching vendor products:', error);
          setVendorProducts([]);
          setVendorTyres([]);
          setVendorAlloyWheels([]);
        }
      };

      fetchVendorProducts();
    } else {
      // Reset vendor-specific data when no vendor is selected
      setVendorProducts([]);
      setVendorTyres([]);
      setVendorAlloyWheels([]);
      setVendorServices([]);
    }
  }, [selectedVendor?._id]);

  const calculateTotalCost = (values) => {
    // Defensive checks: handle undefined or non-array values
    const partsTotal = (values.service_parts_used || []).reduce((acc, part) => {
      const partTotal =
        part.part_cost * part.part_quantity +
        (part.part_cost * part.part_quantity * part.part_tax) / 100 -
        part.part_discount;
      return acc + partTotal;
    }, 0);

    const productsTotal = (values.products_used || []).reduce(
      (acc, product) => {
        const productTotal =
          product.product_cost * product.product_quantity +
          (product.product_cost *
            product.product_quantity *
            product.product_tax) /
            100 -
          product.product_discount;
        return acc + productTotal;
      },
      0
    );

    const servicesTotal = (values.services_used || []).reduce(
      (acc, service) => {
        const serviceTotal =
          service.service_cost * service.service_quantity +
          (service.service_cost *
            service.service_quantity *
            service.service_tax) /
            100 -
          service.service_discount;
        return acc + serviceTotal;
      },
      0
    );

    const serviceTotalCost =
      partsTotal + productsTotal + servicesTotal + values.service_labor_cost;
    return serviceTotalCost;
  };

  const calculateIndividualTotals = (values) => {
    // Calculate individual totals for each item
    const updatedValues = { ...values };

    // Update parts with individual totals (defensive check for undefined arrays)
    updatedValues.service_parts_used = (values.service_parts_used || []).map(
      (part) => ({
        ...part,
        part_total_cost:
          part.part_cost * part.part_quantity +
          (part.part_cost * part.part_quantity * part.part_tax) / 100 -
          part.part_discount,
      })
    );

    // Update products with individual totals (defensive check for undefined arrays)
    updatedValues.products_used = (values.products_used || []).map(
      (product) => ({
        ...product,
        product_total_cost:
          product.product_cost * product.product_quantity +
          (product.product_cost *
            product.product_quantity *
            product.product_tax) /
            100 -
          product.product_discount,
      })
    );

    // Update services with individual totals (defensive check for undefined arrays)
    updatedValues.services_used = (values.services_used || []).map(
      (service) => ({
        ...service,
        service_total_cost:
          service.service_cost * service.service_quantity +
          (service.service_cost *
            service.service_quantity *
            service.service_tax) /
            100 -
          service.service_discount,
      })
    );

    return updatedValues;
  };

  console.log('initialValues', initialValues);

  return (
    <div className='card-body p-4 bg-light' style={{ minHeight: '100vh' }}>
      <div className='row justify-content-center'>
        <div className='col-12 col-lg-12'>
          {initialValues && (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                const serviceTotalCost = calculateTotalCost(values);
                const updatedValues = calculateIndividualTotals(values);

                console.log('=== BEFORE CLEANING (onSubmit) ===');
                console.log(
                  'updatedValues.services_used[0]:',
                  updatedValues.services_used?.[0]
                );
                console.log(
                  'service_id type:',
                  typeof updatedValues.services_used?.[0]?.service_id
                );
                console.log(
                  'service_id value:',
                  updatedValues.services_used?.[0]?.service_id
                );

                // Clean up services_used to ensure service_id is a string
                const cleanedServices =
                  updatedValues.services_used?.map((service, index) => {
                    let serviceId = extractCleanId(service.service_id);

                    // DEBUG: Log first service cleaning
                    if (index === 0) {
                      console.log('=== CLEANING SERVICE ===');
                      console.log('Original:', service.service_id);
                      console.log('After extractCleanId:', serviceId);
                      console.log('Type:', typeof serviceId);
                    }

                    // Handle 'other' case
                    if (serviceId === 'other') {
                      serviceId = null;
                    }

                    // Ensure empty strings become null
                    if (serviceId === '') {
                      serviceId = null;
                    }

                    return {
                      ...service,
                      service_id: serviceId,
                    };
                  }) || [];

                console.log('=== AFTER CLEANING ===');
                console.log('cleanedServices[0]:', cleanedServices[0]);
                console.log(
                  'cleanedServices[0].service_id:',
                  cleanedServices[0]?.service_id
                );
                console.log('Type:', typeof cleanedServices[0]?.service_id);

                // Clean up products_used to ensure product_id is a string
                const cleanedProducts =
                  updatedValues.products_used?.map((product) => {
                    const productId = extractCleanId(product.product_id);

                    return {
                      ...product,
                      product_id: productId || '',
                    };
                  }) || [];

                await submitForm({
                  ...updatedValues,
                  services_used: cleanedServices,
                  products_used: cleanedProducts,
                  customer: selectedCustomer?._id,
                  vehicle: selectedVehicle?._id,
                  vendor: selectedVendor?._id || values.vendor,
                  service_total_cost: serviceTotalCost,
                });
                setSubmitting(false);
                resetForm(true);
              }}
              enableReinitialize={true}
            >
              {({
                values,
                isSubmitting,
                errors,
                setFieldValue,
                submitForm,
              }) => {
                console.log('values', values);

                // Store setFieldValue in ref so handleSelectCustomer can use it
                setFieldValueRef.current = setFieldValue;

                const serviceTotalCost = calculateTotalCost(values);

                const handleSaveAsDraft = async () => {
                  if (isMountedRef.current) {
                    setIsDraft(true);
                    // Update the form status to draft before submitting
                    setFieldValue('status', 'draft');
                    // Trigger a manual validation with draft schema
                    try {
                      await submitForm();
                    } catch (error) {
                      console.error('Draft save error:', error);
                    } finally {
                      if (isMountedRef.current) {
                        setIsDraft(false);
                      }
                    }
                  }
                };

                const handleActivate = async () => {
                  if (isMountedRef.current) {
                    setIsDraft(false);
                    // Update the form status to active before submitting
                    setFieldValue('status', 'active');
                    // Trigger a manual validation with full schema
                    try {
                      await submitForm();
                    } catch (error) {
                      console.error('Activation error:', error);
                    }
                  }
                };

                return (
                  <Form className='p-4 bg-white rounded shadow-sm w-100'>
                    <div className='mb-4 d-flex justify-content-between align-items-center'>
                      <div className='d-flex align-items-center gap-3'>
                        <h3 className='mb-0 fw-bold'>Create/Edit Job Card</h3>
                        {values.status === 'draft' && (
                          <span className='badge bg-warning text-dark fs-6 px-3 py-2'>
                            <i className='fas fa-edit me-1'></i>DRAFT
                          </span>
                        )}
                        {values.status === 'active' && (
                          <span className='badge bg-success fs-6 px-3 py-2'>
                            <i className='fas fa-check-circle me-1'></i>ACTIVE
                          </span>
                        )}
                      </div>
                      <button
                        className='btn btn-primary px-4 py-2'
                        type='button'
                        onClick={() => setShowModal(true)}
                      >
                        Find Customer
                      </button>
                      <FindCustomerComponent
                        show={showModal}
                        handleClose={() => setShowModal(false)}
                        onSelectCustomer={handleSelectCustomer}
                      />
                    </div>

                    {/* Validation Errors Summary */}
                    {Object.keys(errors).length > 0 &&
                      values.status !== 'draft' && (
                        <div className='alert alert-danger mb-4'>
                          <h6 className='mb-2'>
                            Please fix the following errors:
                          </h6>
                          <ul className='mb-0'>
                            {Object.entries(errors).map(([field, error]) => {
                              // Handle nested array errors (e.g., services_used, products_used)
                              if (
                                typeof error === 'object' &&
                                error !== null &&
                                !Array.isArray(error)
                              ) {
                                return Object.entries(error).map(
                                  ([index, itemErrors]) => {
                                    if (
                                      typeof itemErrors === 'object' &&
                                      itemErrors !== null
                                    ) {
                                      return Object.entries(itemErrors).map(
                                        ([itemField, itemError]) => (
                                          <li
                                            key={`${field}.${index}.${itemField}`}
                                          >
                                            <strong>
                                              {field
                                                .replace(/_/g, ' ')
                                                .toUpperCase()}{' '}
                                              #{parseInt(index) + 1} -{' '}
                                              {itemField
                                                .replace(/_/g, ' ')
                                                .toUpperCase()}
                                              :
                                            </strong>{' '}
                                            {typeof itemError === 'string'
                                              ? itemError
                                              : 'Invalid data'}
                                          </li>
                                        )
                                      );
                                    }
                                    return null;
                                  }
                                );
                              }
                              // Handle simple string errors
                              return (
                                <li key={field}>
                                  <strong>
                                    {field.replace(/_/g, ' ').toUpperCase()}:
                                  </strong>{' '}
                                  {typeof error === 'string'
                                    ? error
                                    : 'Invalid data'}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}

                    {/* Draft Mode Info - Only show if there are actual validation errors */}
                    {values.status === 'draft' &&
                      Object.keys(errors).length > 0 && (
                        <div className='alert alert-warning mb-4'>
                          <h6 className='mb-2'>
                            <i className='fas fa-exclamation-triangle me-2'></i>
                            Draft Mode - Some fields need attention:
                          </h6>
                          <small className='text-muted'>
                            These errors will need to be fixed before activating
                            the job card.
                          </small>
                          <ul className='mb-0 mt-2 small'>
                            {Object.entries(errors).map(([field, error]) => {
                              // Handle nested array errors
                              if (
                                typeof error === 'object' &&
                                error !== null &&
                                !Array.isArray(error)
                              ) {
                                return Object.entries(error).map(
                                  ([index, itemErrors]) => {
                                    if (
                                      typeof itemErrors === 'object' &&
                                      itemErrors !== null
                                    ) {
                                      return Object.entries(itemErrors).map(
                                        ([itemField, itemError]) => (
                                          <li
                                            key={`${field}.${index}.${itemField}`}
                                          >
                                            <strong>
                                              {field
                                                .replace(/_/g, ' ')
                                                .toUpperCase()}{' '}
                                              #{parseInt(index) + 1} -{' '}
                                              {itemField
                                                .replace(/_/g, ' ')
                                                .toUpperCase()}
                                              :
                                            </strong>{' '}
                                            {typeof itemError === 'string'
                                              ? itemError
                                              : 'Invalid data'}
                                          </li>
                                        )
                                      );
                                    }
                                    return null;
                                  }
                                );
                              }
                              // Handle simple string errors
                              return (
                                <li key={field}>
                                  <strong>
                                    {field.replace(/_/g, ' ').toUpperCase()}:
                                  </strong>{' '}
                                  {typeof error === 'string'
                                    ? error
                                    : 'Invalid data'}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    {selectedCustomer && selectedVehicle && (
                      <>
                        {/* Selected Customer and Vehicle Details Display */}
                        <div className='row mb-4'>
                          <div className='col-12'>
                            <div className='card bg-light border-primary'>
                              <div className='card-header bg-primary text-white py-2'>
                                <h5 className='card-title mb-0 fw-bold'>
                                  Selected Customer & Vehicle Details
                                </h5>
                              </div>
                              <div className='card-body p-3'>
                                <div className='row'>
                                  {/* Customer Details */}
                                  <div className='col-md-6'>
                                    <h6 className='text-primary fw-bold mb-2'>
                                      <i className='fas fa-user me-2'></i>
                                      Customer Information
                                    </h6>
                                    <div className='mb-2'>
                                      <strong>Name:</strong>{' '}
                                      <span className='text-dark'>
                                        {selectedCustomer?.name || 'N/A'}
                                      </span>
                                    </div>
                                    <div className='mb-2'>
                                      <strong>Email:</strong>{' '}
                                      <span className='text-dark'>
                                        {selectedCustomer?.email || 'N/A'}
                                      </span>
                                    </div>
                                    <div className='mb-2'>
                                      <strong>Phone:</strong>{' '}
                                      <span className='text-dark'>
                                        {selectedCustomer?.phone ||
                                          selectedCustomer?.mobile ||
                                          'N/A'}
                                      </span>
                                    </div>
                                    <div className='mb-2'>
                                      <strong>Address:</strong>{' '}
                                      <span className='text-dark'>
                                        {selectedCustomer?.address?.address_1 ||
                                          'N/A'}
                                      </span>
                                    </div>
                                    {selectedCustomer?.city && (
                                      <div className='mb-2'>
                                        <strong>City:</strong>{' '}
                                        <span className='text-dark'>
                                          {selectedCustomer?.address?.[0]?.city}
                                        </span>
                                      </div>
                                    )}
                                    {selectedCustomer?.customer_id && (
                                      <div className='mb-2'>
                                        <strong>Customer ID:</strong>{' '}
                                        <span className='text-dark'>
                                          {selectedCustomer.customer_id}
                                        </span>
                                      </div>
                                    )}
                                  </div>

                                  {/* Vehicle Details */}
                                  <div className='col-md-6'>
                                    <h6 className='text-success fw-bold mb-2'>
                                      <i className='fas fa-car me-2'></i>Vehicle
                                      Information
                                    </h6>
                                    <div className='mb-2'>
                                      <strong>Make And Model:</strong>{' '}
                                      <span className='text-dark'>
                                        {selectedVehicle?.makeModelName ||
                                          selectedVehicle?.makeModel ||
                                          'N/A'}
                                      </span>
                                    </div>
                                    <div className='mb-2'>
                                      <strong>Model:</strong>{' '}
                                      <span className='text-dark'>
                                        {selectedVehicle?.model || 'N/A'}
                                      </span>
                                    </div>
                                    <div className='mb-2'>
                                      <strong>Year:</strong>{' '}
                                      <span className='text-dark'>
                                        {selectedVehicle?.year || 'N/A'}
                                      </span>
                                    </div>
                                    <div className='mb-2'>
                                      <strong>Registration No:</strong>{' '}
                                      <span className='text-dark'>
                                        {selectedVehicle?.vehicle_number ||
                                          selectedVehicle?.vehicle_number ||
                                          'N/A'}
                                      </span>
                                    </div>
                                    <div className='mb-2'>
                                      <strong>VIN:</strong>{' '}
                                      <span className='text-dark'>
                                        {selectedVehicle?.vin ||
                                          selectedVehicle?.vinNumber ||
                                          'N/A'}
                                      </span>
                                    </div>
                                    {selectedVehicle?.color && (
                                      <div className='mb-2'>
                                        <strong>Color:</strong>{' '}
                                        <span className='text-dark'>
                                          {selectedVehicle.color}
                                        </span>
                                      </div>
                                    )}
                                    {selectedVehicle?.engine_number && (
                                      <div className='mb-2'>
                                        <strong>Engine No:</strong>{' '}
                                        <span className='text-dark'>
                                          {selectedVehicle.engine_number}
                                        </span>
                                      </div>
                                    )}
                                    {selectedVehicle?.fuel_type && (
                                      <div className='mb-2'>
                                        <strong>Fuel Type:</strong>{' '}
                                        <span className='text-dark'>
                                          {selectedVehicle.fuel_type}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Action Button to Change Selection */}
                                <div className='row mt-3'>
                                  <div className='col-12 text-end'>
                                    <button
                                      type='button'
                                      className='btn btn-outline-primary btn-sm'
                                      onClick={() => setShowModal(true)}
                                    >
                                      <i className='fas fa-edit me-1'></i>
                                      Change Customer/Vehicle
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Vendor Selection */}
                        <div className='row mb-4'>
                          <div className='col-12'>
                            <div className='card border-warning bg-light'>
                              <div className='card-header bg-warning text-dark'>
                                <h6 className='mb-0 fw-bold'>
                                  <i className='fas fa-store me-2'></i>
                                  Vendor Selection
                                </h6>
                              </div>
                              <div className='card-body'>
                                <div className='row'>
                                  <div className='col-md-6'>
                                    <label className='form-label fw-bold'>
                                      Select Vendor/Service Provider *
                                    </label>
                                    <Field name='vendor'>
                                      {({ field, form }) => (
                                        <select
                                          {...field}
                                          className='form-select'
                                          onChange={(e) => {
                                            e.preventDefault(); // Prevent any default behavior
                                            field.onChange(e); // Update Formik field
                                            const vendor =
                                              dropdown_options?.vendors?.find(
                                                (v) => v._id === e.target.value
                                              );
                                            setSelectedVendor(vendor);
                                            // Manually set the field value to ensure it's updated
                                            form.setFieldValue(
                                              'vendor',
                                              e.target.value
                                            );
                                          }}
                                        >
                                          <option value=''>
                                            Select Vendor
                                          </option>
                                          {dropdown_options?.vendors?.map(
                                            (vendor) => (
                                              <option
                                                key={vendor._id}
                                                value={vendor._id}
                                              >
                                                {vendor.name} -{' '}
                                                {vendor.store_name ||
                                                  vendor.business_name ||
                                                  'N/A'}
                                              </option>
                                            )
                                          )}
                                        </select>
                                      )}
                                    </Field>
                                    <ErrorMessage
                                      name='vendor'
                                      component='div'
                                      className='text-danger mt-1 small'
                                    />
                                  </div>
                                  {selectedVendor && (
                                    <div className='col-md-6'>
                                      <div className='p-3 bg-white rounded border'>
                                        <h6 className='text-warning mb-2'>
                                          Vendor Details
                                        </h6>
                                        <div className='mb-1'>
                                          <strong>Name:</strong>{' '}
                                          {selectedVendor.name}
                                        </div>
                                        <div className='mb-1'>
                                          <strong>Store:</strong>{' '}
                                          {selectedVendor.store_name ||
                                            selectedVendor.business_name ||
                                            'N/A'}
                                        </div>
                                        <div className='mb-1'>
                                          <strong>Phone:</strong>{' '}
                                          {selectedVendor.phone ||
                                            selectedVendor.mobile ||
                                            'N/A'}
                                        </div>
                                        <div className='mb-1'>
                                          <strong>Email:</strong>{' '}
                                          {selectedVendor.email || 'N/A'}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Job Card Form Fields */}
                        <div className='row g-4'>
                          <div className='col-md-6 mb-3'>
                            <label className='form-label'>Service Type</label>
                            <Field
                              as='select'
                              name='service_type'
                              className='form-select'
                            >
                              <option value=''>Select</option>
                              <option value='Maintenance'>Maintenance</option>
                              <option value='Repair'>Repair</option>
                              <option value='Inspection'>Inspection</option>
                            </Field>
                            <ErrorMessage
                              name='service_type'
                              component='div'
                              className='text-danger mt-1 small'
                            />
                          </div>

                          <div className='col-md-6 mb-3'>
                            <label className='form-label'>Service Date</label>
                            <Field
                              name='service_date'
                              type='date'
                              className='form-control'
                              min={new Date().toISOString().split('T')[0]}
                            />
                            <ErrorMessage
                              name='service_date'
                              component='div'
                              className='text-danger mt-1 small'
                            />
                          </div>
                          <div className='col-md-6 mb-3'>
                            <label className='form-label'>Service Status</label>
                            <Field
                              as='select'
                              name='service_status'
                              className='form-select'
                            >
                              <option value='Pending'>Pending</option>
                              <option value='In Progress'>In Progress</option>
                              <option value='Completed'>Completed</option>
                            </Field>
                            <ErrorMessage
                              name='service_status'
                              component='div'
                              className='text-danger mt-1 small'
                            />
                          </div>

                          <div className='col-md-12 mb-3'>
                            <label className='form-label fw-bold fs-5 mb-3'>
                              Service Parts Used
                            </label>
                            <FieldArray name='service_parts_used'>
                              {({ push, remove, form }) => (
                                <div className='bg-white rounded p-3 shadow-sm mb-3'>
                                  {(form.values.service_parts_used || []).map(
                                    (_, index) => {
                                      const part =
                                        form.values.service_parts_used[index];
                                      // Calculate discount based on type
                                      let discount =
                                        Number(part.part_discount) || 0;
                                      let baseTotal =
                                        Number(part.part_cost) *
                                        Number(part.part_quantity);
                                      let discountAmount = 0;
                                      if (
                                        part.part_discount_type === 'PERCENTAGE'
                                      ) {
                                        discountAmount =
                                          (baseTotal * discount) / 100;
                                      } else {
                                        discountAmount = discount;
                                      }
                                      const discountedTotal =
                                        baseTotal - discountAmount;
                                      const calculatedTotalCost =
                                        discountedTotal +
                                        (discountedTotal *
                                          (Number(part.part_tax) || 0)) /
                                          100;
                                      return (
                                        <div
                                          key={index}
                                          className='mb-4 border-bottom pb-3'
                                        >
                                          <div className='row g-3 align-items-end'>
                                            <div className='col-md-3'>
                                              <label className='form-label fw-semibold mb-1'>
                                                Part Name
                                              </label>
                                              <Field
                                                as='select'
                                                name={`service_parts_used.${index}.part_id`}
                                                className='form-select border-primary shadow-sm'
                                                style={{ minHeight: '40px' }}
                                                onChange={(e) => {
                                                  const selectedPart =
                                                    parts.find(
                                                      (part) =>
                                                        part._id ===
                                                        e.target.value
                                                    );
                                                  form.setFieldValue(
                                                    `service_parts_used.${index}.part_id`,
                                                    e.target.value
                                                  );
                                                  form.setFieldValue(
                                                    `service_parts_used.${index}.part_name`,
                                                    selectedPart?.name || ''
                                                  );
                                                  if (selectedPart) {
                                                    form.setFieldValue(
                                                      `service_parts_used.${index}.part_cost`,
                                                      selectedPart.price || 0
                                                    );
                                                    form.setFieldValue(
                                                      `service_parts_used.${index}.part_tax`,
                                                      selectedPart.gst_tax_rate ||
                                                        0
                                                    );
                                                    // Robust tax type population
                                                    const taxType =
                                                      selectedPart.tax_type ||
                                                      selectedPart.gst_type ||
                                                      selectedPart.type ||
                                                      '';
                                                    form.setFieldValue(
                                                      `service_parts_used.${index}.tax_type`,
                                                      taxType
                                                    );
                                                  }
                                                }}
                                              >
                                                <option value=''>
                                                  Select Part
                                                </option>
                                                {parts.map((part) => (
                                                  <option
                                                    key={part._id}
                                                    value={part._id}
                                                  >
                                                    {part.name}
                                                  </option>
                                                ))}
                                              </Field>
                                            </div>
                                            <div className='col-md-2'>
                                              <label className='form-label fw-semibold mb-1'>
                                                Part Cost
                                              </label>
                                              <Field
                                                name={`service_parts_used.${index}.part_cost`}
                                                type='number'
                                                placeholder='Part Cost'
                                                className='form-control border-primary shadow-sm'
                                                style={{ minHeight: '40px' }}
                                              />
                                            </div>
                                            <div className='col-md-2'>
                                              <label className='form-label fw-semibold mb-1'>
                                                Quantity
                                              </label>
                                              <Field
                                                name={`service_parts_used.${index}.part_quantity`}
                                                type='number'
                                                placeholder='Quantity'
                                                className='form-control border-primary shadow-sm'
                                                style={{ minHeight: '40px' }}
                                              />
                                            </div>
                                            <div className='col-md-2'>
                                              <label className='form-label'>
                                                Tax Type
                                              </label>
                                              <Field
                                                as='select'
                                                name={`service_parts_used.${index}.tax_type`}
                                                className='form-select border-primary shadow-sm'
                                                style={{ minHeight: '40px' }}
                                              >
                                                <option value=''>
                                                  Select Tax Type
                                                </option>
                                                <option value='INTERSTATE'>
                                                  INTERSTATE
                                                </option>
                                                <option value='INTRASTATE'>
                                                  INTRASTATE
                                                </option>
                                                <option value='CGST'>
                                                  CGST
                                                </option>
                                                <option value='SGST'>
                                                  SGST
                                                </option>
                                                <option value='IGST'>
                                                  IGST
                                                </option>
                                              </Field>
                                            </div>
                                            <div className='col-md-1'>
                                              <label className='form-label'>
                                                Tax (%)
                                              </label>
                                              <Field
                                                name={`service_parts_used.${index}.part_tax`}
                                                type='number'
                                                placeholder='Tax (%)'
                                                className='form-control border-primary shadow-sm'
                                                style={{ minHeight: '40px' }}
                                              />
                                            </div>
                                            <div className='col-md-2'>
                                              <label className='form-label'>
                                                Discount
                                              </label>
                                              <div className='input-group'>
                                                <Field
                                                  name={`service_parts_used.${index}.part_discount`}
                                                  type='number'
                                                  placeholder='Discount'
                                                  className='form-control border-primary shadow-sm'
                                                  style={{ minHeight: '40px' }}
                                                />
                                                <Field
                                                  as='select'
                                                  name={`service_parts_used.${index}.part_discount_type`}
                                                  className='form-select border-primary shadow-sm'
                                                  style={{
                                                    minHeight: '40px',
                                                    maxWidth: '120px',
                                                  }}
                                                >
                                                  <option value='FLAT'>
                                                    Flat
                                                  </option>
                                                  <option value='PERCENTAGE'>
                                                    %
                                                  </option>
                                                </Field>
                                              </div>
                                            </div>
                                          </div>
                                          {/* Compact tax breakdown display */}
                                          {form.values.service_parts_used[index]
                                            .tax_type && (
                                            <div className='mt-2 px-2 py-1 rounded bg-light border d-flex flex-wrap align-items-center gap-3 small'>
                                              {(() => {
                                                const taxType =
                                                  form.values
                                                    .service_parts_used[index]
                                                    .tax_type;
                                                const taxRate =
                                                  Number(
                                                    form.values
                                                      .service_parts_used[index]
                                                      .part_tax
                                                  ) || 0;
                                                const cost =
                                                  Number(
                                                    form.values
                                                      .service_parts_used[index]
                                                      .part_cost
                                                  ) || 0;
                                                const qty =
                                                  Number(
                                                    form.values
                                                      .service_parts_used[index]
                                                      .part_quantity
                                                  ) || 1;
                                                const discount =
                                                  Number(
                                                    form.values
                                                      .service_parts_used[index]
                                                      .part_discount
                                                  ) || 0;
                                                const discountType =
                                                  form.values
                                                    .service_parts_used[index]
                                                    .part_discount_type ||
                                                  'FLAT';
                                                const baseTotal = cost * qty;
                                                let discountAmount = 0;
                                                if (
                                                  discountType === 'PERCENTAGE'
                                                ) {
                                                  discountAmount =
                                                    (baseTotal * discount) /
                                                    100;
                                                } else {
                                                  discountAmount = discount;
                                                }
                                                const discountedTotal =
                                                  baseTotal - discountAmount;
                                                let cgst = 0,
                                                  sgst = 0,
                                                  igst = 0;
                                                let taxDetails = '';
                                                if (taxType === 'INTRASTATE') {
                                                  cgst =
                                                    (discountedTotal *
                                                      (taxRate / 2)) /
                                                    100;
                                                  sgst =
                                                    (discountedTotal *
                                                      (taxRate / 2)) /
                                                    100;
                                                  taxDetails = `CGST: ₹${cgst.toFixed(
                                                    2
                                                  )} | SGST: ₹${sgst.toFixed(
                                                    2
                                                  )}`;
                                                } else if (
                                                  taxType === 'INTERSTATE' ||
                                                  taxType === 'IGST'
                                                ) {
                                                  igst =
                                                    (discountedTotal *
                                                      taxRate) /
                                                    100;
                                                  taxDetails = `IGST: ₹${igst.toFixed(
                                                    2
                                                  )}`;
                                                } else if (taxType === 'CGST') {
                                                  cgst =
                                                    (discountedTotal *
                                                      taxRate) /
                                                    100;
                                                  taxDetails = `CGST: ₹${cgst.toFixed(
                                                    2
                                                  )}`;
                                                } else if (taxType === 'SGST') {
                                                  sgst =
                                                    (discountedTotal *
                                                      taxRate) /
                                                    100;
                                                  taxDetails = `SGST: ₹${sgst.toFixed(
                                                    2
                                                  )}`;
                                                } else {
                                                  taxDetails =
                                                    'No tax breakdown.';
                                                }
                                                const totalTax =
                                                  cgst + sgst + igst;
                                                const finalTotal =
                                                  discountedTotal + totalTax;
                                                return (
                                                  <>
                                                    <span className='fw-bold text-primary'>
                                                      Base: ₹
                                                      {baseTotal.toFixed(2)}
                                                    </span>
                                                    <span className='text-success'>
                                                      Discount: ₹
                                                      {discountAmount.toFixed(
                                                        2
                                                      )}
                                                      {discountType ===
                                                      'PERCENTAGE'
                                                        ? ` (${discount}%)`
                                                        : ''}
                                                    </span>
                                                    <span className='text-warning'>
                                                      Taxable: ₹
                                                      {discountedTotal.toFixed(
                                                        2
                                                      )}
                                                    </span>
                                                    <span className='text-info'>
                                                      {taxDetails}
                                                    </span>
                                                    <span className='text-danger'>
                                                      Tax: ₹
                                                      {totalTax.toFixed(2)}
                                                    </span>
                                                    <span className='fw-bold text-dark'>
                                                      Total: ₹
                                                      {finalTotal.toFixed(2)}
                                                    </span>
                                                  </>
                                                );
                                              })()}
                                              <button
                                                type='button'
                                                className='btn btn-outline-danger btn-sm ms-auto'
                                                onClick={() => remove(index)}
                                              >
                                                Remove
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    }
                                  )}
                                  <button
                                    type='button'
                                    className='btn btn-success mt-2 w-100'
                                    onClick={() =>
                                      push({
                                        part_id: '',
                                        part_name: '',
                                        part_cost: 0,
                                        part_quantity: 1,
                                        part_tax: 0,
                                        part_discount: 0,
                                        part_discount_type: 'FLAT',
                                        part_total_cost: 0,
                                        tax_type: '',
                                      })
                                    }
                                  >
                                    + Add Part
                                  </button>
                                </div>
                              )}
                            </FieldArray>
                          </div>
                          <div className='col-md-12 mb-3'>
                            <label className='form-label'>Services Used</label>
                            <FieldArray name='services_used'>
                              {({ push, remove, form }) => (
                                <div className='bg-white rounded p-3 shadow-sm mb-3'>
                                  {(form.values.services_used || []).map(
                                    (_, index) => {
                                      const service =
                                        form.values.services_used[index];
                                      // Discount and tax type logic
                                      let discount =
                                        Number(service.service_discount) || 0;
                                      let baseTotal =
                                        Number(service.service_cost) *
                                        Number(service.service_quantity);
                                      let discountAmount = 0;
                                      let discountType =
                                        service.service_discount_type || 'FLAT';
                                      if (discountType === 'PERCENTAGE') {
                                        discountAmount =
                                          (baseTotal * discount) / 100;
                                      } else {
                                        discountAmount = discount;
                                      }
                                      const discountedTotal =
                                        baseTotal - discountAmount;
                                      // Tax type logic
                                      const taxType = service.tax_type || '';
                                      const taxRate =
                                        Number(service.service_tax) || 0;
                                      let cgst = 0,
                                        sgst = 0,
                                        igst = 0;
                                      let taxDetails = '';
                                      if (taxType === 'INTRASTATE') {
                                        cgst =
                                          (discountedTotal * (taxRate / 2)) /
                                          100;
                                        sgst =
                                          (discountedTotal * (taxRate / 2)) /
                                          100;
                                        taxDetails = `CGST: ₹${cgst.toFixed(
                                          2
                                        )} | SGST: ₹${sgst.toFixed(2)}`;
                                      } else if (
                                        taxType === 'INTERSTATE' ||
                                        taxType === 'IGST'
                                      ) {
                                        igst =
                                          (discountedTotal * taxRate) / 100;
                                        taxDetails = `IGST: ₹${igst.toFixed(
                                          2
                                        )}`;
                                      } else if (taxType === 'CGST') {
                                        cgst =
                                          (discountedTotal * taxRate) / 100;
                                        taxDetails = `CGST: ₹${cgst.toFixed(
                                          2
                                        )}`;
                                      } else if (taxType === 'SGST') {
                                        sgst =
                                          (discountedTotal * taxRate) / 100;
                                        taxDetails = `SGST: ₹${sgst.toFixed(
                                          2
                                        )}`;
                                      } else {
                                        taxDetails = 'No tax breakdown.';
                                      }
                                      const totalTax = cgst + sgst + igst;
                                      const calculatedTotalCost =
                                        discountedTotal + totalTax;
                                      return (
                                        <div
                                          key={index}
                                          className='mb-4 border-bottom pb-3'
                                        >
                                          <div className='row g-3 align-items-end'>
                                            <div className='col-md-3'>
                                              <label className='form-label fw-semibold mb-1'>
                                                Service Name (Type to search)
                                              </label>
                                              <AsyncSelect
                                                key={`service-${index}-${selectedVendor?._id}`}
                                                value={
                                                  form.values.services_used[
                                                    index
                                                  ]?.service_id
                                                    ? (() => {
                                                        // Extract string ID from potentially nested object
                                                        let serviceId =
                                                          form.values
                                                            .services_used[
                                                            index
                                                          ]?.service_id;

                                                        // Handle object IDs (extract string)
                                                        if (
                                                          typeof serviceId ===
                                                            'object' &&
                                                          serviceId !== null
                                                        ) {
                                                          serviceId =
                                                            serviceId._id ||
                                                            serviceId.id ||
                                                            'other';
                                                        }

                                                        // Handle string IDs with quotes
                                                        if (
                                                          typeof serviceId ===
                                                          'string'
                                                        ) {
                                                          serviceId =
                                                            serviceId.replace(
                                                              /^["']|["']$/g,
                                                              ''
                                                            );
                                                        }

                                                        return serviceId ===
                                                          'other'
                                                          ? {
                                                              value: 'other',
                                                              label:
                                                                'Other Service',
                                                            }
                                                          : {
                                                              value: serviceId,
                                                              label:
                                                                form.values
                                                                  .services_used[
                                                                  index
                                                                ]
                                                                  ?.service_name ||
                                                                'Selected Service',
                                                            };
                                                      })()
                                                    : null
                                                }
                                                onChange={(selectedOption) => {
                                                  if (!selectedOption) {
                                                    form.setFieldValue(
                                                      `services_used.${index}.service_id`,
                                                      ''
                                                    );
                                                    form.setFieldValue(
                                                      `services_used.${index}.service_name`,
                                                      ''
                                                    );
                                                    return;
                                                  }

                                                  // Ensure we always store a clean string value
                                                  let selectedValue =
                                                    selectedOption.value;

                                                  // Clean up any quoted strings
                                                  if (
                                                    typeof selectedValue ===
                                                    'string'
                                                  ) {
                                                    selectedValue =
                                                      selectedValue.replace(
                                                        /^["']|["']$/g,
                                                        ''
                                                      );
                                                  }

                                                  form.setFieldValue(
                                                    `services_used.${index}.service_id`,
                                                    selectedValue
                                                  );

                                                  if (
                                                    selectedValue === 'other'
                                                  ) {
                                                    // For "Other" service, clear auto-populated fields
                                                    form.setFieldValue(
                                                      `services_used.${index}.service_name`,
                                                      ''
                                                    );
                                                    form.setFieldValue(
                                                      `services_used.${index}.service_cost`,
                                                      0
                                                    );
                                                    form.setFieldValue(
                                                      `services_used.${index}.service_tax`,
                                                      0
                                                    );
                                                    form.setFieldValue(
                                                      `services_used.${index}.tax_type`,
                                                      ''
                                                    );
                                                  } else {
                                                    // For predefined services, auto-populate fields
                                                    const selectedServiceProduct =
                                                      selectedOption.service;

                                                    // Use displayName from nested service object
                                                    const serviceName =
                                                      selectedServiceProduct
                                                        ?.service
                                                        ?.displayName ||
                                                      selectedServiceProduct?.product_name ||
                                                      selectedServiceProduct
                                                        ?.service
                                                        ?.service_name ||
                                                      selectedServiceProduct?.serviceName ||
                                                      '';

                                                    form.setFieldValue(
                                                      `services_used.${index}.service_name`,
                                                      serviceName
                                                    );

                                                    if (
                                                      selectedServiceProduct
                                                    ) {
                                                      // Get service data from the service field or fallback to product
                                                      const serviceData =
                                                        selectedServiceProduct.service ||
                                                        selectedServiceProduct;

                                                      form.setFieldValue(
                                                        `services_used.${index}.service_cost`,
                                                        selectedServiceProduct.cost_price ||
                                                          selectedServiceProduct.mrp_price ||
                                                          serviceData.service_cost ||
                                                          0
                                                      );
                                                      form.setFieldValue(
                                                        `services_used.${index}.service_tax`,
                                                        serviceData.gstTaxRate ||
                                                          serviceData.gst_tax_rate ||
                                                          0
                                                      );
                                                      // Robust tax type population
                                                      const taxType =
                                                        serviceData.tax_type ||
                                                        serviceData.gst_type ||
                                                        serviceData.type ||
                                                        '';
                                                      form.setFieldValue(
                                                        `services_used.${index}.tax_type`,
                                                        taxType
                                                      );
                                                    }
                                                  }
                                                }}
                                                loadOptions={async (
                                                  inputValue
                                                ) => {
                                                  // Fetch services from products API
                                                  let servicesData = [];

                                                  if (selectedVendor) {
                                                    // Fetch vendor-specific services
                                                    servicesData =
                                                      await fetchServicesWithSearch(
                                                        inputValue
                                                      );
                                                  } else {
                                                    // Fetch all SERVICE products when no vendor selected
                                                    try {
                                                      let url = '/products/all';
                                                      if (inputValue) {
                                                        url += `?term=product_name&value=${encodeURIComponent(
                                                          inputValue
                                                        )}`;
                                                      }
                                                      const response =
                                                        await api.get(url);
                                                      const allProducts =
                                                        Array.isArray(
                                                          response.data
                                                        )
                                                          ? response.data
                                                          : [];
                                                      servicesData =
                                                        allProducts.filter(
                                                          (p) =>
                                                            p.product_category ===
                                                            'SERVICE'
                                                        );
                                                    } catch (error) {
                                                      console.error(
                                                        'Error fetching services:',
                                                        error
                                                      );
                                                      servicesData = [];
                                                    }
                                                  }

                                                  console.log(
                                                    'Services fetched for dropdown:',
                                                    servicesData
                                                  );

                                                  const options =
                                                    servicesData.map(
                                                      (service) => {
                                                        // Get the service displayName from nested service object
                                                        const serviceName =
                                                          service.service
                                                            ?.displayName ||
                                                          service.product_name ||
                                                          service.service
                                                            ?.service_name ||
                                                          service.serviceName ||
                                                          service.service_name ||
                                                          'Unnamed Service';

                                                        return {
                                                          value: service._id,
                                                          label: serviceName,
                                                          service: service,
                                                        };
                                                      }
                                                    );

                                                  // Add "Other" option at the end
                                                  options.push({
                                                    value: 'other',
                                                    label: 'Other Service',
                                                  });

                                                  return options;
                                                }}
                                                cacheOptions
                                                defaultOptions
                                                isClearable
                                                placeholder='Type to search services...'
                                                styles={{
                                                  control: (base) => ({
                                                    ...base,
                                                    minHeight: '40px',
                                                    borderColor: '#0d6efd',
                                                    boxShadow:
                                                      '0 0.125rem 0.25rem rgba(0,0,0,0.075)',
                                                  }),
                                                }}
                                              />

                                              {/* Show custom service name input when "Other" is selected */}
                                              {(() => {
                                                let serviceId =
                                                  form.values.services_used[
                                                    index
                                                  ]?.service_id;
                                                // Normalize service_id for comparison
                                                if (
                                                  typeof serviceId ===
                                                    'object' &&
                                                  serviceId !== null
                                                ) {
                                                  serviceId =
                                                    serviceId._id ||
                                                    serviceId.id ||
                                                    serviceId;
                                                }
                                                if (
                                                  typeof serviceId === 'string'
                                                ) {
                                                  serviceId = serviceId
                                                    .replace(/^["']|["']$/g, '')
                                                    .trim();
                                                }
                                                return serviceId === 'other';
                                              })() && (
                                                <div className='mt-2'>
                                                  <label className='form-label fw-semibold mb-1 text-primary'>
                                                    Custom Service Name *
                                                  </label>
                                                  <Field
                                                    name={`services_used.${index}.service_name`}
                                                    type='text'
                                                    placeholder='Enter custom service name'
                                                    className='form-control border-primary shadow-sm'
                                                    style={{
                                                      minHeight: '40px',
                                                    }}
                                                  />
                                                  <ErrorMessage
                                                    name={`services_used.${index}.service_name`}
                                                    component='div'
                                                    className='text-danger mt-1 small'
                                                  />
                                                </div>
                                              )}
                                              <ErrorMessage
                                                name={`services_used.${index}.service_id`}
                                                component='div'
                                                className='text-danger mt-1 small'
                                              />
                                            </div>
                                            <div className='col-md-2'>
                                              <label className='form-label fw-semibold mb-1'>
                                                Service Cost
                                              </label>
                                              <Field
                                                name={`services_used.${index}.service_cost`}
                                                type='number'
                                                placeholder='Service Cost'
                                                className='form-control border-primary shadow-sm'
                                                style={{ minHeight: '40px' }}
                                              />
                                              <ErrorMessage
                                                name={`services_used.${index}.service_cost`}
                                                component='div'
                                                className='text-danger mt-1 small'
                                              />
                                            </div>
                                            <div className='col-md-2'>
                                              <label className='form-label fw-semibold mb-1'>
                                                Quantity
                                              </label>
                                              <Field
                                                name={`services_used.${index}.service_quantity`}
                                                type='number'
                                                placeholder='Quantity'
                                                className='form-control border-primary shadow-sm'
                                                style={{ minHeight: '40px' }}
                                              />
                                              <ErrorMessage
                                                name={`services_used.${index}.service_quantity`}
                                                component='div'
                                                className='text-danger mt-1 small'
                                              />
                                            </div>
                                            <div className='col-md-2'>
                                              <label className='form-label'>
                                                Tax Type
                                              </label>
                                              <Field
                                                as='select'
                                                name={`services_used.${index}.tax_type`}
                                                className='form-select border-primary shadow-sm'
                                                style={{ minHeight: '40px' }}
                                              >
                                                <option value=''>
                                                  Select Tax Type
                                                </option>
                                                <option value='INTERSTATE'>
                                                  INTERSTATE
                                                </option>
                                                <option value='INTRASTATE'>
                                                  INTRASTATE
                                                </option>
                                                <option value='CGST'>
                                                  CGST
                                                </option>
                                                <option value='SGST'>
                                                  SGST
                                                </option>
                                                <option value='IGST'>
                                                  IGST
                                                </option>
                                              </Field>
                                            </div>
                                            <div className='col-md-1'>
                                              <label className='form-label'>
                                                Tax (%)
                                              </label>
                                              <Field
                                                name={`services_used.${index}.service_tax`}
                                                type='number'
                                                placeholder='Tax (%)'
                                                className='form-control border-primary shadow-sm'
                                                style={{ minHeight: '40px' }}
                                              />
                                            </div>
                                            <div className='col-md-2'>
                                              <label className='form-label'>
                                                Discount
                                              </label>
                                              <div className='input-group'>
                                                <Field
                                                  name={`services_used.${index}.service_discount`}
                                                  type='number'
                                                  placeholder='Discount'
                                                  className='form-control border-primary shadow-sm'
                                                  style={{ minHeight: '40px' }}
                                                />
                                                <Field
                                                  as='select'
                                                  name={`services_used.${index}.service_discount_type`}
                                                  className='form-select border-primary shadow-sm'
                                                  style={{
                                                    minHeight: '40px',
                                                    maxWidth: '120px',
                                                  }}
                                                >
                                                  <option value='FLAT'>
                                                    Flat
                                                  </option>
                                                  <option value='PERCENTAGE'>
                                                    %
                                                  </option>
                                                </Field>
                                              </div>
                                            </div>
                                          </div>
                                          {/* Compact tax breakdown display */}
                                          {taxType && (
                                            <div className='mt-2 px-2 py-1 rounded bg-light border d-flex flex-wrap align-items-center gap-3 small'>
                                              <span className='fw-bold text-primary'>
                                                Base: ₹{baseTotal.toFixed(2)}
                                              </span>
                                              <span className='text-success'>
                                                Discount: ₹
                                                {discountAmount.toFixed(2)}
                                                {discountType === 'PERCENTAGE'
                                                  ? ` (${discount}%)`
                                                  : ''}
                                              </span>
                                              <span className='text-warning'>
                                                Taxable: ₹
                                                {discountedTotal.toFixed(2)}
                                              </span>
                                              <span className='text-info'>
                                                {taxDetails}
                                              </span>
                                              <span className='text-danger'>
                                                Tax: ₹{totalTax.toFixed(2)}
                                              </span>
                                              <span className='fw-bold text-dark'>
                                                Total: ₹
                                                {calculatedTotalCost.toFixed(2)}
                                              </span>
                                              <button
                                                type='button'
                                                className='btn btn-outline-danger btn-sm ms-auto'
                                                onClick={() => remove(index)}
                                              >
                                                Remove
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    }
                                  )}
                                  <button
                                    type='button'
                                    className='btn btn-success mt-2 w-100'
                                    onClick={() =>
                                      push({
                                        service_id: '',
                                        service_name: '',
                                        service_cost: 0,
                                        service_quantity: 1,
                                        service_tax: 0,
                                        service_discount: 0,
                                        service_discount_type: 'FLAT',
                                        service_total_cost: 0,
                                        tax_type: '',
                                      })
                                    }
                                  >
                                    Add Service
                                  </button>
                                </div>
                              )}
                            </FieldArray>
                          </div>
                          <div className='col-md-12 mb-3'>
                            <label className='form-label'>Products Used</label>
                            <FieldArray name='products_used'>
                              {({ push, remove, form }) => (
                                <div className='bg-white rounded p-3 shadow-sm mb-3'>
                                  {(form.values.products_used || []).map(
                                    (_, index) => {
                                      const product =
                                        form.values.products_used[index];
                                      // Discount and tax type logic
                                      let discount =
                                        Number(product.product_discount) || 0;
                                      let baseTotal =
                                        Number(product.product_cost) *
                                        Number(product.product_quantity);
                                      let discountAmount = 0;
                                      let discountType =
                                        product.product_discount_type || 'FLAT';
                                      if (discountType === 'PERCENTAGE') {
                                        discountAmount =
                                          (baseTotal * discount) / 100;
                                      } else {
                                        discountAmount = discount;
                                      }
                                      const discountedTotal =
                                        baseTotal - discountAmount;
                                      // Tax type logic
                                      const taxType = product.tax_type || '';
                                      const taxRate =
                                        Number(product.product_tax) || 0;
                                      let cgst = 0,
                                        sgst = 0,
                                        igst = 0;
                                      let taxDetails = '';
                                      if (taxType === 'INTRASTATE') {
                                        cgst =
                                          (discountedTotal * (taxRate / 2)) /
                                          100;
                                        sgst =
                                          (discountedTotal * (taxRate / 2)) /
                                          100;
                                        taxDetails = `CGST: ₹${cgst.toFixed(
                                          2
                                        )} | SGST: ₹${sgst.toFixed(2)}`;
                                      } else if (
                                        taxType === 'INTERSTATE' ||
                                        taxType === 'IGST'
                                      ) {
                                        igst =
                                          (discountedTotal * taxRate) / 100;
                                        taxDetails = `IGST: ₹${igst.toFixed(
                                          2
                                        )}`;
                                      } else if (taxType === 'CGST') {
                                        cgst =
                                          (discountedTotal * taxRate) / 100;
                                        taxDetails = `CGST: ₹${cgst.toFixed(
                                          2
                                        )}`;
                                      } else if (taxType === 'SGST') {
                                        sgst =
                                          (discountedTotal * taxRate) / 100;
                                        taxDetails = `SGST: ₹${sgst.toFixed(
                                          2
                                        )}`;
                                      } else {
                                        taxDetails = 'No tax breakdown.';
                                      }
                                      const totalTax = cgst + sgst + igst;
                                      const calculatedTotalCost =
                                        discountedTotal + totalTax;
                                      return (
                                        <div
                                          key={index}
                                          className='mb-4 border-bottom pb-3'
                                        >
                                          <div className='row g-3 align-items-end'>
                                            <div className='col-md-2'>
                                              <label className='form-label fw-semibold mb-1'>
                                                Product Type
                                              </label>
                                              <Field
                                                as='select'
                                                name={`products_used.${index}.product_category`}
                                                className='form-select border-info shadow-sm'
                                                style={{ minHeight: '40px' }}
                                                onChange={(e) => {
                                                  form.setFieldValue(
                                                    `products_used.${index}.product_category`,
                                                    e.target.value
                                                  );
                                                  // Clear product selection when category changes
                                                  form.setFieldValue(
                                                    `products_used.${index}.product_id`,
                                                    ''
                                                  );
                                                  form.setFieldValue(
                                                    `products_used.${index}.product_name`,
                                                    ''
                                                  );
                                                }}
                                              >
                                                <option value=''>
                                                  Select Type
                                                </option>
                                                <option value='TYRE'>
                                                  Tyre
                                                </option>
                                                <option value='ALLOY_WHEEL'>
                                                  Alloy Wheel
                                                </option>
                                              </Field>
                                            </div>
                                            <div className='col-md-4'>
                                              <label className='form-label fw-semibold mb-1'>
                                                {form.values.products_used[
                                                  index
                                                ]?.product_category === 'TYRE'
                                                  ? 'Tyre (Type to search)'
                                                  : form.values.products_used[
                                                      index
                                                    ]?.product_category ===
                                                    'ALLOY_WHEEL'
                                                  ? 'Alloy Wheel (Type to search)'
                                                  : 'Product'}
                                              </label>
                                              <AsyncSelect
                                                key={`product-${index}-${form.values.products_used[index]?.product_category}-${selectedVendor?._id}`}
                                                isDisabled={
                                                  !form.values.products_used[
                                                    index
                                                  ]?.product_category
                                                }
                                                value={
                                                  form.values.products_used[
                                                    index
                                                  ]?.product_id
                                                    ? (() => {
                                                        // Extract string ID from potentially nested object
                                                        let productId =
                                                          form.values
                                                            .products_used[
                                                            index
                                                          ]?.product_id;

                                                        // Handle object IDs (extract string)
                                                        if (
                                                          typeof productId ===
                                                            'object' &&
                                                          productId !== null
                                                        ) {
                                                          productId =
                                                            productId._id ||
                                                            productId.id ||
                                                            '';
                                                        }

                                                        // Handle string IDs with quotes
                                                        if (
                                                          typeof productId ===
                                                          'string'
                                                        ) {
                                                          productId =
                                                            productId.replace(
                                                              /^["']|["']$/g,
                                                              ''
                                                            );
                                                        }

                                                        return {
                                                          value: productId,
                                                          label:
                                                            form.values
                                                              .products_used[
                                                              index
                                                            ]?.product_name ||
                                                            'Selected Product',
                                                        };
                                                      })()
                                                    : null
                                                }
                                                onChange={async (
                                                  selectedOption
                                                ) => {
                                                  if (!selectedOption) {
                                                    form.setFieldValue(
                                                      `products_used.${index}.product_id`,
                                                      ''
                                                    );
                                                    form.setFieldValue(
                                                      `products_used.${index}.product_name`,
                                                      ''
                                                    );
                                                    return;
                                                  }

                                                  const productCategory =
                                                    form.values.products_used[
                                                      index
                                                    ]?.product_category;

                                                  // Ensure we always store a clean string value
                                                  let selectedValue =
                                                    selectedOption.value;

                                                  // Clean up any quoted strings
                                                  if (
                                                    typeof selectedValue ===
                                                    'string'
                                                  ) {
                                                    selectedValue =
                                                      selectedValue.replace(
                                                        /^["']|["']$/g,
                                                        ''
                                                      );
                                                  }

                                                  form.setFieldValue(
                                                    `products_used.${index}.product_id`,
                                                    selectedValue
                                                  );

                                                  // Generate product name using helper function
                                                  const selectedProduct =
                                                    selectedOption.product;
                                                  if (selectedProduct) {
                                                    const productName =
                                                      formatProductLabel(
                                                        selectedProduct,
                                                        productCategory
                                                      );

                                                    form.setFieldValue(
                                                      `products_used.${index}.product_name`,
                                                      productName
                                                    );
                                                    form.setFieldValue(
                                                      `products_used.${index}.product_cost`,
                                                      selectedProduct.cost_price ||
                                                        selectedProduct.mrp_price ||
                                                        0
                                                    );

                                                    // Get tax rate from product data
                                                    const productData =
                                                      productCategory === 'TYRE'
                                                        ? selectedProduct.tyre
                                                        : productCategory ===
                                                          'ALLOY_WHEEL'
                                                        ? selectedProduct.alloy_wheel
                                                        : null;
                                                    form.setFieldValue(
                                                      `products_used.${index}.product_tax`,
                                                      productData?.gstTaxRate ||
                                                        0
                                                    );

                                                    const taxType =
                                                      productData?.tax_type ||
                                                      productData?.gst_type ||
                                                      '';
                                                    form.setFieldValue(
                                                      `products_used.${index}.tax_type`,
                                                      taxType
                                                    );
                                                  }
                                                }}
                                                loadOptions={async (
                                                  inputValue
                                                ) => {
                                                  const productCategory =
                                                    form.values.products_used[
                                                      index
                                                    ]?.product_category;

                                                  if (!productCategory)
                                                    return [];

                                                  // Fetch products with search
                                                  const productsData =
                                                    selectedVendor
                                                      ? await fetchProductsWithSearch(
                                                          inputValue,
                                                          productCategory
                                                        )
                                                      : products.filter(
                                                          (p) =>
                                                            p.product_category ===
                                                              productCategory &&
                                                            (!inputValue ||
                                                              formatProductLabel(
                                                                p,
                                                                productCategory
                                                              )
                                                                .toLowerCase()
                                                                .includes(
                                                                  inputValue.toLowerCase()
                                                                ))
                                                        );

                                                  return productsData.map(
                                                    (product) => ({
                                                      value: product._id,
                                                      label: formatProductLabel(
                                                        product,
                                                        productCategory
                                                      ),
                                                      product: product,
                                                    })
                                                  );
                                                }}
                                                cacheOptions
                                                defaultOptions
                                                isClearable
                                                placeholder={
                                                  !form.values.products_used[
                                                    index
                                                  ]?.product_category
                                                    ? 'Select type first'
                                                    : `Type to search ${
                                                        form.values
                                                          .products_used[index]
                                                          ?.product_category ===
                                                        'TYRE'
                                                          ? 'tyres'
                                                          : 'alloy wheels'
                                                      }...`
                                                }
                                                styles={{
                                                  control: (base) => ({
                                                    ...base,
                                                    minHeight: '40px',
                                                    borderColor: '#0d6efd',
                                                    boxShadow:
                                                      '0 0.125rem 0.25rem rgba(0,0,0,0.075)',
                                                  }),
                                                }}
                                              />
                                            </div>
                                            <div className='col-md-2'>
                                              <label className='form-label fw-semibold mb-1'>
                                                Product Cost
                                              </label>
                                              <Field
                                                name={`products_used.${index}.product_cost`}
                                                type='number'
                                                placeholder='Product Cost'
                                                className='form-control border-primary shadow-sm'
                                                style={{ minHeight: '40px' }}
                                              />
                                            </div>
                                            <div className='col-md-2'>
                                              <label className='form-label fw-semibold mb-1'>
                                                Quantity
                                              </label>
                                              <Field
                                                name={`products_used.${index}.product_quantity`}
                                                type='number'
                                                placeholder='Quantity'
                                                className='form-control border-primary shadow-sm'
                                                style={{ minHeight: '40px' }}
                                              />
                                            </div>
                                            <div className='col-md-2'>
                                              <label className='form-label'>
                                                Tax Type
                                              </label>
                                              <Field
                                                as='select'
                                                name={`products_used.${index}.tax_type`}
                                                className='form-select border-primary shadow-sm'
                                                style={{ minHeight: '40px' }}
                                              >
                                                <option value=''>
                                                  Select Tax Type
                                                </option>
                                                <option value='INTERSTATE'>
                                                  INTERSTATE
                                                </option>
                                                <option value='INTRASTATE'>
                                                  INTRASTATE
                                                </option>
                                                <option value='CGST'>
                                                  CGST
                                                </option>
                                                <option value='SGST'>
                                                  SGST
                                                </option>
                                                <option value='IGST'>
                                                  IGST
                                                </option>
                                              </Field>
                                            </div>
                                            <div className='col-md-1'>
                                              <label className='form-label'>
                                                Tax (%)
                                              </label>
                                              <Field
                                                name={`products_used.${index}.product_tax`}
                                                type='number'
                                                placeholder='Tax (%)'
                                                className='form-control border-primary shadow-sm'
                                                style={{ minHeight: '40px' }}
                                              />
                                            </div>
                                            <div className='col-md-2'>
                                              <label className='form-label'>
                                                Discount
                                              </label>
                                              <div className='input-group'>
                                                <Field
                                                  name={`products_used.${index}.product_discount`}
                                                  type='number'
                                                  placeholder='Discount'
                                                  className='form-control border-primary shadow-sm'
                                                  style={{ minHeight: '40px' }}
                                                />
                                                <Field
                                                  as='select'
                                                  name={`products_used.${index}.product_discount_type`}
                                                  className='form-select border-primary shadow-sm'
                                                  style={{
                                                    minHeight: '40px',
                                                    maxWidth: '120px',
                                                  }}
                                                >
                                                  <option value='FLAT'>
                                                    Flat
                                                  </option>
                                                  <option value='PERCENTAGE'>
                                                    %
                                                  </option>
                                                </Field>
                                              </div>
                                            </div>
                                          </div>
                                          {/* Compact tax breakdown display */}
                                          {taxType && (
                                            <div className='mt-2 px-2 py-1 rounded bg-light border d-flex flex-wrap align-items-center gap-3 small'>
                                              <span className='fw-bold text-primary'>
                                                Base: ₹{baseTotal.toFixed(2)}
                                              </span>
                                              <span className='text-success'>
                                                Discount: ₹
                                                {discountAmount.toFixed(2)}
                                                {discountType === 'PERCENTAGE'
                                                  ? ` (${discount}%)`
                                                  : ''}
                                              </span>
                                              <span className='text-warning'>
                                                Taxable: ₹
                                                {discountedTotal.toFixed(2)}
                                              </span>
                                              <span className='text-info'>
                                                {taxDetails}
                                              </span>
                                              <span className='text-danger'>
                                                Tax: ₹{totalTax.toFixed(2)}
                                              </span>
                                              <span className='fw-bold text-dark'>
                                                Total: ₹
                                                {calculatedTotalCost.toFixed(2)}
                                              </span>
                                              <button
                                                type='button'
                                                className='btn btn-outline-danger btn-sm ms-auto'
                                                onClick={() => remove(index)}
                                              >
                                                Remove
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    }
                                  )}
                                  <button
                                    type='button'
                                    className='btn btn-success mt-2 w-100'
                                    onClick={() =>
                                      push({
                                        product_id: '',
                                        product_name: '',
                                        product_cost: 0,
                                        product_quantity: 1,
                                        product_tax: 0,
                                        product_discount: 0,
                                        product_discount_type: 'FLAT',
                                        product_total_cost: 0,
                                        tax_type: '',
                                      })
                                    }
                                  >
                                    Add Product
                                  </button>
                                </div>
                              )}
                            </FieldArray>
                          </div>
                          {/* <div className='col-md-12 mb-3'>
                    <label className='form-label'>Service Images</label>
                    <FieldArray name='service_images'>
                      {({ push, remove }) => (
                        <div>
                          {values.service_images.map((_, index) => (
                            <div
                              key={index}
                              className='d-flex align-items-center mb-2'
                            >
                              <Field
                                name={`service_images.${index}.image_url`}
                                placeholder='Image URL'
                                className='form-control me-2'
                              />
                              <Field
                                name={`service_images.${index}.image_description`}
                                placeholder='Image Description'
                                className='form-control me-2'
                              />
                              <button
                                type='button'
                                className='btn btn-danger'
                                onClick={() => remove(index)}
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                          <button
                            type='button'
                            className='btn btn-success'
                            onClick={() =>
                              push({ image_url: '', image_description: '' })
                            }
                          >
                            Add Image
                          </button>
                        </div>
                      )}
                    </FieldArray>
                  </div> */}
                          <div className='row'>
                            <div className='col-md-6 mb-3'>
                              <label className='form-label'>
                                Service Labor Cost
                              </label>
                              <Field
                                name='service_labor_cost'
                                type='number'
                                className='form-control'
                              />
                              <ErrorMessage
                                name='service_labor_cost'
                                component='div'
                                className='text-danger mt-1 small'
                              />
                            </div>
                            <div className='col-md-6 mb-3'>
                              <label className='form-label fw-bold'>
                                Service Total Cost
                              </label>
                              <div className='bg-light border rounded p-2 mb-2 d-flex flex-wrap gap-3 align-items-center small'>
                                <span className='fw-bold text-primary'>
                                  Parts: ₹
                                  {(values.service_parts_used || [])
                                    .reduce((acc, part) => {
                                      let discount =
                                        Number(part.part_discount) || 0;
                                      let baseTotal =
                                        Number(part.part_cost) *
                                        Number(part.part_quantity);
                                      let discountAmount =
                                        part.part_discount_type === 'PERCENTAGE'
                                          ? (baseTotal * discount) / 100
                                          : discount;
                                      let discountedTotal =
                                        baseTotal - discountAmount;
                                      let taxType = part.tax_type || '';
                                      let taxRate = Number(part.part_tax) || 0;
                                      let cgst = 0,
                                        sgst = 0,
                                        igst = 0;
                                      if (taxType === 'INTRASTATE') {
                                        cgst =
                                          (discountedTotal * (taxRate / 2)) /
                                          100;
                                        sgst =
                                          (discountedTotal * (taxRate / 2)) /
                                          100;
                                      } else if (
                                        taxType === 'INTERSTATE' ||
                                        taxType === 'IGST'
                                      ) {
                                        igst =
                                          (discountedTotal * taxRate) / 100;
                                      } else if (taxType === 'CGST') {
                                        cgst =
                                          (discountedTotal * taxRate) / 100;
                                      } else if (taxType === 'SGST') {
                                        sgst =
                                          (discountedTotal * taxRate) / 100;
                                      }
                                      let totalTax = cgst + sgst + igst;
                                      return acc + discountedTotal + totalTax;
                                    }, 0)
                                    .toFixed(2)}
                                </span>
                                <span className='fw-bold text-success'>
                                  Products: ₹
                                  {(values.products_used || [])
                                    .reduce((acc, product) => {
                                      let discount =
                                        Number(product.product_discount) || 0;
                                      let baseTotal =
                                        Number(product.product_cost) *
                                        Number(product.product_quantity);
                                      let discountAmount =
                                        product.product_discount_type ===
                                        'PERCENTAGE'
                                          ? (baseTotal * discount) / 100
                                          : discount;
                                      let discountedTotal =
                                        baseTotal - discountAmount;
                                      let taxType = product.tax_type || '';
                                      let taxRate =
                                        Number(product.product_tax) || 0;
                                      let cgst = 0,
                                        sgst = 0,
                                        igst = 0;
                                      if (taxType === 'INTRASTATE') {
                                        cgst =
                                          (discountedTotal * (taxRate / 2)) /
                                          100;
                                        sgst =
                                          (discountedTotal * (taxRate / 2)) /
                                          100;
                                      } else if (
                                        taxType === 'INTERSTATE' ||
                                        taxType === 'IGST'
                                      ) {
                                        igst =
                                          (discountedTotal * taxRate) / 100;
                                      } else if (taxType === 'CGST') {
                                        cgst =
                                          (discountedTotal * taxRate) / 100;
                                      } else if (taxType === 'SGST') {
                                        sgst =
                                          (discountedTotal * taxRate) / 100;
                                      }
                                      let totalTax = cgst + sgst + igst;
                                      return acc + discountedTotal + totalTax;
                                    }, 0)
                                    .toFixed(2)}
                                </span>
                                <span className='fw-bold text-warning'>
                                  Services: ₹
                                  {(values.services_used || [])
                                    .reduce((acc, service) => {
                                      let discount =
                                        Number(service.service_discount) || 0;
                                      let baseTotal =
                                        Number(service.service_cost) *
                                        Number(service.service_quantity);
                                      let discountAmount =
                                        service.service_discount_type ===
                                        'PERCENTAGE'
                                          ? (baseTotal * discount) / 100
                                          : discount;
                                      let discountedTotal =
                                        baseTotal - discountAmount;
                                      let taxType = service.tax_type || '';
                                      let taxRate =
                                        Number(service.service_tax) || 0;
                                      let cgst = 0,
                                        sgst = 0,
                                        igst = 0;
                                      if (taxType === 'INTRASTATE') {
                                        cgst =
                                          (discountedTotal * (taxRate / 2)) /
                                          100;
                                        sgst =
                                          (discountedTotal * (taxRate / 2)) /
                                          100;
                                      } else if (
                                        taxType === 'INTERSTATE' ||
                                        taxType === 'IGST'
                                      ) {
                                        igst =
                                          (discountedTotal * taxRate) / 100;
                                      } else if (taxType === 'CGST') {
                                        cgst =
                                          (discountedTotal * taxRate) / 100;
                                      } else if (taxType === 'SGST') {
                                        sgst =
                                          (discountedTotal * taxRate) / 100;
                                      }
                                      let totalTax = cgst + sgst + igst;
                                      return acc + discountedTotal + totalTax;
                                    }, 0)
                                    .toFixed(2)}
                                </span>
                                <span className='fw-bold text-info'>
                                  Labor: ₹
                                  {(
                                    Number(values.service_labor_cost) || 0
                                  ).toFixed(2)}
                                </span>
                                {/* Total Tax Display */}
                                <span className='fw-bold text-danger'>
                                  Total Tax: ₹
                                  {(
                                    (values.service_parts_used || []).reduce(
                                      (acc, part) => {
                                        let discount =
                                          Number(part.part_discount) || 0;
                                        let baseTotal =
                                          Number(part.part_cost) *
                                          Number(part.part_quantity);
                                        let discountAmount =
                                          part.part_discount_type ===
                                          'PERCENTAGE'
                                            ? (baseTotal * discount) / 100
                                            : discount;
                                        let discountedTotal =
                                          baseTotal - discountAmount;
                                        let taxType = part.tax_type || '';
                                        let taxRate =
                                          Number(part.part_tax) || 0;
                                        let cgst = 0,
                                          sgst = 0,
                                          igst = 0;
                                        if (taxType === 'INTRASTATE') {
                                          cgst =
                                            (discountedTotal * (taxRate / 2)) /
                                            100;
                                          sgst =
                                            (discountedTotal * (taxRate / 2)) /
                                            100;
                                        } else if (
                                          taxType === 'INTERSTATE' ||
                                          taxType === 'IGST'
                                        ) {
                                          igst =
                                            (discountedTotal * taxRate) / 100;
                                        } else if (taxType === 'CGST') {
                                          cgst =
                                            (discountedTotal * taxRate) / 100;
                                        } else if (taxType === 'SGST') {
                                          sgst =
                                            (discountedTotal * taxRate) / 100;
                                        }
                                        let totalTax = cgst + sgst + igst;
                                        return acc + totalTax;
                                      },
                                      0
                                    ) +
                                    (values.products_used || []).reduce(
                                      (acc, product) => {
                                        let discount =
                                          Number(product.product_discount) || 0;
                                        let baseTotal =
                                          Number(product.product_cost) *
                                          Number(product.product_quantity);
                                        let discountAmount =
                                          product.product_discount_type ===
                                          'PERCENTAGE'
                                            ? (baseTotal * discount) / 100
                                            : discount;
                                        let discountedTotal =
                                          baseTotal - discountAmount;
                                        let taxType = product.tax_type || '';
                                        let taxRate =
                                          Number(product.product_tax) || 0;
                                        let cgst = 0,
                                          sgst = 0,
                                          igst = 0;
                                        if (taxType === 'INTRASTATE') {
                                          cgst =
                                            (discountedTotal * (taxRate / 2)) /
                                            100;
                                          sgst =
                                            (discountedTotal * (taxRate / 2)) /
                                            100;
                                        } else if (
                                          taxType === 'INTERSTATE' ||
                                          taxType === 'IGST'
                                        ) {
                                          igst =
                                            (discountedTotal * taxRate) / 100;
                                        } else if (taxType === 'CGST') {
                                          cgst =
                                            (discountedTotal * taxRate) / 100;
                                        } else if (taxType === 'SGST') {
                                          sgst =
                                            (discountedTotal * taxRate) / 100;
                                        }
                                        let totalTax = cgst + sgst + igst;
                                        return acc + totalTax;
                                      },
                                      0
                                    ) +
                                    (values.services_used || []).reduce(
                                      (acc, service) => {
                                        let discount =
                                          Number(service.service_discount) || 0;
                                        let baseTotal =
                                          Number(service.service_cost) *
                                          Number(service.service_quantity);
                                        let discountAmount =
                                          service.service_discount_type ===
                                          'PERCENTAGE'
                                            ? (baseTotal * discount) / 100
                                            : discount;
                                        let discountedTotal =
                                          baseTotal - discountAmount;
                                        let taxType = service.tax_type || '';
                                        let taxRate =
                                          Number(service.service_tax) || 0;
                                        let cgst = 0,
                                          sgst = 0,
                                          igst = 0;
                                        if (taxType === 'INTRASTATE') {
                                          cgst =
                                            (discountedTotal * (taxRate / 2)) /
                                            100;
                                          sgst =
                                            (discountedTotal * (taxRate / 2)) /
                                            100;
                                        } else if (
                                          taxType === 'INTERSTATE' ||
                                          taxType === 'IGST'
                                        ) {
                                          igst =
                                            (discountedTotal * taxRate) / 100;
                                        } else if (taxType === 'CGST') {
                                          cgst =
                                            (discountedTotal * taxRate) / 100;
                                        } else if (taxType === 'SGST') {
                                          sgst =
                                            (discountedTotal * taxRate) / 100;
                                        }
                                        let totalTax = cgst + sgst + igst;
                                        return acc + totalTax;
                                      },
                                      0
                                    )
                                  ).toFixed(2)}
                                </span>
                                <span className='fw-bold text-dark fs-6'>
                                  Grand Total: ₹
                                  {(
                                    (values.service_parts_used || []).reduce(
                                      (acc, part) => {
                                        let discount =
                                          Number(part.part_discount) || 0;
                                        let baseTotal =
                                          Number(part.part_cost) *
                                          Number(part.part_quantity);
                                        let discountAmount =
                                          part.part_discount_type ===
                                          'PERCENTAGE'
                                            ? (baseTotal * discount) / 100
                                            : discount;
                                        let discountedTotal =
                                          baseTotal - discountAmount;
                                        let taxType = part.tax_type || '';
                                        let taxRate =
                                          Number(part.part_tax) || 0;
                                        let cgst = 0,
                                          sgst = 0,
                                          igst = 0;
                                        if (taxType === 'INTRASTATE') {
                                          cgst =
                                            (discountedTotal * (taxRate / 2)) /
                                            100;
                                          sgst =
                                            (discountedTotal * (taxRate / 2)) /
                                            100;
                                        } else if (
                                          taxType === 'INTERSTATE' ||
                                          taxType === 'IGST'
                                        ) {
                                          igst =
                                            (discountedTotal * taxRate) / 100;
                                        } else if (taxType === 'CGST') {
                                          cgst =
                                            (discountedTotal * taxRate) / 100;
                                        } else if (taxType === 'SGST') {
                                          sgst =
                                            (discountedTotal * taxRate) / 100;
                                        }
                                        let totalTax = cgst + sgst + igst;
                                        return acc + discountedTotal + totalTax;
                                      },
                                      0
                                    ) +
                                    (values.products_used || []).reduce(
                                      (acc, product) => {
                                        let discount =
                                          Number(product.product_discount) || 0;
                                        let baseTotal =
                                          Number(product.product_cost) *
                                          Number(product.product_quantity);
                                        let discountAmount =
                                          product.product_discount_type ===
                                          'PERCENTAGE'
                                            ? (baseTotal * discount) / 100
                                            : discount;
                                        let discountedTotal =
                                          baseTotal - discountAmount;
                                        let taxType = product.tax_type || '';
                                        let taxRate =
                                          Number(product.product_tax) || 0;
                                        let cgst = 0,
                                          sgst = 0,
                                          igst = 0;
                                        if (taxType === 'INTRASTATE') {
                                          cgst =
                                            (discountedTotal * (taxRate / 2)) /
                                            100;
                                          sgst =
                                            (discountedTotal * (taxRate / 2)) /
                                            100;
                                        } else if (
                                          taxType === 'INTERSTATE' ||
                                          taxType === 'IGST'
                                        ) {
                                          igst =
                                            (discountedTotal * taxRate) / 100;
                                        } else if (taxType === 'CGST') {
                                          cgst =
                                            (discountedTotal * taxRate) / 100;
                                        } else if (taxType === 'SGST') {
                                          sgst =
                                            (discountedTotal * taxRate) / 100;
                                        }
                                        let totalTax = cgst + sgst + igst;
                                        return acc + discountedTotal + totalTax;
                                      },
                                      0
                                    ) +
                                    (values.services_used || []).reduce(
                                      (acc, service) => {
                                        let discount =
                                          Number(service.service_discount) || 0;
                                        let baseTotal =
                                          Number(service.service_cost) *
                                          Number(service.service_quantity);
                                        let discountAmount =
                                          service.service_discount_type ===
                                          'PERCENTAGE'
                                            ? (baseTotal * discount) / 100
                                            : discount;
                                        let discountedTotal =
                                          baseTotal - discountAmount;
                                        let taxType = service.tax_type || '';
                                        let taxRate =
                                          Number(service.service_tax) || 0;
                                        let cgst = 0,
                                          sgst = 0,
                                          igst = 0;
                                        if (taxType === 'INTRASTATE') {
                                          cgst =
                                            (discountedTotal * (taxRate / 2)) /
                                            100;
                                          sgst =
                                            (discountedTotal * (taxRate / 2)) /
                                            100;
                                        } else if (
                                          taxType === 'INTERSTATE' ||
                                          taxType === 'IGST'
                                        ) {
                                          igst =
                                            (discountedTotal * taxRate) / 100;
                                        } else if (taxType === 'CGST') {
                                          cgst =
                                            (discountedTotal * taxRate) / 100;
                                        } else if (taxType === 'SGST') {
                                          sgst =
                                            (discountedTotal * taxRate) / 100;
                                        }
                                        let totalTax = cgst + sgst + igst;
                                        return acc + discountedTotal + totalTax;
                                      },
                                      0
                                    ) +
                                    (Number(values.service_labor_cost) || 0)
                                  ).toFixed(2)}
                                </span>
                              </div>
                              <Field
                                name='service_total_cost'
                                type='number'
                                className='form-control'
                                value={parseFloat(serviceTotalCost).toFixed(2)}
                                readOnly
                              />
                            </div>
                            <div className='col-md-12 mb-3'>
                              <label className='form-label'>
                                Service Notes
                              </label>
                              <Field
                                name='service_notes'
                                as='textarea'
                                className='form-control'
                              />
                            </div>
                            <div className='col-md-6 mb-3'>
                              <label className='form-label'>
                                Service Technician
                              </label>
                              <Field
                                as='select'
                                name='service_technician'
                                className='form-select'
                              >
                                <option value=''>Select Technician</option>
                                {technicians.map((technician) => (
                                  <option
                                    key={technician._id}
                                    value={technician._id}
                                  >
                                    {technician.name}
                                  </option>
                                ))}
                              </Field>
                            </div>

                            <div className='col-md-6 mb-3'>
                              <label className='form-label'>
                                Service Payment Status
                              </label>
                              <Field
                                as='select'
                                name='service_payment_status'
                                className='form-select'
                              >
                                <option value='Unpaid'>Unpaid</option>
                                <option value='Paid'>Paid</option>
                                <option value='Partially Paid'>
                                  Partially Paid
                                </option>
                              </Field>
                            </div>
                            <div className='col-md-6 mb-3'>
                              <label className='form-label'>
                                Service Payment Method
                              </label>
                              <Field
                                as='select'
                                name='service_payment_method'
                                className='form-select'
                              >
                                <option value=''>Select</option>
                                <option value='Cash'>Cash</option>
                                <option value='Credit Card'>Credit Card</option>
                                <option value='Debit Card'>Debit Card</option>
                                <option value='Bank Transfer'>
                                  Bank Transfer
                                </option>
                                <option value='UPI'>UPI</option>
                              </Field>
                            </div>

                            {/* New Zoho Form Fields */}

                            <div className='col-md-6 mb-3'>
                              <label className='form-label'>Form Type *</label>
                              <div className='row'>
                                {[
                                  'CLMRKC',
                                  'CLMTELI',
                                  'WORKC',
                                  'WOTELI',
                                  'SSRkc',
                                  'SSTeli',
                                  'Lead',
                                ].map((type) => (
                                  <div key={type} className='col-md-6 mb-2'>
                                    <label className='form-check'>
                                      <Field
                                        type='checkbox'
                                        name='form_type'
                                        value={type}
                                        className='form-check-input'
                                      />
                                      <span className='form-check-label'>
                                        {type}
                                      </span>
                                    </label>
                                  </div>
                                ))}
                              </div>
                              <ErrorMessage
                                name='form_type'
                                component='div'
                                className='text-danger mt-1 small'
                              />
                            </div>

                            <div className='col-md-6 mb-3'>
                              <label className='form-label'>
                                Odometer Reading *
                              </label>
                              <Field name='odometer_reading'>
                                {({ field, form }) => (
                                  <input
                                    {...field}
                                    type='number'
                                    min='0'
                                    className='form-control'
                                    onChange={(e) => {
                                      const odometerValue =
                                        parseInt(e.target.value) || 0;
                                      form.setFieldValue(
                                        'odometer_reading',
                                        odometerValue
                                      );
                                      form.setFieldValue(
                                        'next_service_due_odometer_reading',
                                        odometerValue + 5000
                                      );
                                    }}
                                  />
                                )}
                              </Field>
                              <ErrorMessage
                                name='odometer_reading'
                                component='div'
                                className='text-danger mt-1 small'
                              />
                            </div>

                            <div className='col-md-6 mb-3'>
                              <label className='form-label'>
                                Next Service Due Odometer Reading
                              </label>
                              <Field
                                name='next_service_due_odometer_reading'
                                type='number'
                                min='0'
                                className='form-control'
                              />
                            </div>

                            <div className='col-md-6 mb-3'>
                              <label className='form-label'>
                                Brake Pad Status (1-5) *
                              </label>
                              <Field
                                as='select'
                                name='brake_pad_status'
                                className='form-select'
                              >
                                <option value=''>Select</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                              </Field>
                              <ErrorMessage
                                name='brake_pad_status'
                                component='div'
                                className='text-danger mt-1 small'
                              />
                            </div>

                            <div className='col-md-6 mb-3'>
                              <label className='form-label'>
                                Service Payment Date
                              </label>
                              <Field
                                name='service_payment_date'
                                type='date'
                                className='form-control'
                                min={new Date().toISOString().split('T')[0]}
                              />
                            </div>

                            <div className='col-md-12 mb-3'>
                              <label className='form-label fw-bold'>
                                Checklist *
                              </label>
                              <div className='bg-light p-3 rounded'>
                                {[
                                  'मैंने सभी नट्स और व्हील कैप्स/ सेंटर कैप चेक कर लिए हैं और सब बराबर है !',
                                  'गाडी के टूल बॉक्स गाडी में सही सलामत रख दिए हैं !',
                                  'गाडी की स्टेपनी भी चेक कर के स्टेपनी में वापस रख दी है !',
                                  'कस्टमर की गाडी की टेस्ट ड्राइव करके कस्टमर को गाडी की चाबी सौंप दी गयी है !',
                                  'कस्टमर के पुराने टायर वापस कस्टमर की गाडी में रखवा दिए हैं या फिर उसे बिकवा कर उसके पैसे कस्टमर को दिलवा दिए गए हैं',
                                ].map((item, index) => (
                                  <div key={index} className='mb-2'>
                                    <label className='form-check'>
                                      <Field
                                        type='checkbox'
                                        name='check_list'
                                        value={item}
                                        className='form-check-input'
                                      />
                                      <span className='form-check-label small'>
                                        {item}
                                      </span>
                                    </label>
                                  </div>
                                ))}
                              </div>
                              <ErrorMessage
                                name='check_list'
                                component='div'
                                className='text-danger mt-1 small'
                              />
                            </div>

                            <div className='col-md-12 mb-3'>
                              <div className='form-check'>
                                <Field
                                  type='checkbox'
                                  name='terms_and_conditions_accepted'
                                  className='form-check-input'
                                />
                                <label className='form-check-label fw-bold text-danger'>
                                  I accept the terms and conditions *
                                </label>
                              </div>
                              <ErrorMessage
                                name='terms_and_conditions_accepted'
                                component='div'
                                className='text-danger mt-1 small'
                              />
                            </div>

                            {/* Service Images Section - Hidden for now */}
                            {/* <div className='col-md-12 mb-3'>
                          <label className='form-label fw-bold'>
                            Service Images
                          </label>
                          <FieldArray name='service_images'>
                            {({ push, remove }) => (
                              <div className='bg-light p-3 rounded'>
                                {values.service_images.map((_, index) => (
                                  <div key={index} className='row mb-2'>
                                    <div className='col-md-5'>
                                      <Field
                                        name={`service_images.${index}.image_url`}
                                        placeholder='Image URL'
                                        className='form-control'
                                      />
                                    </div>
                                    <div className='col-md-5'>
                                      <Field
                                        name={`service_images.${index}.image_description`}
                                        placeholder='Image Description'
                                        className='form-control'
                                      />
                                    </div>
                                    <div className='col-md-2'>
                                      <button
                                        type='button'
                                        className='btn btn-danger btn-sm'
                                        onClick={() => remove(index)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                ))}
                                <button
                                  type='button'
                                  className='btn btn-success btn-sm'
                                  onClick={() =>
                                    push({
                                      image_url: '',
                                      image_description: '',
                                    })
                                  }
                                >
                                  Add Image
                                </button>
                              </div>
                            )}
                          </FieldArray>
                        </div> */}

                            {/* Service Documents Section - Hidden for now */}
                            {/* <div className='col-md-12 mb-3'>
                          <label className='form-label fw-bold'>
                            Service Documents
                          </label>
                          <FieldArray name='service_documents'>
                            {({ push, remove }) => (
                              <div className='bg-light p-3 rounded'>
                                {values.service_documents.map((_, index) => (
                                  <div key={index} className='row mb-2'>
                                    <div className='col-md-5'>
                                      <Field
                                        name={`service_documents.${index}.document_url`}
                                        placeholder='Document URL'
                                        className='form-control'
                                      />
                                    </div>
                                    <div className='col-md-5'>
                                      <Field
                                        name={`service_documents.${index}.document_description`}
                                        placeholder='Document Description'
                                        className='form-control'
                                      />
                                    </div>
                                    <div className='col-md-2'>
                                      <button
                                        type='button'
                                        className='btn btn-danger btn-sm'
                                        onClick={() => remove(index)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                ))}
                                <button
                                  type='button'
                                  className='btn btn-success btn-sm'
                                  onClick={() =>
                                    push({
                                      document_url: '',
                                      document_description: '',
                                    })
                                  }
                                >
                                  Add Document
                                </button>
                              </div>
                            )}
                          </FieldArray>
                        </div> */}

                            {/* <div className='col-md-6 mb-3'>
                          <label className='form-label'>Service Rating</label>
                          <Field
                            name='service_rating'
                            type='number'
                            className='form-control'
                          />
                        </div> */}
                            {/* <div className='col-md-12 mb-3'>
                          <label className='form-label'>Service Feedback</label>
                          <Field
                            name='service_feedback'
                            as='textarea'
                            className='form-control'
                          />
                        </div> */}
                          </div>
                          <div className='col-md-12'>
                            <div className='row g-3'>
                              <div className='col-md-6'>
                                <button
                                  type='button'
                                  className='btn btn-outline-secondary w-100 py-3 fs-5'
                                  disabled={isSubmitting}
                                  onClick={handleSaveAsDraft}
                                >
                                  {isSubmitting && isDraft
                                    ? 'Saving as Draft...'
                                    : 'Save as Draft'}
                                </button>
                              </div>
                              <div className='col-md-6'>
                                <button
                                  type='button'
                                  className={`btn w-100 py-3 fs-5 ${
                                    values.status === 'draft'
                                      ? 'btn-success'
                                      : 'btn-primary'
                                  }`}
                                  disabled={isSubmitting}
                                  onClick={handleActivate}
                                >
                                  {isSubmitting && !isDraft
                                    ? values.status === 'draft'
                                      ? 'Activating...'
                                      : 'Submitting...'
                                    : values.status === 'draft'
                                    ? 'Activate Job Card'
                                    : 'Submit Job Card'}
                                </button>
                              </div>
                            </div>

                            {values.status === 'draft' && (
                              <div className='alert alert-info mt-3 mb-0'>
                                <i className='fas fa-info-circle me-2'></i>
                                <strong>Draft Mode:</strong> This job card is
                                saved as draft. Click "Activate Job Card" to
                                enable full validation and make it active.
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </Form>
                );
              }}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobCardForm;
