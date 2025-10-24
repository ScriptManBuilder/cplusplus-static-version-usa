// Contact Information Constants
export const CONTACT_INFO = {
  email: process.env.REACT_APP_SUPPORT_EMAIL || 'support@cprogly.com',
  phone: process.env.REACT_APP_SUPPORT_PHONE || '+14632639480',
  phoneFormatted: process.env.REACT_APP_SUPPORT_PHONE_FORMATTED || '+1 (463) 263-9480',
} as const;

// Company Information Constants
export const COMPANY_INFO = {
  name: process.env.REACT_APP_COMPANY_NAME || 'Goldleaf Goods LLC',
  websiteUrl: process.env.REACT_APP_WEBSITE_URL || 'cprogly.com',
  address: process.env.REACT_APP_COMPANY_ADDRESS || '1350 Tumbleweed Way, Sacramento, CA, USA, 95834',
  owner: process.env.REACT_APP_COMPANY_OWNER || 'Renita Godbold',
} as const;

// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3007',
} as const;

// App Configuration
export const APP_CONFIG = {
  name: process.env.REACT_APP_APP_NAME || 'CopywritingEcourses',
  version: process.env.REACT_APP_VERSION || '1.0.0',
} as const;