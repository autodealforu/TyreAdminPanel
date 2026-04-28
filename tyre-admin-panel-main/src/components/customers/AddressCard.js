import { Form } from 'formik';
import React from 'react';
import { INDIAN_STATES } from '../../domain/Enums';
import { SelectBox, TextInput } from '../Form/Form';

function AddressCard({ formik }) {
  return (
    <Form>
      <div className='row'>
        <div className='col-md-6'>
          <TextInput label='Address 1' name='address_1' type='text' />
        </div>
        <div className='col-md-6'>
          <TextInput label='Address 2' name='address_2' type='text' />
        </div>
        <div className='col-md-6'>
          <TextInput label='Landmark' name='landmark' type='text' />
        </div>
        <div className='col-md-6'>
          <TextInput label='City' name='city' type='text' />
        </div>
        <div className='col-md-6'>
          <SelectBox label='State' name='state'>
            <option value=''> --none-- </option>
            {INDIAN_STATES &&
              INDIAN_STATES.map((item) => {
                return <option value={item.label}> {item.value} </option>;
              })}
          </SelectBox>
        </div>
        <div className='col-md-6'>
          <TextInput label='Pin *' name='pin' type='text' />
        </div>
        <div className='col-md-6'>
          <TextInput
            label='Latitude'
            name='latitude'
            type='number'
            step='any'
          />
        </div>
        <div className='col-md-6'>
          <TextInput
            label='Longitude'
            name='longitude'
            type='number'
            step='any'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12 m-3'>
          <button type='submit' className='btn btn-success'>
            {formik.isSubmitting ? 'Processing...' : 'Save'}
          </button>
        </div>
      </div>
    </Form>
  );
}

export default AddressCard;
