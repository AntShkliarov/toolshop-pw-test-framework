import { expect } from '@playwright/test';
import { test } from '../fixtures/api.fixture';
import { CART_ENDPOINTS } from '../../src/api/endpoints/cart.endpoints';
import { PRODUCTS_ENDPOINTS } from '../../src/api/endpoints/products.endpoints';

test.describe('Cart API', () => {
  test('POST /carts creates a cart and GET /carts/:id returns it @api', async ({ apiContext }) => {
    const createCartResponse = await apiContext.post(CART_ENDPOINTS.BASE);
    expect(createCartResponse.status()).toBe(201);

    const createCartBody = await createCartResponse.json();
    expect(createCartBody).toMatchObject({
      id: expect.any(String),
    });

    const getCartResponse = await apiContext.get(CART_ENDPOINTS.BY_ID(createCartBody.id));
    expect(getCartResponse.ok()).toBeTruthy();

    const getCartBody = await getCartResponse.json();
    expect(getCartBody).toMatchObject({
      id: createCartBody.id,
      cart_items: expect.any(Array),
    });
  });

  test('POST /carts/:id adds an item and returns it in cart details @api', async ({
    apiContext,
  }) => {
    const productsResponse = await apiContext.get(PRODUCTS_ENDPOINTS.BASE);
    expect(productsResponse.ok()).toBeTruthy();
    const productsBody = await productsResponse.json();
    const firstProductId = productsBody?.data?.[0]?.id as string;
    expect(firstProductId).toBeTruthy();

    const createCartResponse = await apiContext.post(CART_ENDPOINTS.BASE);
    expect(createCartResponse.status()).toBe(201);
    const { id: cartId } = (await createCartResponse.json()) as { id: string };

    const addItemResponse = await apiContext.post(CART_ENDPOINTS.ADD_ITEM(cartId), {
      data: {
        product_id: firstProductId,
        quantity: 1,
      },
    });
    expect(addItemResponse.ok()).toBeTruthy();
    const addItemBody = await addItemResponse.json();
    expect(addItemBody).toMatchObject({
      result: 'item added or updated',
    });

    const getCartResponse = await apiContext.get(CART_ENDPOINTS.BY_ID(cartId));
    expect(getCartResponse.ok()).toBeTruthy();
    const getCartBody = await getCartResponse.json();

    expect(Array.isArray(getCartBody.cart_items)).toBeTruthy();
    expect(getCartBody.cart_items.length).toBeGreaterThan(0);
    expect(getCartBody.cart_items[0]).toMatchObject({
      cart_id: cartId,
      product_id: firstProductId,
      quantity: 1,
    });
  });

  test('GET /carts/:id returns 404 for a non-existent cart @api', async ({ apiContext }) => {
    const response = await apiContext.get(CART_ENDPOINTS.BY_ID('does-not-exist'));

    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body).toMatchObject({
      message: expect.any(String),
    });
  });
});
