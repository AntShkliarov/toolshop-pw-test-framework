export const PRODUCTS_ENDPOINTS = {
  BASE: '/products',
  BY_ID: (id: string | number) => `/products/${id}`,
  SEARCH: '/products/search',
} as const;
