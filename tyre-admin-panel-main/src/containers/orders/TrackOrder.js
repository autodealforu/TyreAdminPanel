import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useSingleOrder } from '../../shared/hooks/UseOrder';
import api from '../../domain/api';
import moment from 'moment';

export const TrackOrder = ({ match }) => {
  const [estimates, setEstimates] = useState(null);
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [data, reloadData] = useSingleOrder(match.params.id);
  const { order_loading, order, edit_order_loading } = data;
  const getCourierOption = async () => {
    const { data } = await api.post(
      `/orders/${order._id}/shipping/check-estimate`
    );
    setEstimates(data);
  };

  const createOrderPickup = async (courier_id) => {
    const { data } = await api.post(
      `/orders/${order._id}/shipping/create-pickup`,
      { courier_id }
    );
    // setEstimates(data);
    window.location.reload();
  };

  useEffect(() => {
    if (order && order.courier_details && order.courier_details.shipment_id) {
      const getOrderTracking = async () => {
        const { data } = await api.post(
          `/orders/${order._id}/shipping/track-order`
        );
        setTrackingInfo(data);
      };
      getOrderTracking();
      console.log('Runnning HEre');
    }
  }, [order && order.courier_details && order.courier_details.shipment_id]);

  return (
    <div className='container'>
      <div className='card'>
        <div className='card-header'>
          <div className='text-center'>
            <h3>Track Order ({order?.order_id}) </h3>
          </div>
        </div>
        <div className='card-body'>
          <div>
            {order?.courier_details?.shipment_id ? (
              <div>
                <div>
                  {' '}
                  Status: <strong>{trackingInfo?.status}</strong>{' '}
                </div>
                <div>
                  {' '}
                  Courier: <strong>{trackingInfo?.courier_name}</strong>{' '}
                </div>
                <hr />
                {trackingInfo &&
                  trackingInfo.details &&
                  trackingInfo.details.map((item) => {
                    return (
                      <div className='d-flex justify-content-between border-bottom p-3'>
                        <div>
                          {' '}
                          Note <br /> Time{' '}
                        </div>
                        <div>
                          {item.notes} <br />
                          {item.datetime &&
                            moment(item.datetime).format('DD-MM-YYYY HH:m A')}
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div>
                {/* Check For Courier Charges */}
                <div>Order is not ready for pickup</div>
                <div className='text-center'>
                  <a
                    className='btn btn-primary'
                    onClick={() => getCourierOption()}
                  >
                    {' '}
                    Ready for Pickup{' '}
                  </a>
                </div>
                {estimates &&
                  estimates.estimate &&
                  estimates.estimate.map((item) => {
                    return (
                      <div>
                        <div>{item.courier_id}</div>
                        <div>{item.courier_name}</div>
                        <div>{item.courier_group_name}</div>
                        <div>{item.courier_cost}</div>
                        <div>
                          {' '}
                          <a onClick={() => createOrderPickup(item.courier_id)}>
                            {' '}
                            Add To Pickup{' '}
                          </a>{' '}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
        <div className='card-footer'>
          <div className='text-center'>
            <Link to={`/orders/${order?._id}/view`} className='btn btn-primary'>
              {' '}
              Go Back to Order{' '}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
