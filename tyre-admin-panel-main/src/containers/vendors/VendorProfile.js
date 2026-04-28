import React, { useState, useEffect } from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import { useHistory } from 'react-router-dom';
import VendorForm from '../../components/vendors/VendorForm';
import { convertToFormData } from '../../shared/upload';
import {
  initialValues,
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from '../../shared/enums/vendors_enum';
import {
  useCreateVendor,
  useGetDropdownOptions,
} from '../../shared/hooks/UseVendor';
import VendorProfileComponent from '../../components/vendors/VendorProfileComponent';
// import { useSelectAllVendor } from "../../shared/hooks/UseVendor";
import { useLoggedInUser } from '../../shared/hooks/UseAuth';

const VendorProfile = ({ }) => {
  const [user_data] = useLoggedInUser();
  const { user } = user_data;
  return (
    <div className='pace-done'>
      <div>
        <Header />
        <BreadCrumb
          title={`Vendor Profile`}
          mainLinkTitle={PAGE_TITLE}
          mainLinkUrl=""
          activeLink='Add'
        />
      </div>
      {user && <VendorProfileComponent vendor_id={user._id} />}
    </div>
  );
};

export default VendorProfile;
