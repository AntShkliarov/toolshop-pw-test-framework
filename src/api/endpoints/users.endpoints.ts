export const USERS_ENDPOINTS = {
  BASE: '/users',
  BY_ID: (id: string | number) => `/users/${id}`,
  LOGIN: '/users/login',
  REGISTER: '/users/register',
} as const;
