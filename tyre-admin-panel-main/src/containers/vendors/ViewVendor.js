import React, { useEffect } from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import Spinner from '../../components/layout/Spinner';
import {
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
  SIDEBAR_OPTIONS,
} from '../../shared/enums/vendors_enum';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  CheckBox,
  FileUpload,
  HTMLEditor,
  SelectBox,
  TextInput,
} from '../../components/Form/Form';
import SingleView from '../../components/common/SingleView';
import {
  useSingleVendor,
  useUpdateVendor,
  useAddPickupAddressVendor,
} from '../../shared/hooks/UseVendor';
import { useState } from 'react';
import AddressCard from '../../components/customers/AddressCard';
import { URI } from '../../domain/constant';
import renderHTML from 'react-render-html';
import { useLoggedInUser } from '../../shared/hooks/UseAuth';
const ViewVendor = ({ match }) => {
  const [data] = useSingleVendor(match.params.id);
  const [updatePickupAddress, updatedAddress] = useAddPickupAddressVendor(
    match.params.id
  );
  const { vendor_loading, vendor } = data;
  const [changeProfileStatus, setChangeProfileStatus] = useState(false);
  const [updateData] = useUpdateVendor();
  const [editAddressID, setEditAddressID] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectEditVendorProfile, setSelectEditVendorProfile] = useState(false);
  const [selectEditBankInformation, setSelectEditBankInformation] =
    useState(false);
  const [loggedInUser] = useLoggedInUser();
  const { user } = loggedInUser;

  return (
    <div className='pace-done'>
      <div>
        <Header />
        <BreadCrumb
          title={PAGE_SINGLE_TITLE}
          mainLinkTitle='Dashboard'
          mainLinkUrl=''
          activeLink='View'
        />
        {!vendor_loading ? (
          vendor && (
            <SingleView
              data={vendor}
              inputFields={inputFields}
              label={PAGE_SINGLE_TITLE}
              link={LINK_URL}
              id={vendor._id}
              SIDEBAR_OPTIONS={SIDEBAR_OPTIONS}
              col={4}
            >
              <div className='card'>
                <div className='card-header'>
                  <h4 className='card-title'> Profile Status </h4>
                  {/* <div>
                    <button
                      onClick={() => updatePickupAddress(match.params.id)}
                    >
                      {' '}
                      Add Pickup address{' '}
                    </button>
                  </div> */}
                </div>
                <div className='card-body'>
                  <div className='d-flex justify-content-between'>
                    <div> Profile Status </div>
                    <div>{vendor.vendor && vendor.vendor.profile_status}</div>
                  </div>
                  <div className='d-flex justify-content-between'>
                    <div> Store Status </div>
                    <div>
                      {vendor.vendor && vendor.vendor.store_active
                        ? 'YES'
                        : 'NO'}
                    </div>
                  </div>
                </div>
              </div>
              <div className='card'>
                <div className='card-header'>
                  <div className='d-flex justify-content-between'>
                    <div>
                      {' '}
                      <h4 className='card-title'> Vendor Profile </h4>
                    </div>
                    <div>
                      {' '}
                      <button
                        className='btn btn-sm btn-primary'
                        onClick={() =>
                          setSelectEditVendorProfile(!selectEditVendorProfile)
                        }
                      >
                        {' '}
                        <i
                          className={
                            selectEditVendorProfile
                              ? 'fa fa-minus'
                              : 'fa fa-edit'
                          }
                        ></i>
                      </button>{' '}
                    </div>
                  </div>
                </div>
                {!selectEditVendorProfile ? (
                  <div className='card-body'>
                    <div className='d-flex justify-content-between '>
                      <div>Store Name</div>
                      <div> {vendor.vendor && vendor.vendor.store_name} </div>
                    </div>
                    <div className='d-flex justify-content-between '>
                      <div>Store Logo</div>
                      <div>
                        {' '}
                        {vendor.vendor && vendor.vendor.store_logo && (
                          <img
                            src={`${URI}${vendor.vendor.store_logo}`}
                            style={{ height: '100px', objectFit: 'contain' }}
                          />
                        )}{' '}
                      </div>
                    </div>
                    <div className='d-flex justify-content-between '>
                      <div>GST No</div>
                      <div> {vendor.vendor && vendor.vendor.gst_no} </div>
                    </div>
                    <div className='d-flex justify-content-between '>
                      <div>GST Document</div>
                      <div>
                        {' '}
                        {vendor.vendor && vendor.vendor.gst_certificate && (
                          <a
                            href={`${URI}${vendor.vendor.gst_certificate}`}
                            target='_blank'
                          >
                            {' '}
                            View{' '}
                          </a>
                        )}{' '}
                      </div>
                    </div>

                    <div className='d-flex justify-content-between '>
                      <div>Pan No</div>
                      <div> {vendor.vendor && vendor.vendor.pan_no}</div>
                    </div>
                    <div className='d-flex justify-content-between '>
                      <div>Pan Attachment</div>
                      <div>
                        {' '}
                        {vendor.vendor && vendor.vendor.pan && (
                          <a
                            href={`${URI}${vendor.vendor.pan}`}
                            target='_blank'
                          >
                            {' '}
                            View{' '}
                          </a>
                        )}
                      </div>
                    </div>

                    <div className='d-flex justify-content-between '>
                      <div>Addhar No</div>
                      <div> {vendor.vendor && vendor.vendor.adhaar_no}</div>
                    </div>

                    <div className='d-flex justify-content-between '>
                      <div>Adhaar Attachment</div>
                      <div>
                        {' '}
                        {vendor.vendor &&
                          vendor.vendor.adhaar_certificate_front && (
                            <a
                              href={`${URI}${vendor.vendor.adhaar_certificate_front}`}
                              target='_blank'
                            >
                              {' '}
                              View Front Side{' '}
                            </a>
                          )}
                        {vendor.vendor &&
                          vendor.vendor.adhaar_certificate_back && (
                            <a
                              href={`${URI}${vendor.vendor.adhaar_certificate_back}`}
                              target='_blank'
                            >
                              {' '}
                              View Back Side{' '}
                            </a>
                          )}
                      </div>
                    </div>

                    <div className='d-flex justify-content-between '>
                      <div>Store Description</div>
                    </div>
                    <div>
                      {' '}
                      {vendor.vendor &&
                        vendor.vendor.store_description &&
                        renderHTML(vendor.vendor.store_description)}{' '}
                    </div>
                  </div>
                ) : (
                  <div className='card-body'>
                    <Formik
                      initialValues={vendor.vendor}
                      validationSchema={Yup.object({})}
                      onSubmit={async (
                        values,
                        { setSubmitting, resetForm }
                      ) => {
                        setSubmitting(true);
                        await updateData(match.params.id, {
                          vendor: values,
                        });
                        setSelectEditVendorProfile(false);
                        resetForm();
                        setSubmitting(false);
                      }}
                    >
                      {(formik) => {
                        console.log(formik);
                        return (
                          <Form>
                            <div className='row'>
                              <div className='col-md-6'>
                                <TextInput
                                  label='Store Name'
                                  name='store_name'
                                  type='text'
                                />
                              </div>
                              {user && user.role === 'SUPER ADMIN' && (
                                <div className='col-md-6'>
                                  <SelectBox
                                    label='Profile Status'
                                    name='profile_status'
                                  >
                                    <option value=''> -- None-- </option>
                                    <option value='UNDER REVIEW'>
                                      UNDER REVIEW
                                    </option>
                                    <option value='APPROVED'>APPROVED</option>
                                    <option value='REJECTED'>REJECTED</option>
                                  </SelectBox>
                                </div>
                              )}

                              <div className='col-md-6'>
                                <CheckBox
                                  label='Is Store Active?'
                                  name='store_active'
                                />
                              </div>
                              <div className='col-md-12'>
                                <HTMLEditor
                                  title='Store Description'
                                  item='store_description'
                                  formik={formik}
                                  col={12}
                                  value={
                                    formik.values &&
                                    formik.values.store_description
                                  }
                                />
                              </div>
                              <div className='col-md-6'>
                                <TextInput
                                  label='GST No'
                                  name='gst_no'
                                  type='text'
                                />
                              </div>
                              <FileUpload
                                title='GST Certificate'
                                item='gst_certificate'
                                formik={formik}
                                value={formik.values.gst_certificate}
                              />

                              <FileUpload
                                title='Logo'
                                item='store_logo'
                                formik={formik}
                                value={formik.values.store_logo}
                              />
                              <div className='col-md-6'>
                                <TextInput
                                  label='PAN No'
                                  name='pan_no'
                                  type='text'
                                />
                              </div>
                              <FileUpload
                                title='Pan Card'
                                item='pan'
                                formik={formik}
                                value={formik.values.pan}
                              />
                              <div className='col-md-6'>
                                <TextInput
                                  label='Adhaar No'
                                  name='adhaar_no'
                                  type='text'
                                />
                              </div>
                              <FileUpload
                                title='Adhaar Front'
                                item='adhaar_certificate_front'
                                formik={formik}
                                value={formik.values.adhaar_certificate_front}
                              />
                              <FileUpload
                                title='Adhaar Back'
                                item='adhaar_certificate_back'
                                formik={formik}
                                value={formik.values.adhaar_certificate_back}
                              />
                            </div>
                            <div className='row'>
                              <div className='col-md-12 text-center m-3'>
                                <button
                                  type='submit'
                                  className='btn btn-success'
                                >
                                  {formik.isSubmitting
                                    ? 'Processing...'
                                    : 'Save'}
                                </button>
                              </div>
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                )}
              </div>
              <div className='card'>
                <div className='card-header'>
                  <div className='d-flex justify-content-between'>
                    <div>
                      {' '}
                      <h4 className='card-title'> Bank Account Information </h4>
                    </div>
                    <div>
                      {' '}
                      <button
                        className='btn btn-sm btn-primary'
                        onClick={() =>
                          setSelectEditBankInformation(
                            !selectEditBankInformation
                          )
                        }
                      >
                        {' '}
                        <i
                          className={
                            selectEditBankInformation
                              ? 'fa fa-minus'
                              : 'fa fa-edit'
                          }
                        ></i>
                      </button>{' '}
                    </div>
                  </div>
                </div>
                {!selectEditBankInformation ? (
                  <div className='card-body'>
                    <div className='d-flex justify-content-between '>
                      <div>Bank Name</div>
                      <div> {vendor.vendor && vendor.vendor.bank_name} </div>
                    </div>
                    <div className='d-flex justify-content-between '>
                      <div>Cancelled Cheque</div>
                      <div>
                        {' '}
                        {vendor.vendor && vendor.vendor.cancelled_cheque && (
                          <a
                            href={`${URI}${vendor.vendor.cancelled_cheque}`}
                            target='_blank'
                          >
                            {' '}
                            View{' '}
                          </a>
                        )}{' '}
                      </div>
                    </div>
                    <div className='d-flex justify-content-between '>
                      <div>Account No</div>
                      <div>
                        {' '}
                        {vendor.vendor && vendor.vendor.account_number}{' '}
                      </div>
                    </div>

                    <div className='d-flex justify-content-between '>
                      <div>IFSC Code</div>
                      <div> {vendor.vendor && vendor.vendor.ifsc_code}</div>
                    </div>
                  </div>
                ) : (
                  <div className='card-body'>
                    <Formik
                      initialValues={vendor.vendor}
                      validationSchema={Yup.object({})}
                      onSubmit={async (
                        values,
                        { setSubmitting, resetForm }
                      ) => {
                        setSubmitting(true);
                        await updateData(match.params.id, {
                          vendor: values,
                        });
                        setSelectEditBankInformation(false);
                        resetForm();
                        setSubmitting(false);
                      }}
                    >
                      {(formik) => {
                        console.log(formik);
                        return (
                          <Form>
                            <div className='row'>
                              <div className='col-md-6'>
                                <TextInput
                                  label='Bank Name'
                                  name='bank_name'
                                  type='text'
                                />
                              </div>

                              <div className='col-md-6'>
                                <TextInput
                                  label='IFSC Code'
                                  name='ifsc_code'
                                  type='text'
                                />
                              </div>
                              <div className='col-md-6'>
                                <TextInput
                                  label='Account No'
                                  name='account_number'
                                  type='text'
                                />
                              </div>
                              <FileUpload
                                title='Cancelled Cheque'
                                item='cancelled_cheque'
                                formik={formik}
                                value={formik.values.cancelled_cheque}
                              />
                            </div>
                            <div className='row'>
                              <div className='col-md-12 text-center m-3'>
                                <button
                                  type='submit'
                                  className='btn btn-success'
                                >
                                  {formik.isSubmitting
                                    ? 'Processing...'
                                    : 'Save'}
                                </button>
                              </div>
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                )}
              </div>

              {vendor &&
              vendor.vendor &&
              vendor.vendor.pickup_address &&
              vendor.vendor.pickup_address.length > 0 ? (
                vendor.vendor.pickup_address.map((item, index) => {
                  return (
                    <>
                      {editAddressID &&
                      editAddressID === item._id &&
                      selectedAddress ? (
                        <div className='card'>
                          <div className='card-header'>
                            <div className='d-flex justify-content-between'>
                              <div>
                                <strong>Edit Address {index + 1}</strong>{' '}
                              </div>
                              <div>
                                {' '}
                                <button
                                  className='btn btn-sm btn-primary'
                                  onClick={() => setEditAddressID(null)}
                                >
                                  {' '}
                                  <i className='fa fa-minus'></i>
                                </button>{' '}
                              </div>
                            </div>
                          </div>
                          <div className='card-body'>
                            <Formik
                              initialValues={{
                                address_1: selectedAddress.address_1,
                                address_2: selectedAddress.address_2,
                                city: selectedAddress.city,
                                state: selectedAddress.state,
                                landmark: selectedAddress.landmark,
                                pin: selectedAddress.pin,
                                latitude: selectedAddress.latitude,
                                longitude: selectedAddress.longitude,
                              }}
                              validationSchema={Yup.object({
                                address_1: Yup.string().required('Required'),
                                city: Yup.string().required('Required'),
                                state: Yup.string().required('Required'),
                                pin: Yup.string().required('Required'),
                              })}
                              onSubmit={async (
                                values,
                                { setSubmitting, resetForm }
                              ) => {
                                setSubmitting(true);
                                const mappedAddress =
                                  vendor.vendor.pickup_address.map((item) => {
                                    if (item._id == editAddressID) {
                                      return values;
                                    }
                                  });
                                await updateData(match.params.id, {
                                  vendor: { pickup_address: mappedAddress },
                                });
                                setSelectedAddress(false);
                                resetForm();
                                setSubmitting(false);
                              }}
                            >
                              {(formik) => {
                                console.log(formik);
                                return <AddressCard formik={formik} />;
                              }}
                            </Formik>
                          </div>
                        </div>
                      ) : (
                        <div className='card'>
                          <div className='card-header'>
                            <div className='d-flex justify-content-between'>
                              <div>
                                <strong>Address {index + 1}</strong>{' '}
                              </div>
                              <div>
                                {' '}
                                <button
                                  className='btn btn-sm btn-primary'
                                  onClick={() => {
                                    setEditAddressID(item._id);
                                    setSelectedAddress(item);
                                  }}
                                >
                                  {' '}
                                  <i className='fa fa-edit'></i>
                                </button>{' '}
                              </div>
                            </div>
                          </div>
                          <div className='card-body'>
                            <div>
                              <p>
                                {' '}
                                Address 1: {item.address_1} {item.address_2}{' '}
                              </p>
                              <p> Landmark : {item.landmark} </p>
                              <p> City : {item.city} </p>
                              <p> State : {item.state} </p>
                              <p> Pincode : {item.pin} </p>
                              {item.latitude && (
                                <p> Latitude : {item.latitude} </p>
                              )}
                              {item.longitude && (
                                <p> Longitude : {item.longitude} </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })
              ) : (
                <div className='card'>
                  <div className='card-header'>
                    <div>
                      {' '}
                      <h4 className='card-title'> Pickup Address </h4>
                    </div>
                  </div>
                  <div className='card-body'>
                    <Formik
                      initialValues={{
                        address_1: '',
                        address_2: '',
                        city: '',
                        state: '',
                        landmark: '',
                        pin: '',
                        latitude: '',
                        longitude: '',
                      }}
                      validationSchema={Yup.object({
                        address_1: Yup.string().required('Required'),
                        city: Yup.string().required('Required'),
                        state: Yup.string().required('Required'),
                        pin: Yup.string().required('Required'),
                      })}
                      onSubmit={async (
                        values,
                        { setSubmitting, resetForm }
                      ) => {
                        setSubmitting(true);
                        const mappedAddress = [];
                        mappedAddress.push(values);
                        await updateData(match.params.id, {
                          vendor: { pickup_address: mappedAddress },
                        });
                        setSelectedAddress(false);
                        resetForm();
                        setSubmitting(false);
                      }}
                    >
                      {(formik) => {
                        console.log(formik);
                        return <AddressCard formik={formik} />;
                      }}
                    </Formik>
                  </div>
                </div>
              )}

              <div className='card'>
                <div className='card-header'>
                  <h4 className='card-title'>Change Password</h4>
                </div>
                <div className='card-body'>
                  <Formik
                    initialValues={{
                      password: '',
                      confirm_password: '',
                    }}
                    validationSchema={Yup.object({
                      password: Yup.string().required('Required'),
                      confirm_password: Yup.string().oneOf(
                        [Yup.ref('password'), null],
                        'Passwords must match'
                      ),
                    })}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                      setSubmitting(true);
                      await updateData(match.params.id, values);
                      resetForm();
                      setSubmitting(false);
                    }}
                  >
                    {(formik) => {
                      console.log(formik);
                      return (
                        <Form>
                          <div className='row'>
                            <div className='col-md-12'>
                              <TextInput
                                label='Password'
                                name='password'
                                type='password'
                              />
                            </div>
                            <div className='col-md-12'>
                              <TextInput
                                label='Confirm Password'
                                name='confirm_password'
                                type='password'
                              />
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-md-12 text-center m-3'>
                              <button type='submit' className='btn btn-success'>
                                {formik.isSubmitting ? 'Processing...' : 'Save'}
                              </button>
                            </div>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </SingleView>
          )
        ) : (
          <div>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewVendor;
