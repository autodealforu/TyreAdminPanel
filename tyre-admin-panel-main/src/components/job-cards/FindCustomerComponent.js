import React, { useState, useEffect } from 'react';
import AsyncSelect from 'react-select/async';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import api from '../../domain/api';

const FindCustomerComponent = ({ show, handleClose, onSelectCustomer }) => {
  const [searchType, setSearchType] = useState('customer'); // 'customer' or 'vehicle'
  const [customerOptions, setCustomerOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [makeModelOptions, setMakeModelOptions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedMakeModel, setSelectedMakeModel] = useState(null);
  const [selectedMakeModelForNew, setSelectedMakeModelForNew] = useState(null);

  // Fetch all customers for dropdown
  useEffect(() => {
    const fetchCustomers = async (inputValue = '') => {
      try {
        const res = await api.get(
          `/customers/all?term=name&value=${inputValue}`
        );
        const options = (res.data || []).map((c) => ({
          value: c.phone,
          label: `${c.name} (${c.phone})`,
          customer: c,
        }));
        setCustomerOptions(options);
      } catch (err) {
        setCustomerOptions([]);
      }
    };
    fetchCustomers();
  }, []);

  // Fetch all make models for dropdown
  useEffect(() => {
    const fetchMakeModels = async (inputValue = '') => {
      try {
        const res = await api.get(
          `/makemodels/all?term=name&value=${inputValue}`
        );
        const options = (res.data || []).map((m) => ({
          value: m._id,
          label: m.name,
          makeModel: m,
        }));
        setMakeModelOptions(options);
      } catch (err) {
        setMakeModelOptions([]);
      }
    };
    fetchMakeModels();
  }, []);

  // Fetch all vehicles for dropdown
  useEffect(() => {
    const fetchVehicles = async (inputValue = '') => {
      try {
        const res = await api.get(
          `/vehicles/all?term=vehicle_number&value=${inputValue}`
        );
        const options = (res.data || []).map((v) => ({
          value: v.vehicle_number,
          label: `${v.vehicle_number} (${v.makeModel?.name} )`,
          vehicle: v,
        }));
        setVehicleOptions(options);
      } catch (err) {
        setVehicleOptions([]);
      }
    };
    fetchVehicles();
  }, []);

  // For async select
  const loadCustomerOptions = async (inputValue) => {
    try {
      const res = await api.get(`/customers/all?term=name&value=${inputValue}`);
      return (res.data || []).map((c) => ({
        value: c.phone,
        label: `${c.name} (${c.phone})`,
        customer: c,
      }));
    } catch (err) {
      return [];
    }
  };

  const loadVehicleOptions = async (inputValue) => {
    try {
      const res = await api.get(
        `/vehicles/all?term=vehicle_number&value=${inputValue}`
      );
      return (res.data || []).map((v) => ({
        value: v.vehicle_number,
        label: `${v.vehicle_number} (${v.make} ${v.model})`,
        vehicle: v,
      }));
    } catch (err) {
      return [];
    }
  };

  const loadMakeModelOptions = async (inputValue) => {
    try {
      const res = await api.get(
        `/makemodels/all?term=name&value=${inputValue}`
      );
      return (res.data || []).map((m) => ({
        value: m._id,
        label: m.name,
        makeModel: m,
      }));
    } catch (err) {
      return [];
    }
  };
  const [phone, setPhone] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [customer, setCustomers] = useState(null);
  const [searchedVehicles, setSearchedVehicles] = useState(null);
  const [noUserFoundError, setNoUserFoundError] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [addNewVehicle, setAddNewVehicle] = useState(false);
  const [addNewCustomerAndVehicle, setAddNewCustomerAndVehicle] =
    useState(false);

  const handleSearch = async () => {
    setCustomers(null);
    setSearchedVehicles(null);
    setIsSearching(true);
    // Simulate an API call to fetch customers based on searchQuery
    try {
      const responseData = await api.post('/job-cards/getUserAndVehicle', {
        phone: phone,
        vehicle_number: vehicleNumber,
      });
      console.log('responseData', responseData);
      setCustomers(responseData?.data?.customer);
      setSearchedVehicles(responseData?.data?.vehicles);
      setIsSearching(false);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setNoUserFoundError(true);
      setIsSearching(false);
      return;
    }
  };

  const [newCustomerData, setNewCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    make: '',
    model: '',
    makeModel: '',
    makeModelName: '',
    year: '',
    vin: '',
    vehicleNumber: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const [newVehicleData, setNewVehicleData] = useState({
    make: '',
    model: '',
    makeModel: '',
    makeModelName: '',
    year: '',
    vin: '',
    vehicleNumber: '',
  });

  const [vehicleFormErrors, setVehicleFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!newCustomerData.name) {
      errors.name = 'Name is required';
    } else if (newCustomerData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    } else if (newCustomerData.name.trim().length > 50) {
      errors.name = 'Name cannot exceed 50 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(newCustomerData.name.trim())) {
      errors.name = 'Name can only contain letters and spaces';
    }

    // Email validation
    if (!newCustomerData.email) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newCustomerData.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }

    // Phone validation - 10 digits
    if (!newCustomerData.phone) {
      errors.phone = 'Phone number is required';
    } else {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(newCustomerData.phone)) {
        errors.phone =
          'Phone number must be 10 digits starting with 6, 7, 8, or 9';
      }
    }

    // Vehicle make & model validation
    if (!newCustomerData.makeModel) {
      errors.makeModel = 'Vehicle Make & Model is required';
    }

    // Vehicle number validation
    if (!newCustomerData.vehicleNumber) {
      errors.vehicleNumber = 'Vehicle number is required';
    } else {
      const vehicleNumberRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/;
      if (
        !vehicleNumberRegex.test(newCustomerData.vehicleNumber.toUpperCase())
      ) {
        errors.vehicleNumber =
          'Vehicle number format: AB12CD3456 (e.g., MH12AB1234)';
      }
    }

    // Vehicle year validation
    if (newCustomerData.year) {
      const currentYear = new Date().getFullYear();
      const year = parseInt(newCustomerData.year);
      if (year < 1980 || year > currentYear + 1) {
        errors.year = `Vehicle year must be between 1980 and ${
          currentYear + 1
        }`;
      }
    }

    return errors;
  };

  const validateVehicleForm = () => {
    const errors = {};

    // Vehicle make & model validation
    if (!newVehicleData.makeModel) {
      errors.makeModel = 'Vehicle Make & Model is required';
    }

    // Vehicle number validation
    if (!newVehicleData.vehicleNumber) {
      errors.vehicleNumber = 'Vehicle number is required';
    } else {
      const vehicleNumberRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/;
      if (
        !vehicleNumberRegex.test(newVehicleData.vehicleNumber.toUpperCase())
      ) {
        errors.vehicleNumber =
          'Vehicle number format: AB12CD3456 (e.g., MH12AB1234)';
      }
    }

    // Vehicle year validation
    if (newVehicleData.year) {
      const currentYear = new Date().getFullYear();
      const year = parseInt(newVehicleData.year);
      if (year < 1980 || year > currentYear + 1) {
        errors.year = `Vehicle year must be between 1980 and ${
          currentYear + 1
        }`;
      }
    }

    // VIN validation (if provided)
    if (newVehicleData.vin && newVehicleData.vin.length > 0) {
      if (newVehicleData.vin.length !== 17) {
        errors.vin = 'VIN must be exactly 17 characters long';
      } else if (!/^[A-HJ-NPR-Z0-9]{17}$/i.test(newVehicleData.vin)) {
        errors.vin = 'VIN contains invalid characters (no I, O, Q allowed)';
      }
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewCustomerData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleVehicleInputChange = (e) => {
    const { id, value } = e.target;
    setNewVehicleData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCreateVehicleAndCustomer = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    try {
      const response = await api.post('/job-cards/createCustomerAndVehicle', {
        ...newCustomerData,
        vehicle_number: newCustomerData.vehicleNumber,
      });
      console.log('Customer and Vehicle created successfully:', response.data);
      setAddNewCustomerAndVehicle(false); // Close the form after successful submission
      setNewCustomerData({
        name: '',
        email: '',
        phone: '',
        make: '',
        model: '',
        makeModel: '',
        makeModelName: '',
        year: '',
        vin: '',
        vehicleNumber: '',
      });
      setSelectedMakeModel(null);
    } catch (error) {
      console.error('Error creating customer and vehicle:', error);
      setAddNewCustomerAndVehicle(false);
      setNewCustomerData({
        name: '',
        email: '',
        phone: '',
        make: '',
        model: '',
        makeModel: '',
        makeModelName: '',
        year: '',
        vin: '',
        vehicleNumber: '',
      });
      setSelectedMakeModel(null);
    }
  };

  const handleAddNewVehicle = async (e) => {
    e.preventDefault();
    const errors = validateVehicleForm();
    if (Object.keys(errors).length > 0) {
      setVehicleFormErrors(errors);
      return;
    }
    setVehicleFormErrors({});
    try {
      const response = await api.post('/vehicles', {
        ...newVehicleData,
        vehicle_number: newVehicleData.vehicleNumber,
        owner: customer._id,
      });
      console.log('Customer and Vehicle created successfully:', response.data);
      setSearchedVehicles((prevVehicles) => [
        ...prevVehicles,
        {
          ...newVehicleData,
          vehicle_number: newVehicleData.vehicleNumber,
          owner: customer._id,
        },
      ]);
      setNewVehicleData({
        make: '',
        model: '',
        makeModel: '',
        makeModelName: '',
        year: '',
        vin: '',
        vehicleNumber: '',
      });
      setSelectedMakeModelForNew(null);
      setAddNewVehicle(false); // Close the form after successful submission
    } catch (error) {
      console.error('Error creating customer and vehicle:', error);
      setAddNewVehicle(false);
    }
  };

  const handleSelectVehicle = (vehicle) => {
    console.log('Customer Coming Here', customer);

    // If vehicle has makeModel as ID, try to find the name from makeModelOptions
    const vehicleWithMakeModelName = { ...vehicle };
    if (vehicle.makeModel && makeModelOptions.length > 0) {
      const makeModelData = makeModelOptions.find(
        (m) => m.value === vehicle.makeModel
      );
      if (makeModelData) {
        vehicleWithMakeModelName.makeModelName = makeModelData.label;
      }
    }

    onSelectCustomer(customer, vehicleWithMakeModelName);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size='lg'>
      <Modal.Header closeButton className='bg-primary text-white'>
        <Modal.Title>Find Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-4 bg-light'>
        <Form className='mb-4'>
          {/* Search Type Selection */}
          <Form.Group controlId='searchType' className='mb-4'>
            <Form.Label className='fw-bold'>Search By</Form.Label>
            <Form.Select
              value={searchType}
              onChange={(e) => {
                setSearchType(e.target.value);
                // Reset selections when changing search type
                setSelectedCustomer(null);
                setSelectedVehicle(null);
                setPhone('');
                setVehicleNumber('');
              }}
              className='form-select-lg'
            >
              <option value='customer'>Search by Customer</option>
              <option value='vehicle'>Search by Vehicle</option>
            </Form.Select>
          </Form.Group>

          {/* Conditional rendering based on search type */}
          {searchType === 'customer' ? (
            <Form.Group controlId='customerSelect' className='mb-3'>
              <Form.Label className='fw-bold'>Select Customer</Form.Label>
              <AsyncSelect
                cacheOptions
                defaultOptions={customerOptions}
                loadOptions={loadCustomerOptions}
                value={selectedCustomer}
                onChange={(option) => {
                  setSelectedCustomer(option);
                  setPhone(option ? option.value : '');
                }}
                isClearable
                placeholder='Search and select customer...'
                styles={{ container: (base) => ({ ...base, minWidth: 300 }) }}
              />
            </Form.Group>
          ) : (
            <Form.Group controlId='vehicleSelect' className='mb-3'>
              <Form.Label className='fw-bold'>Select Vehicle</Form.Label>
              <AsyncSelect
                cacheOptions
                defaultOptions={vehicleOptions}
                loadOptions={loadVehicleOptions}
                value={selectedVehicle}
                onChange={(option) => {
                  setSelectedVehicle(option);
                  setVehicleNumber(option ? option.value : '');
                }}
                isClearable
                placeholder='Search and select vehicle...'
                styles={{ container: (base) => ({ ...base, minWidth: 300 }) }}
              />
            </Form.Group>
          )}

          <div className='d-flex justify-content-end'>
            <Button
              variant='primary'
              onClick={handleSearch}
              disabled={isSearching}
              className='px-4'
            >
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </Form>
        {customer && (
          <div className='mt-3 border rounded p-3 bg-white shadow-sm'>
            <h4 className='mb-3'>Customer Details</h4>
            <div className='row mb-2'>
              <div className='col-md-4'>
                <strong>Name:</strong> {customer.name}
              </div>
              <div className='col-md-4'>
                <strong>Phone:</strong> {customer.phone}
              </div>
              <div className='col-md-4'>
                <strong>Email:</strong> {customer.email}
              </div>
            </div>
          </div>
        )}
        {searchedVehicles && (
          <Table striped bordered hover className='mt-4 bg-white shadow-sm'>
            <thead className='table-primary'>
              <tr>
                <th>Vehicle Number</th>
                <th>Make (Brand)</th>
                <th>Model</th>
                <th>Year</th>
                <th>VIN</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {searchedVehicles.map((vehicle) => (
                <tr key={vehicle.vehicle_number}>
                  <td>{vehicle.vehicle_number}</td>
                  <td>{vehicle.make}</td>
                  <td>{vehicle.model}</td>
                  <td>{vehicle.year}</td>
                  <td>{vehicle.vin}</td>
                  <td>
                    <Button
                      variant='success'
                      onClick={() => handleSelectVehicle(vehicle)}
                      size='sm'
                    >
                      Select
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {noUserFoundError && (
          <div className='alert alert-danger mt-3'>
            No customer found with the provided phone or vehicle number.
          </div>
        )}
        {customer && (
          <div className='mt-4'>
            <Button
              variant='primary'
              onClick={() => setAddNewVehicle(true)}
              className='mb-3'
            >
              Add New Vehicle
            </Button>
            {addNewVehicle && (
              <div className='border rounded p-3 bg-white shadow-sm'>
                <h4 className='mb-3'>Add New Vehicle</h4>
                <Form onSubmit={handleAddNewVehicle} className='row g-3'>
                  <Form.Group controlId='makeModel' className='col-md-12'>
                    <Form.Label>Vehicle Make & Model</Form.Label>
                    <AsyncSelect
                      cacheOptions
                      defaultOptions={makeModelOptions}
                      loadOptions={loadMakeModelOptions}
                      value={selectedMakeModelForNew}
                      onChange={(option) => {
                        setSelectedMakeModelForNew(option);
                        setNewVehicleData((prev) => ({
                          ...prev,
                          makeModel: option ? option.value : '',
                          makeModelName: option ? option.label : '',
                          make: option ? option.label : '',
                          model: option ? option.label : '',
                        }));
                      }}
                      isClearable
                      placeholder='Search and select vehicle make & model...'
                      styles={{
                        container: (base) => ({ ...base, width: '100%' }),
                      }}
                    />
                    {vehicleFormErrors.makeModel && (
                      <div className='text-danger small mt-1'>
                        {vehicleFormErrors.makeModel}
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group controlId='year' className='col-md-4'>
                    <Form.Label>Vehicle Year</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Enter vehicle year'
                      value={newVehicleData.year}
                      onChange={handleVehicleInputChange}
                      isInvalid={!!vehicleFormErrors.year}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {vehicleFormErrors.year}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId='vin' className='col-md-4'>
                    <Form.Label>VIN (Optional)</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter vehicle VIN (17 characters)'
                      value={newVehicleData.vin}
                      onChange={handleVehicleInputChange}
                      isInvalid={!!vehicleFormErrors.vin}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {vehicleFormErrors.vin}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId='vehicleNumber' className='col-md-4'>
                    <Form.Label>Vehicle Number</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='MH12AB1234'
                      value={newVehicleData.vehicleNumber}
                      onChange={(e) => {
                        // Convert to uppercase and remove invalid characters
                        const value = e.target.value
                          .toUpperCase()
                          .replace(/[^A-Z0-9]/g, '')
                          .slice(0, 10);
                        setNewVehicleData((prev) => ({
                          ...prev,
                          vehicleNumber: value,
                        }));
                      }}
                      isInvalid={!!vehicleFormErrors.vehicleNumber}
                      maxLength={10}
                    />
                    <Form.Text className='text-muted'>
                      Format: AB12CD3456 (State-District-Letters-Numbers)
                    </Form.Text>
                    <Form.Control.Feedback type='invalid'>
                      {vehicleFormErrors.vehicleNumber}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className='col-12 d-flex justify-content-end'>
                    <Button
                      variant='primary'
                      type='submit'
                      className='mt-3 px-4'
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </div>
        )}
        {addNewCustomerAndVehicle && (
          <div
            id='addNewCustomerAndVehicle'
            className='border rounded p-3 bg-white shadow-sm mt-4'
          >
            <h4 className='mb-3'>Add New Customer and Vehicle</h4>
            <Form onSubmit={handleCreateVehicleAndCustomer} className='row g-3'>
              <Form.Group controlId='name' className='col-md-6'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter name'
                  value={newCustomerData.name}
                  onChange={handleInputChange}
                  isInvalid={!!formErrors.name}
                />
                <Form.Control.Feedback type='invalid'>
                  {formErrors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='email' className='col-md-6'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={newCustomerData.email}
                  onChange={handleInputChange}
                  isInvalid={!!formErrors.email}
                />
                <Form.Control.Feedback type='invalid'>
                  {formErrors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='phone' className='col-md-4'>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter 10-digit phone number'
                  value={newCustomerData.phone}
                  onChange={(e) => {
                    // Allow only numbers and limit to 10 digits
                    const value = e.target.value
                      .replace(/\D/g, '')
                      .slice(0, 10);
                    setNewCustomerData((prev) => ({ ...prev, phone: value }));
                  }}
                  isInvalid={!!formErrors.phone}
                  maxLength={10}
                />
                <Form.Text className='text-muted'>
                  Format: 9876543210 (10 digits, starting with 6-9)
                </Form.Text>
                <Form.Control.Feedback type='invalid'>
                  {formErrors.phone}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='makeModel' className='col-md-8'>
                <Form.Label>Vehicle Make & Model</Form.Label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions={makeModelOptions}
                  loadOptions={loadMakeModelOptions}
                  value={selectedMakeModel}
                  onChange={(option) => {
                    setSelectedMakeModel(option);
                    setNewCustomerData((prev) => ({
                      ...prev,
                      makeModel: option ? option.value : '',
                      makeModelName: option ? option.label : '',
                      make: option ? option.label : '',
                      model: option ? option.label : '',
                    }));
                  }}
                  isClearable
                  placeholder='Search and select vehicle make & model...'
                  styles={{ container: (base) => ({ ...base, width: '100%' }) }}
                />
                {formErrors.makeModel && (
                  <div className='text-danger small mt-1'>
                    {formErrors.makeModel}
                  </div>
                )}
              </Form.Group>
              <Form.Group controlId='year' className='col-md-4'>
                <Form.Label>Vehicle Year</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter vehicle year'
                  value={newCustomerData.year}
                  onChange={handleInputChange}
                  isInvalid={!!formErrors.year}
                />
                <Form.Control.Feedback type='invalid'>
                  {formErrors.year}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='vin' className='col-md-4'>
                <Form.Label>VIN (Optional)</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter vehicle VIN (17 characters)'
                  value={newCustomerData.vin}
                  onChange={handleInputChange}
                  isInvalid={!!formErrors.vin}
                />
                <Form.Control.Feedback type='invalid'>
                  {formErrors.vin}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='vehicleNumber' className='col-md-4'>
                <Form.Label>Vehicle Number</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='MH12AB1234'
                  value={newCustomerData.vehicleNumber}
                  onChange={(e) => {
                    // Convert to uppercase and remove invalid characters
                    const value = e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z0-9]/g, '')
                      .slice(0, 10);
                    setNewCustomerData((prev) => ({
                      ...prev,
                      vehicleNumber: value,
                    }));
                  }}
                  isInvalid={!!formErrors.vehicleNumber}
                  maxLength={10}
                />
                <Form.Text className='text-muted'>
                  Format: AB12CD3456 (State-District-Letters-Numbers)
                </Form.Text>
                <Form.Control.Feedback type='invalid'>
                  {formErrors.vehicleNumber}
                </Form.Control.Feedback>
              </Form.Group>
              <div className='col-12 d-flex justify-content-end'>
                <Button variant='primary' type='submit' className='mt-3 px-4'>
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between bg-light'>
        <Button
          variant='outline-primary'
          onClick={() => setAddNewCustomerAndVehicle(true)}
        >
          Add New Customer & Vehicle
        </Button>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FindCustomerComponent;
