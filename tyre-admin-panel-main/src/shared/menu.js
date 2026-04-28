export const MENU = [
  {
    label: 'Dashboard',
    link: '/dashboard',
    roles: ['SUPER ADMIN', 'VENDOR', 'FRANCHISE'],
  },

  // MAIN PRODUCT MANAGEMENT
  {
    label: 'Products',
    link: '#',
    roles: ['SUPER ADMIN', 'VENDOR'],
    menu: [
      {
        label: 'All Products',
        link: '/products',
        roles: ['SUPER ADMIN', 'VENDOR'],
      },
      {
        label: 'Tyres',
        link: '/tyres',
        roles: ['SUPER ADMIN', 'VENDOR'],
      },
      {
        label: 'Alloy Wheels',
        link: '/alloywheels',
        roles: ['SUPER ADMIN', 'VENDOR'],
      },
      {
        label: 'Services',
        link: '/services',
        roles: ['SUPER ADMIN', 'VENDOR'],
      },
    ],
  },

  // JOB CARDS & OPERATIONS
  {
    label: 'Job Management',
    link: '#',
    roles: ['SUPER ADMIN', 'VENDOR'],
    menu: [
      {
        label: 'Job Cards',
        link: '/job-cards',
        roles: ['SUPER ADMIN', 'VENDOR'],
      },
      {
        label: 'Technicians',
        link: '/technicians',
        roles: ['SUPER ADMIN', 'VENDOR'],
      },
      {
        label: 'Parts & Inventory',
        link: '/parts',
        roles: ['SUPER ADMIN', 'VENDOR'],
      },
    ],
  },

  // CUSTOMER MANAGEMENT
  {
    label: 'Customer Management',
    link: '#',
    roles: ['SUPER ADMIN', 'VENDOR'],
    menu: [
      {
        label: 'Customers',
        link: '/customers',
        roles: ['SUPER ADMIN', 'VENDOR'],
      },
      {
        label: 'Vehicles',
        link: '/vehicles',
        roles: ['SUPER ADMIN', 'VENDOR'],
      },
      {
        label: 'Orders',
        link: '/orders',
        roles: ['SUPER ADMIN', 'VENDOR'],
      },
    ],
  },

  // VENDOR MANAGEMENT
  {
    label: 'Vendor Management',
    link: '#',
    roles: ['SUPER ADMIN'],
    menu: [
      {
        label: 'All Vendors',
        link: '/vendors',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Vendor Profile',
        link: '/vendor-profile',
        roles: ['VENDOR'],
      },
    ],
  },

  // MARKETING & CONTENT
  {
    label: 'Marketing',
    link: '#',
    roles: ['SUPER ADMIN'],
    menu: [
      {
        label: 'Blogs',
        link: '/blogs',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Blog Categories',
        link: '/categorys',
        roles: ['SUPER ADMIN'],
      },
    ],
  },

  // CUSTOMER FEEDBACK
  {
    label: 'Customer Feedback',
    link: '#',
    roles: ['SUPER ADMIN'],
    menu: [
      {
        label: 'Contact Inquiries',
        link: '/contacts',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Customer Reviews',
        link: '/reviews',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Testimonials',
        link: '/testimonials',
        roles: ['SUPER ADMIN'],
      },
    ],
  },

  // PRODUCT CATALOG SETUP
  {
    label: 'Catalog Settings',
    link: '#',
    roles: ['SUPER ADMIN'],
    menu: [
      {
        label: 'Product Brands',
        link: '/brands',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Product Types',
        link: '/producttypes',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Vehicle Makes & Models',
        link: '/makemodels',
        roles: ['SUPER ADMIN'],
      },
    ],
  },

  // TYRE SPECIFICATIONS
  {
    label: 'Tyre Specifications',
    link: '#',
    roles: ['SUPER ADMIN'],
    menu: [
      {
        label: 'Rim Diameters',
        link: '/rim-diameters',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Tyre Widths',
        link: '/tyre-widths',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Aspect Ratios',
        link: '/aspectratios',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Load Indexes',
        link: '/loadindexs',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Speed Symbols',
        link: '/speedsymbols',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Ply Ratings',
        link: '/plyratings',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Thread Patterns',
        link: '/threadpatterns',
        roles: ['SUPER ADMIN'],
      },
    ],
  },

  // ALLOY WHEEL SPECIFICATIONS
  {
    label: 'Alloy Wheel Specifications',
    link: '#',
    roles: ['SUPER ADMIN'],
    menu: [
      {
        label: 'Alloy Diameters',
        link: '/alloydiameters',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Alloy Widths',
        link: '/alloywidths',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Alloy PCDs (Bolt Patterns)',
        link: '/alloypcds',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Alloy Offsets',
        link: '/alloyoffsets',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Alloy Bore Sizes',
        link: '/alloybores',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Alloy Finishes',
        link: '/alloyfinishes',
        roles: ['SUPER ADMIN'],
      },
    ],
  },
];
