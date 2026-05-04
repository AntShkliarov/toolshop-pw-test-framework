export const BRANDS_ENDPOINTS = {
  BASE: '/brands',
  BY_ID: (brandId: string | number) => `/brands/${brandId}`,
  SEARCH: '/brands/search',
} as const;
