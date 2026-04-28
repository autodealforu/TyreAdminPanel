import { combineReducers } from 'redux';
import alert from './alert_reducer';
import auth from './auth_reducer';
import { banner_reducer } from './banner_reducer';
import { contact_reducer } from './contact_reducer';
import { product_reducer } from './product_reducer';
import { category_reducer } from './category_reducer';
import { blog_reducer } from './blog_reducer';
import { coupon_reducer } from './coupon_reducer';
import { customer_reducer } from './customer_reducer';
import { order_reducer } from './order_reducer';
import { notification_reducer } from './notification_reducer';
import { dashboard_reducer } from './dashboard_reducer';
import { mobilebanner_reducer } from './mobilebanner_reducer';
import { sitepage_reducer } from './sitepage_reducer';
import { testimonial_reducer } from './testimonial_reducer';
import { review_reducer } from './review_reducer';
import { vendor_reducer } from './vendor_reducer';
import { template_reducer } from './template_reducer';
import { productcategory_reducer } from './productcategory_reducer';
import { variation_reducer } from './variation_reducer';
import { frame_reducer } from './frame_reducer';
import { subcategory_reducer } from './subcategory_reducer';
import { subsubcategory_reducer } from './subsubcategory_reducer';
import { subsubsubcategory_reducer } from './subsubsubcategory_reducer';
import { subsubsubsubcategory_reducer } from './subsubsubsubcategory_reducer';
import { size_reducer } from './size_reducer';
import { franchise_reducer } from './franchise_reducer';
import { bulk_reducer } from './bulk_reducer';
import { part_reducer } from './part_reducer';
import { vehicle_reducer } from './vehicle_reducer';
import { service_reducer } from './service_reducer';
import { technician_reducer } from './technician_reducer';
import { job_card_reducer } from './job_card_reducer';
import { brand_reducer } from './brand_reducer';
import { makemodel_reducer } from './makemodel_reducer';
import { tyre_reducer } from './tyre_reducer';
import { rimdiameter_reducer } from './rimdiameter_reducer';
import { tyrewidth_reducer } from './tyrewidth_reducer';
import { aspectratio_reducer } from './aspectratio_reducer';
import { loadindex_reducer } from './loadindex_reducer';
import { speedsymbol_reducer } from './speedsymbol_reducer';
import { plyrating_reducer } from './plyrating_reducer';
import { threadpattern_reducer } from './threadpattern_reducer';
import { producttype_reducer } from './producttype_reducer';
import { alloywheel_reducer } from './alloywheel_reducer';
import { alloydiameter_reducer } from './alloydiameter_reducer';
import { alloywidth_reducer } from './alloywidth_reducer';
import { alloypcd_reducer } from './alloypcd_reducer';
import { alloyoffset_reducer } from './alloyoffset_reducer';
import { alloyfinish_reducer } from './alloyfinish_reducer';
import alloybore_reducer from './alloybore_reducer';
import unified_product_reducer from './unified_product_reducer';

export default combineReducers({
  alert,
  auth,
  banner: banner_reducer,
  contact: contact_reducer,
  product: product_reducer,
  category: category_reducer,
  blog: blog_reducer,
  coupon: coupon_reducer,
  customer: customer_reducer,
  order: order_reducer,
  notification: notification_reducer,
  dashboard: dashboard_reducer,
  mobilebanner: mobilebanner_reducer,
  sitepage: sitepage_reducer,
  testimonial: testimonial_reducer,
  review: review_reducer,
  vendor: vendor_reducer,
  template: template_reducer,
  productcategory: productcategory_reducer,
  variation: variation_reducer,
  frame: frame_reducer,
  subcategory: subcategory_reducer,
  subsubcategory: subsubcategory_reducer,
  subsubsubcategory: subsubsubcategory_reducer,
  subsubsubsubcategory: subsubsubsubcategory_reducer,
  size: size_reducer,
  franchise: franchise_reducer,
  bulk: bulk_reducer,
  part: part_reducer,
  vehicle: vehicle_reducer,
  service: service_reducer,
  technician: technician_reducer,
  job_card: job_card_reducer,
  brand: brand_reducer,
  makemodel: makemodel_reducer,
  tyre: tyre_reducer,
  rimdiameter: rimdiameter_reducer,
  tyrewidth: tyrewidth_reducer,
  aspectratio: aspectratio_reducer,
  loadindex: loadindex_reducer,
  speedsymbol: speedsymbol_reducer,
  plyrating: plyrating_reducer,
  threadpattern: threadpattern_reducer,
  producttype: producttype_reducer,
  alloywheel: alloywheel_reducer,
  alloywidth: alloywidth_reducer,
  alloydiameter: alloydiameter_reducer,
  alloypcd: alloypcd_reducer,
  alloyoffset: alloyoffset_reducer,
  alloyfinish: alloyfinish_reducer,
  alloybore: alloybore_reducer,
  unified_product: unified_product_reducer,
});
