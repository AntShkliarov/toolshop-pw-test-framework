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
    const allProductsResponse = await apiContext.get(PRODUCTS_ENDPOINTS.BASE);
    expect(allProductsResponse.ok()).toBeTruthy();
    const allProductsBody = await allProductsResponse.json();
    const firstProduct = allProductsBody?.data?.[0];
    expect(firstProduct?.id).toBeTruthy();

    const response = await apiContext.get(PRODUCTS_ENDPOINTS.BY_ID(firstProduct.id));

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty('id', firstProduct.id);
  });
});
