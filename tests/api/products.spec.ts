import { expect } from '@playwright/test';
import { test } from '../fixtures/api.fixture';
import { PRODUCTS_ENDPOINTS } from '../../src/api/endpoints/products.endpoints';

test.describe('Products API', () => {
  test('GET /products returns 200 and a non-empty list @api', async ({ apiContext }) => {
    const response = await apiContext.get(PRODUCTS_ENDPOINTS.BASE);

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(Array.isArray(body.data)).toBeTruthy();
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('GET /products/:id returns the correct product @api', async ({ apiContext }) => {
    const productsResponse = await apiContext.get(PRODUCTS_ENDPOINTS.BASE);
    expect(productsResponse.ok()).toBeTruthy();
    const productsBody = await productsResponse.json();
    expect(Array.isArray(productsBody.data)).toBeTruthy();
    expect(productsBody.data.length).toBeGreaterThan(0);
    const firstProductId = productsBody.data[0].id;

    const response = await apiContext.get(PRODUCTS_ENDPOINTS.BY_ID(firstProductId));

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty('id', firstProductId);
  });

  test('POST /products returns 405 when method is not allowed @api', async ({ apiContext }) => {
    const response = await apiContext.post(PRODUCTS_ENDPOINTS.BASE, {
      data: {},
    });

    expect(response.status()).toBe(405);
  });
});
