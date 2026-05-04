export const CART_ENDPOINTS = {
  BASE: '/carts',
  BY_ID: (cartId: string) => `/carts/${cartId}`,
  ADD_ITEM: (cartId: string) => `/carts/${cartId}`,
  UPDATE_ITEM_QUANTITY: (cartId: string) => `/carts/${cartId}/product/quantity`,
  REMOVE_ITEM: (cartId: string, productId: string) => `/carts/${cartId}/product/${productId}`,
} as const;
