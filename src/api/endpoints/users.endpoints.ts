export const USERS_ENDPOINTS = {
  BASE: '/users',
  BY_ID: (id: string | number) => `/users/${id}`,
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
} as const;
