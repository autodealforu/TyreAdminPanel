import React, { useState, useMemo } from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/layout/Spinner';
import JobCardForm from '../../components/job-cards/JobCardForm';
import {
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from '../../shared/enums/job_cards_enum';
import {
  useUpdateJobCard,
  useSingleJobCard,
  useGetDropdownOptions,
} from '../../shared/hooks/UseJobCard';

const EditJobCard = ({ match }) => {
  let history = useHistory();
  const [single_data] = useSingleJobCard(match.params.id);
  const [updateData] = useUpdateJobCard();
  const { job_card_loading, job_card, edit_job_card_loading } = single_data;
  const [featuredImage, setFeaturedImage] = useState(null);

  const [dropdownOptions, loadOptions] = useGetDropdownOptions();

  // FIXED: Create dynamic initialValues from existing job_card data
  // This ensures that when editing, all fields including prices are pre-populated
  const initialValues = useMemo(() => {
    if (!job_card) {
      return {
        customer: '',
        vendor: '',
        job_card_number: '',
        vehicle: '',
        service_type: '',
        service_description: '',
        service_date: '',
        service_status: 'Pending',
        service_notes: '',
        service_technician: '',
        services_used: [],
        products_used: [],
        service_parts_used: [],
        service_labor_cost: '',
        service_total_cost: '',
        service_payment_status: 'Unpaid',
        service_payment_method: '',
        service_payment_date: '',
        service_images: [],
        service_documents: [],
        month_year: '',
        form_type: [],
        odometer_reading: '',
        next_service_due_odometer_reading: 5000,
        wheel_alignment_service: '',
        brake_pad_status: '',
        tyres_changed_or_purchased: 0,
        wheel_balancing_done: 0,
        nalki_used: 0,
        other_services: '',
        check_list: [],
        terms_and_conditions_accepted: false,
      };
    }

    // Pre-populate all fields with existing job_card data
    // Handles both populated references (_id) and direct values
    return {
      customer: job_card.customer?._id || job_card.customer || '',
      vendor: job_card.vendor?._id || job_card.vendor || '',
      job_card_number: job_card.job_card_number || '',
      vehicle: job_card.vehicle?._id || job_card.vehicle || '',
      service_type: job_card.service_type || '',
      service_description: job_card.service_description || '',
      service_date: job_card.service_date
        ? new Date(job_card.service_date).toISOString().split('T')[0]
        : '',
      service_status: job_card.service_status || 'Pending',
      service_notes: job_card.service_notes || '',
      service_technician: job_card.service_technician?._id || job_card.service_technician || '',
      // Array fields with line items - FIXED: Now includes prices!
      services_used: job_card.services_used || [],
      products_used: job_card.products_used || [],
      service_parts_used: job_card.service_parts_used || [],
      service_labor_cost: job_card.service_labor_cost || '',
      service_total_cost: job_card.service_total_cost || '',
      service_payment_status: job_card.service_payment_status || 'Unpaid',
      service_payment_method: job_card.service_payment_method || '',
      service_payment_date: job_card.service_payment_date
        ? new Date(job_card.service_payment_date).toISOString().split('T')[0]
        : '',
      service_images: job_card.service_images || [],
      service_documents: job_card.service_documents || [],
      // Zoho compliance fields
      month_year: job_card.month_year || '',
      form_type: job_card.form_type || [],
      odometer_reading: job_card.odometer_reading || '',
      next_service_due_odometer_reading:
        job_card.next_service_due_odometer_reading || 5000,
      wheel_alignment_service: job_card.wheel_alignment_service || '',
      brake_pad_status: job_card.brake_pad_status || '',
      tyres_changed_or_purchased: job_card.tyres_changed_or_purchased || 0,
      wheel_balancing_done: job_card.wheel_balancing_done || 0,
      nalki_used: job_card.nalki_used || 0,
      other_services: job_card.other_services || '',
      check_list: job_card.check_list || [],
      terms_and_conditions_accepted: job_card.terms_and_conditions_accepted || false,
    };
  }, [job_card]);

  const submitFormClicked = async (values) => {
    await updateData(job_card._id, values);
    history.push(`/${LINK_URL}/${job_card._id}/view`);
  };

  return (
    <div className='pace-done'>
      <div>
        <Header />
        <BreadCrumb
          title={`Edit ${PAGE_SINGLE_TITLE}`}
          mainLinkTitle={PAGE_TITLE}
          mainLinkUrl={LINK_URL}
          activeLink='Edit'
        />
      </div>
      <div className='container-fluid'>
        <div className='col-lg-12'>
          <div className='card'>
            {!job_card_loading ? (
              job_card && (
                <div>
                  <div className='card-header'>
                    <div>
                      <h4 className='card-title'>
                        Job Card #{job_card.job_card_number} -{' '}
                        <span>Edit</span>
                      </h4>
                      <p className='card-title-desc'>
                        <Link
                          to={`/${LINK_URL}`}
                          className='btn btn-soft-light'
                        >
                          <i className='fa fa-angle-left'></i> {PAGE_TITLE}
                        </Link>
                        <Link
                          to={`/${LINK_URL}/${job_card._id}/view`}
                          className='btn btn-soft-light'
                        >
                          <i className='fa fa-eye'></i>
                        </Link>
                      </p>
                    </div>
                  </div>
                  <JobCardForm
                    data={job_card}
                    edit={true}
                    featuredImage={featuredImage}
                    setFeaturedImage={setFeaturedImage}
                    submitForm={submitFormClicked}
                    inputFields={inputFields}
                    initialValues={initialValues}
                    dropdown_options={dropdownOptions}
                    loading={edit_job_card_loading}
                    loadOptions={loadOptions}
                  />
                </div>
              )
            ) : (
              <div className='text-center'>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditJobCard;
