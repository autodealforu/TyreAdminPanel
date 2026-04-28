import React, { useEffect } from 'react';
import './assets/css/bootstrap.min.css';
import './assets/css/app.min.css';
import './assets/css/custom.css';
import './assets/css/wysiwyg.css';
import './assets/css/responsive.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { loadUser } from './store/actions/auth';
import setAuthToken from './domain/setAuthToken';
import BeforeLoginRoutes from './shared/Routes/BeforeLoginRoutes';
import PrivateRoutes from './shared/Routes/PrivateRoutes';

import PageNotFound from './containers/notfound/PageNotFound';
import Login from './containers/login/Login';
import Dashboard from './containers/dashboard/Dashboard';
import Profile from './containers/profile/Profile';

import AddBanner from './containers/banners/AddBanner';
import AllBanners from './containers/banners/AllBanners';
import ViewBanner from './containers/banners/ViewBanner';
import EditBanner from './containers/banners/EditBanner';

import AddContact from './containers/contacts/AddContact';
import AllContacts from './containers/contacts/AllContacts';
import ViewContact from './containers/contacts/ViewContact';
import EditContact from './containers/contacts/EditContact';

import AddProduct from './containers/products/AddProduct';
import AllProducts from './containers/products/AllProducts';
import ViewProduct from './containers/products/ViewProduct';
import EditProduct from './containers/products/EditProduct';
import AddBulkProducts from './containers/products/AddBulkProducts';
import BulkUploadTyreReport from './containers/products/BulkUploadTyreReport';

import AddCategory from './containers/categorys/AddCategory';
import AllCategorys from './containers/categorys/AllCategorys';
import ViewCategory from './containers/categorys/ViewCategory';
import EditCategory from './containers/categorys/EditCategory';

import AddBlog from './containers/blogs/AddBlog';
import AllBlogs from './containers/blogs/AllBlogs';
import ViewBlog from './containers/blogs/ViewBlog';
import EditBlog from './containers/blogs/EditBlog';

import AddCoupon from './containers/coupons/AddCoupon';
import AllCoupons from './containers/coupons/AllCoupons';
import ViewCoupon from './containers/coupons/ViewCoupon';
import EditCoupon from './containers/coupons/EditCoupon';

import AddOrder from './containers/orders/AddOrder';
import AllOrders from './containers/orders/AllOrders';
import ViewOrder from './containers/orders/ViewOrder';
import EditOrder from './containers/orders/EditOrder';

import AddCustomer from './containers/customers/AddCustomer';
import AllCustomers from './containers/customers/AllCustomers';
import ViewCustomer from './containers/customers/ViewCustomer';
import EditCustomer from './containers/customers/EditCustomer';

import AddMobilebanner from './containers/mobilebanners/AddMobilebanner';
import AllMobilebanners from './containers/mobilebanners/AllMobilebanners';
import ViewMobilebanner from './containers/mobilebanners/ViewMobilebanner';
import EditMobilebanner from './containers/mobilebanners/EditMobilebanner';

import AddTestimonial from './containers/testimonials/AddTestimonial';
import AllTestimonials from './containers/testimonials/AllTestimonials';
import ViewTestimonial from './containers/testimonials/ViewTestimonial';
import EditTestimonial from './containers/testimonials/EditTestimonial';

import AddReview from './containers/reviews/AddReview';
import AllReviews from './containers/reviews/AllReviews';
import ViewReview from './containers/reviews/ViewReview';
import EditReview from './containers/reviews/EditReview';

import Settings from './containers/settings/Settings';

import AddVendor from './containers/vendors/AddVendor';
import AllVendors from './containers/vendors/AllVendors';
import ViewVendor from './containers/vendors/ViewVendor';
import EditVendor from './containers/vendors/EditVendor';
import VendorProfile from './containers/vendors/VendorProfile';

import AddTemplate from './containers/templates/AddTemplate';
import AllTemplates from './containers/templates/AllTemplates';
import ViewTemplate from './containers/templates/ViewTemplate';
import EditTemplate from './containers/templates/EditTemplate';

// import AddVariation from "./containers/variations/AddVariation";

import AddVariation from './containers/variations/AddVariation';
import AllVariations from './containers/variations/AllVariations';
import ViewVariation from './containers/variations/ViewVariation';
import EditVariation from './containers/variations/EditVariation';

import AddProductcategory from './containers/productcategorys/AddProductcategory';
import AllProductcategorys from './containers/productcategorys/AllProductcategorys';
import ViewProductcategory from './containers/productcategorys/ViewProductcategory';
import EditProductcategory from './containers/productcategorys/EditProductcategory';

import AddFrame from './containers/frames/AddFrame';
import AllFrames from './containers/frames/AllFrames';
import ViewFrame from './containers/frames/ViewAllFrames';
import EditFrame from './containers/frames/EditFrame';

import AddSubCategory from './containers/subcategorys/AddSubCategory';
import AllSubCategorys from './containers/subcategorys/AllSubCategorys';
import ViewSubCategory from './containers/subcategorys/ViewSubCategory';
import EditSubCategory from './containers/subcategorys/EditSubCategory';

import AddSubSubCategory from './containers/subsubcategorys/AddSubSubCategory';
import AllSubSubCategorys from './containers/subsubcategorys/AllSubSubCategorys';
import ViewSubSubCategory from './containers/subsubcategorys/ViewSubSubCategory';
import EditSubSubCategory from './containers/subsubcategorys/EditSubSubCategory';

import AddSubSubSubCategory from './containers/subsubsubcategorys/AddSubSubSubCategory';
import AllSubSubSubCategorys from './containers/subsubsubcategorys/AllSubSubSubCategorys';
import ViewSubSubSubCategory from './containers/subsubsubcategorys/ViewSubSubSubCategory';
import EditSubSubSubCategory from './containers/subsubsubcategorys/EditSubSubSubCategory';

import AddSubSubSubSubCategory from './containers/subsubsubsubcategorys/AddSubSubSubSubCategory';
import AllSubSubSubSubCategorys from './containers/subsubsubsubcategorys/AllSubSubSubSubCategorys';
import ViewSubSubSubSubCategory from './containers/subsubsubsubcategorys/ViewSubSubSubSubCategory';
import EditSubSubSubSubCategory from './containers/subsubsubsubcategorys/EditSubSubSubSubCategory';

import AddSize from './containers/sizes/AddSize';
import AllSizes from './containers/sizes/AllSizes';
import ViewSize from './containers/sizes/ViewSize';
import EditSize from './containers/sizes/EditSize';

import AddFranchise from './containers/franchises/AddFranchise';
import AllFranchises from './containers/franchises/AllFranchises';
import ViewFranchise from './containers/franchises/ViewFranchise';
import EditFranchise from './containers/franchises/EditFranchise';
import { TrackOrder } from './containers/orders/TrackOrder';

import AddPart from './containers/parts/AddPart';
import AllParts from './containers/parts/AllParts';
import ViewPart from './containers/parts/ViewPart';
import EditPart from './containers/parts/EditPart';

import AddVehicle from './containers/vehicles/AddVehicle';
import AllVehicles from './containers/vehicles/AllVehicles';
import ViewVehicle from './containers/vehicles/ViewVehicle';
import EditVehicle from './containers/vehicles/EditVehicle';

import AddTechnician from './containers/technicians/AddTechnician';
import AllTechnicians from './containers/technicians/AllTechnicians';
import ViewTechnician from './containers/technicians/ViewTechnician';
import EditTechnician from './containers/technicians/EditTechnician';

import AddService from './containers/services/AddService';
import AllServices from './containers/services/AllServices';
import ViewService from './containers/services/ViewService';
import EditService from './containers/services/EditService';

import AllAlloyWidths from './containers/alloywidths/AllAlloyWidths';
import AddAlloyWidth from './containers/alloywidths/AddAlloyWidth';
import ViewAlloyWidth from './containers/alloywidths/ViewAlloyWidth';
import EditAlloyWidth from './containers/alloywidths/EditAlloyWidth';
import AllAlloyDiameters from './containers/alloydiameters/AllAlloyDiameters';
import AddAlloyDiameter from './containers/alloydiameters/AddAlloyDiameter';
import ViewAlloyDiameter from './containers/alloydiameters/ViewAlloyDiameter';
import EditAlloyDiameter from './containers/alloydiameters/EditAlloyDiameter';

import AllAlloyBores from './containers/alloybores/AllAlloyBores';
import AddAlloyBore from './containers/alloybores/AddAlloyBore';
import ViewAlloyBore from './containers/alloybores/ViewAlloyBore';
import EditAlloyBore from './containers/alloybores/EditAlloyBore';

import AddBrand from './containers/brands/AddBrand';
import AllBrands from './containers/brands/AllBrands';
import ViewBrand from './containers/brands/ViewBrand';
import EditBrand from './containers/brands/EditBrand';

import AddMakeModel from './containers/makemodels/AddMakeModel';
import AllMakeModels from './containers/makemodels/AllMakeModels';
import ViewMakeModel from './containers/makemodels/ViewMakeModel';
import EditMakeModel from './containers/makemodels/EditMakeModel';

import AddTyre from './containers/tyres/AddTyre';
import AllTyres from './containers/tyres/AllTyres';
import ViewTyre from './containers/tyres/ViewTyre';
import EditTyre from './containers/tyres/EditTyre';

import AddAlloyWheel from './containers/alloywheels/AddAlloyWheel';
import AllAlloyWheels from './containers/alloywheels/AllAlloyWheels';
import ViewAlloyWheel from './containers/alloywheels/ViewAlloyWheel';
import EditAlloyWheel from './containers/alloywheels/EditAlloyWheel';

import AddRimDiameter from './containers/rimdiameters/AddRimDiameter';
import AllRimDiameters from './containers/rimdiameters/AllRimDiameters';
import ViewRimDiameter from './containers/rimdiameters/ViewRimDiameter';
import EditRimDiameter from './containers/rimdiameters/EditRimDiameter';

import AddTyreWidth from './containers/tyrewidths/AddTyreWidth';
import AllTyreWidths from './containers/tyrewidths/AllTyreWidths';
import ViewTyreWidth from './containers/tyrewidths/ViewTyreWidth';
import EditTyreWidth from './containers/tyrewidths/EditTyreWidth';

import AddAspectRatio from './containers/aspectratios/AddAspectRatio';
import AllAspectRatios from './containers/aspectratios/AllAspectRatios';
import ViewAspectRatio from './containers/aspectratios/ViewAspectRatio';
import EditAspectRatio from './containers/aspectratios/EditAspectRatio';

import AllLoadIndexs from './containers/loadindexs/AllLoadIndexs';
import AddLoadIndex from './containers/loadindexs/AddLoadIndex';
import ViewLoadIndex from './containers/loadindexs/ViewLoadIndex';
import EditLoadIndex from './containers/loadindexs/EditLoadIndex';

import AllSpeedSymbols from './containers/speedsymbols/AllSpeedSymbols';
import AddSpeedSymbol from './containers/speedsymbols/AddSpeedSymbol';
import ViewSpeedSymbol from './containers/speedsymbols/ViewSpeedSymbol';
import EditSpeedSymbol from './containers/speedsymbols/EditSpeedSymbol';

import AllPlyratings from './containers/plyratings/AllPlyratings';
import AddPlyrating from './containers/plyratings/AddPlyrating';
import ViewPlyrating from './containers/plyratings/ViewPlyrating';
import EditPlyrating from './containers/plyratings/EditPlyrating';

import AllThreadPatterns from './containers/threadpatterns/AllThreadPatterns';
import AddThreadPattern from './containers/threadpatterns/AddThreadPattern';
import ViewThreadPattern from './containers/threadpatterns/ViewThreadPattern';
import EditThreadPattern from './containers/threadpatterns/EditThreadPattern';

import AllProductTypes from './containers/producttypes/AllProductTypes';
import AddProductType from './containers/producttypes/AddProductType';
import ViewProductType from './containers/producttypes/ViewProductType';
import EditProductType from './containers/producttypes/EditProductType';

import AllJobCards from './containers/job-cards/AllJobCards';
import AddJobCard from './containers/job-cards/AddJobCard';
import ViewJobCard from './containers/job-cards/ViewJobCard';
import EditJobCard from './containers/job-cards/EditJobCard';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <BeforeLoginRoutes exact path='/' component={Login} />
          <PrivateRoutes exact path='/dashboard' component={Dashboard} />
          <PrivateRoutes exact path='/profile' component={Profile} />

          <PrivateRoutes exact path='/banners' component={AllBanners} />
          <PrivateRoutes exact path='/banners/add' component={AddBanner} />
          <PrivateRoutes
            exact
            path='/banners/:id/view'
            component={ViewBanner}
          />
          <PrivateRoutes
            exact
            path='/banners/:id/edit'
            component={EditBanner}
          />

          <PrivateRoutes exact path='/contacts' component={AllContacts} />
          <PrivateRoutes exact path='/contacts/add' component={AddContact} />
          <PrivateRoutes
            exact
            path='/contacts/:id/view'
            component={ViewContact}
          />
          <PrivateRoutes
            exact
            path='/contacts/:id/edit'
            component={EditContact}
          />

          <PrivateRoutes exact path='/products' component={AllProducts} />
          <PrivateRoutes exact path='/products/add' component={AddProduct} />
          <PrivateRoutes
            exact
            path='/products/bulk-upload'
            component={AddBulkProducts}
          />
          <PrivateRoutes
            exact
            path='/products/bulk-upload-tyre-report'
            component={BulkUploadTyreReport}
          />
          <PrivateRoutes
            exact
            path='/products/:id/view'
            component={ViewProduct}
          />
          <PrivateRoutes
            exact
            path='/products/:id/edit'
            component={EditProduct}
          />

          {/* <PrivateRoutes exact path="/pages" component={AllPages} />
          <PrivateRoutes exact path="/pages/add" component={AddPage} />
          <PrivateRoutes exact path="/pages/:id/view" component={ViewPage} />
          <PrivateRoutes exact path="/pages/:id/edit" component={EditPage} /> */}

          <PrivateRoutes exact path='/categorys' component={AllCategorys} />
          <PrivateRoutes exact path='/categorys/add' component={AddCategory} />
          <PrivateRoutes
            exact
            path='/categorys/:id/view'
            component={ViewCategory}
          />
          <PrivateRoutes
            exact
            path='/categorys/:id/edit'
            component={EditCategory}
          />

          <PrivateRoutes exact path='/blogs' component={AllBlogs} />
          <PrivateRoutes exact path='/blogs/add' component={AddBlog} />
          <PrivateRoutes exact path='/blogs/:id/view' component={ViewBlog} />
          <PrivateRoutes exact path='/blogs/:id/edit' component={EditBlog} />

          <PrivateRoutes exact path='/coupons' component={AllCoupons} />
          <PrivateRoutes exact path='/coupons/add' component={AddCoupon} />
          <PrivateRoutes
            exact
            path='/coupons/:id/view'
            component={ViewCoupon}
          />
          <PrivateRoutes
            exact
            path='/coupons/:id/edit'
            component={EditCoupon}
          />

          <PrivateRoutes exact path='/orders' component={AllOrders} />
          <PrivateRoutes exact path='/orders/add' component={AddOrder} />
          <PrivateRoutes exact path='/orders/:id/view' component={ViewOrder} />
          <PrivateRoutes
            exact
            path='/orders/:id/track'
            component={TrackOrder}
          />
          <PrivateRoutes exact path='/orders/:id/edit' component={EditOrder} />

          <Route exact path='/frames' component={AllFrames} />
          <Route exact path='/frames/add' component={AddFrame} />
          <Route exact path='/frames/:id/view' component={ViewFrame} />
          <Route exact path='/frames/:id/edit' component={EditFrame} />

          <PrivateRoutes exact path='/customers' component={AllCustomers} />
          <PrivateRoutes exact path='/customers/add' component={AddCustomer} />
          <PrivateRoutes
            exact
            path='/customers/:id/view'
            component={ViewCustomer}
          />
          <PrivateRoutes
            exact
            path='/customers/:id/edit'
            component={EditCustomer}
          />
          {/* <PrivateRoutes exact path="/menus/:slug/edit" component={Menu} />
          <PrivateRoutes exact path="/menus/add" component={Menu} />
          <PrivateRoutes exact path="/menus" component={Menu} /> */}

          <PrivateRoutes exact path='/settings' component={Settings} />

          <PrivateRoutes
            exact
            path='/mobilebanners'
            component={AllMobilebanners}
          />
          <PrivateRoutes
            exact
            path='/mobilebanners/add'
            component={AddMobilebanner}
          />
          <PrivateRoutes
            exact
            path='/mobilebanners/:id/view'
            component={ViewMobilebanner}
          />
          <PrivateRoutes
            exact
            path='/mobilebanners/:id/edit'
            component={EditMobilebanner}
          />
          <PrivateRoutes
            exact
            path='/testimonials'
            component={AllTestimonials}
          />
          <PrivateRoutes
            exact
            path='/testimonials/add'
            component={AddTestimonial}
          />
          <PrivateRoutes
            exact
            path='/testimonials/:id/view'
            component={ViewTestimonial}
          />
          <PrivateRoutes
            exact
            path='/testimonials/:id/edit'
            component={EditTestimonial}
          />

          <PrivateRoutes exact path='/reviews' component={AllReviews} />
          <PrivateRoutes exact path='/reviews/add' component={AddReview} />
          <PrivateRoutes
            exact
            path='/reviews/:id/view'
            component={ViewReview}
          />
          <PrivateRoutes
            exact
            path='/reviews/:id/edit'
            component={EditReview}
          />

          <PrivateRoutes
            exact
            path='/vendor-profile'
            component={VendorProfile}
          />
          <PrivateRoutes exact path='/vendors' component={AllVendors} />
          <PrivateRoutes exact path='/vendors/add' component={AddVendor} />
          <PrivateRoutes
            exact
            path='/vendors/:id/view'
            component={ViewVendor}
          />
          <PrivateRoutes
            exact
            path='/vendors/:id/edit'
            component={EditVendor}
          />

          <PrivateRoutes exact path='/templates' component={AllTemplates} />
          <PrivateRoutes exact path='/templates/add' component={AddTemplate} />
          <PrivateRoutes
            exact
            path='/templates/:id/view'
            component={ViewTemplate}
          />
          <PrivateRoutes
            exact
            path='/templates/:id/edit'
            component={EditTemplate}
          />

          {
            // <PrivateRoutes exact path="/variations/add" component={AddVariation} />
          }

          <PrivateRoutes exact path='/variations' component={AllVariations} />
          <PrivateRoutes
            exact
            path='/variations/add'
            component={AddVariation}
          />
          <PrivateRoutes
            exact
            path='/variations/:id/view'
            component={ViewVariation}
          />
          <PrivateRoutes
            exact
            path='/variations/:id/edit'
            component={EditVariation}
          />

          <PrivateRoutes
            exact
            path='/productcategorys'
            component={AllProductcategorys}
          />
          <PrivateRoutes
            exact
            path='/productcategorys/add'
            component={AddProductcategory}
          />
          <PrivateRoutes
            exact
            path='/productcategorys/:id/view'
            component={ViewProductcategory}
          />
          <PrivateRoutes
            exact
            path='/productcategorys/:id/edit'
            component={EditProductcategory}
          />

          <PrivateRoutes
            exact
            path='/sub-categories'
            component={AllSubCategorys}
          />
          <PrivateRoutes
            exact
            path='/sub-categories/add'
            component={AddSubCategory}
          />
          <PrivateRoutes
            exact
            path='/sub-categories/:id/view'
            component={ViewSubCategory}
          />
          <PrivateRoutes
            exact
            path='/sub-categories/:id/edit'
            component={EditSubCategory}
          />

          <PrivateRoutes
            exact
            path='/sub-sub-categories'
            component={AllSubSubCategorys}
          />
          <PrivateRoutes
            exact
            path='/sub-sub-categories/add'
            component={AddSubSubCategory}
          />
          <PrivateRoutes
            exact
            path='/sub-sub-categories/:id/view'
            component={ViewSubSubCategory}
          />
          <PrivateRoutes
            exact
            path='/sub-sub-categories/:id/edit'
            component={EditSubSubCategory}
          />

          <PrivateRoutes
            exact
            path='/sub-sub-sub-categories'
            component={AllSubSubSubCategorys}
          />
          <PrivateRoutes
            exact
            path='/sub-sub-sub-categories/add'
            component={AddSubSubSubCategory}
          />
          <PrivateRoutes
            exact
            path='/sub-sub-sub-categories/:id/view'
            component={ViewSubSubSubCategory}
          />
          <PrivateRoutes
            exact
            path='/sub-sub-sub-categories/:id/edit'
            component={EditSubSubSubCategory}
          />

          <PrivateRoutes
            exact
            path='/sub-sub-sub-sub-categories'
            component={AllSubSubSubSubCategorys}
          />
          <PrivateRoutes
            exact
            path='/sub-sub-sub-sub-categories/add'
            component={AddSubSubSubSubCategory}
          />
          <PrivateRoutes
            exact
            path='/sub-sub-sub-sub-categories/:id/view'
            component={ViewSubSubSubSubCategory}
          />
          <PrivateRoutes
            exact
            path='/sub-sub-sub-sub-categories/:id/edit'
            component={EditSubSubSubSubCategory}
          />

          <PrivateRoutes exact path='/sizes' component={AllSizes} />
          <PrivateRoutes exact path='/sizes/add' component={AddSize} />
          <PrivateRoutes exact path='/sizes/:id/view' component={ViewSize} />
          <PrivateRoutes exact path='/sizes/:id/edit' component={EditSize} />

          <PrivateRoutes exact path='/parts' component={AllParts} />
          <PrivateRoutes exact path='/parts/add' component={AddPart} />
          <PrivateRoutes exact path='/parts/:id/view' component={ViewPart} />
          <PrivateRoutes exact path='/parts/:id/edit' component={EditPart} />

          <PrivateRoutes exact path='/vehicles' component={AllVehicles} />
          <PrivateRoutes exact path='/vehicles/add' component={AddVehicle} />
          <PrivateRoutes
            exact
            path='/vehicles/:id/view'
            component={ViewVehicle}
          />
          <PrivateRoutes
            exact
            path='/vehicles/:id/edit'
            component={EditVehicle}
          />

          <PrivateRoutes exact path='/technicians' component={AllTechnicians} />
          <PrivateRoutes
            exact
            path='/technicians/add'
            component={AddTechnician}
          />
          <PrivateRoutes
            exact
            path='/technicians/:id/view'
            component={ViewTechnician}
          />
          <PrivateRoutes
            exact
            path='/technicians/:id/edit'
            component={EditTechnician}
          />
          <PrivateRoutes exact path='/services' component={AllServices} />
          <PrivateRoutes exact path='/services/add' component={AddService} />
          <PrivateRoutes
            exact
            path='/services/:id/view'
            component={ViewService}
          />
          <PrivateRoutes
            exact
            path='/services/:id/edit'
            component={EditService}
          />

          <PrivateRoutes exact path='/brands' component={AllBrands} />
          <PrivateRoutes exact path='/brands/add' component={AddBrand} />
          <PrivateRoutes exact path='/brands/:id/view' component={ViewBrand} />
          <PrivateRoutes exact path='/brands/:id/edit' component={EditBrand} />

          <PrivateRoutes exact path='/makemodels' component={AllMakeModels} />
          <PrivateRoutes
            exact
            path='/makemodels/add'
            component={AddMakeModel}
          />
          <PrivateRoutes
            exact
            path='/makemodels/:id/view'
            component={ViewMakeModel}
          />
          <PrivateRoutes
            exact
            path='/makemodels/:id/edit'
            component={EditMakeModel}
          />

          <PrivateRoutes exact path='/tyres' component={AllTyres} />
          <PrivateRoutes exact path='/tyres/add' component={AddTyre} />
          <PrivateRoutes exact path='/tyres/:id/view' component={ViewTyre} />
          <PrivateRoutes exact path='/tyres/:id/edit' component={EditTyre} />

          <PrivateRoutes exact path='/alloywheels' component={AllAlloyWheels} />
          <PrivateRoutes
            exact
            path='/alloywheels/add'
            component={AddAlloyWheel}
          />
          <PrivateRoutes
            exact
            path='/alloywheels/:id/view'
            component={ViewAlloyWheel}
          />
          <PrivateRoutes
            exact
            path='/alloywheels/:id/edit'
            component={EditAlloyWheel}
          />

          <PrivateRoutes exact path='/job-cards' component={AllJobCards} />
          <PrivateRoutes exact path='/job-cards/add' component={AddJobCard} />
          <PrivateRoutes
            exact
            path='/job-cards/:id/view'
            component={ViewJobCard}
          />
          <PrivateRoutes
            exact
            path='/job-cards/:id/edit'
            component={EditJobCard}
          />

          <PrivateRoutes exact path='/franchises' component={AllFranchises} />
          <PrivateRoutes
            exact
            path='/franchises/add'
            component={AddFranchise}
          />
          <PrivateRoutes
            exact
            path='/franchises/:id/view'
            component={ViewFranchise}
          />
          <PrivateRoutes
            exact
            path='/franchises/:id/edit'
            component={EditFranchise}
          />

          <PrivateRoutes
            exact
            path='/rim-diameters'
            component={AllRimDiameters}
          />
          <PrivateRoutes
            exact
            path='/rim-diameters/add'
            component={AddRimDiameter}
          />
          <PrivateRoutes
            exact
            path='/rim-diameters/:id/view'
            component={ViewRimDiameter}
          />
          <PrivateRoutes
            exact
            path='/rim-diameters/:id/edit'
            component={EditRimDiameter}
          />

          <PrivateRoutes exact path='/tyre-widths' component={AllTyreWidths} />
          <PrivateRoutes
            exact
            path='/tyre-widths/add'
            component={AddTyreWidth}
          />
          <PrivateRoutes
            exact
            path='/tyre-widths/:id/view'
            component={ViewTyreWidth}
          />
          <PrivateRoutes
            exact
            path='/tyre-widths/:id/edit'
            component={EditTyreWidth}
          />

          <PrivateRoutes
            exact
            path='/aspectratios'
            component={AllAspectRatios}
          />
          <PrivateRoutes
            exact
            path='/aspectratios/add'
            component={AddAspectRatio}
          />
          <PrivateRoutes
            exact
            path='/aspectratios/:id/view'
            component={ViewAspectRatio}
          />
          <PrivateRoutes
            exact
            path='/aspectratios/:id/edit'
            component={EditAspectRatio}
          />

          {/* Alloy Wheel Settings */}
          <PrivateRoutes exact path='/alloywidths' component={AllAlloyWidths} />
          <PrivateRoutes
            exact
            path='/alloywidths/add'
            component={AddAlloyWidth}
          />
          <PrivateRoutes
            exact
            path='/alloywidths/:id/view'
            component={ViewAlloyWidth}
          />
          <PrivateRoutes
            exact
            path='/alloywidths/:id/edit'
            component={EditAlloyWidth}
          />

          <PrivateRoutes
            exact
            path='/alloypcds'
            component={require('./containers/alloypcds/AllAlloyPCDs').default}
          />
          <PrivateRoutes
            exact
            path='/alloypcds/add'
            component={require('./containers/alloypcds/AddAlloyPCD').default}
          />
          <PrivateRoutes
            exact
            path='/alloypcds/:id/view'
            component={require('./containers/alloypcds/ViewAlloyPCD').default}
          />
          <PrivateRoutes
            exact
            path='/alloypcds/:id/edit'
            component={require('./containers/alloypcds/EditAlloyPCD').default}
          />

          <PrivateRoutes
            exact
            path='/alloyoffsets'
            component={
              require('./containers/alloyoffsets/AllAlloyOffsets').default
            }
          />
          <PrivateRoutes
            exact
            path='/alloyoffsets/add'
            component={
              require('./containers/alloyoffsets/AddAlloyOffset').default
            }
          />
          <PrivateRoutes
            exact
            path='/alloyoffsets/:id/view'
            component={
              require('./containers/alloyoffsets/ViewAlloyOffset').default
            }
          />
          <PrivateRoutes
            exact
            path='/alloyoffsets/:id/edit'
            component={
              require('./containers/alloyoffsets/EditAlloyOffset').default
            }
          />

          <PrivateRoutes
            exact
            path='/alloyfinishes'
            component={
              require('./containers/alloyfinishes/AllAlloyFinishes').default
            }
          />
          <PrivateRoutes
            exact
            path='/alloyfinishes/add'
            component={
              require('./containers/alloyfinishes/AddAlloyFinish').default
            }
          />
          <PrivateRoutes
            exact
            path='/alloyfinishes/:id/view'
            component={
              require('./containers/alloyfinishes/ViewAlloyFinish').default
            }
          />
          <PrivateRoutes
            exact
            path='/alloyfinishes/:id/edit'
            component={
              require('./containers/alloyfinishes/EditAlloyFinish').default
            }
          />

          <PrivateRoutes
            exact
            path='/alloydiameters'
            component={AllAlloyDiameters}
          />
          <PrivateRoutes
            exact
            path='/alloydiameters/add'
            component={AddAlloyDiameter}
          />
          <PrivateRoutes
            exact
            path='/alloydiameters/:id/view'
            component={ViewAlloyDiameter}
          />
          <PrivateRoutes
            exact
            path='/alloydiameters/:id/edit'
            component={EditAlloyDiameter}
          />

          <PrivateRoutes exact path='/alloybores' component={AllAlloyBores} />
          <PrivateRoutes
            exact
            path='/alloybores/add'
            component={AddAlloyBore}
          />
          <PrivateRoutes
            exact
            path='/alloybores/:id/view'
            component={ViewAlloyBore}
          />
          <PrivateRoutes
            exact
            path='/alloybores/:id/edit'
            component={EditAlloyBore}
          />

          <PrivateRoutes exact path='/loadindexs' component={AllLoadIndexs} />
          <PrivateRoutes
            exact
            path='/loadindexs/add'
            component={AddLoadIndex}
          />
          <PrivateRoutes
            exact
            path='/loadindexs/:id/view'
            component={ViewLoadIndex}
          />
          <PrivateRoutes
            exact
            path='/loadindexs/:id/edit'
            component={EditLoadIndex}
          />

          <PrivateRoutes
            exact
            path='/speedsymbols'
            component={AllSpeedSymbols}
          />
          <PrivateRoutes
            exact
            path='/speedsymbols/add'
            component={AddSpeedSymbol}
          />
          <PrivateRoutes
            exact
            path='/speedsymbols/:id/view'
            component={ViewSpeedSymbol}
          />
          <PrivateRoutes
            exact
            path='/speedsymbols/:id/edit'
            component={EditSpeedSymbol}
          />

          <PrivateRoutes exact path='/plyratings' component={AllPlyratings} />
          <PrivateRoutes
            exact
            path='/plyratings/add'
            component={AddPlyrating}
          />
          <PrivateRoutes
            exact
            path='/plyratings/:id/view'
            component={ViewPlyrating}
          />
          <PrivateRoutes
            exact
            path='/plyratings/:id/edit'
            component={EditPlyrating}
          />

          <PrivateRoutes
            exact
            path='/threadpatterns'
            component={AllThreadPatterns}
          />
          <PrivateRoutes
            exact
            path='/threadpatterns/add'
            component={AddThreadPattern}
          />
          <PrivateRoutes
            exact
            path='/threadpatterns/:id/view'
            component={ViewThreadPattern}
          />
          <PrivateRoutes
            exact
            path='/threadpatterns/:id/edit'
            component={EditThreadPattern}
          />

          <PrivateRoutes
            exact
            path='/producttypes'
            component={AllProductTypes}
          />
          <PrivateRoutes
            exact
            path='/producttypes/add'
            component={AddProductType}
          />
          <PrivateRoutes
            exact
            path='/producttypes/:id/view'
            component={ViewProductType}
          />
          <PrivateRoutes
            exact
            path='/producttypes/:id/edit'
            component={EditProductType}
          />

          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
