import { expect } from '@playwright/test';
import { test } from '../fixtures/api.fixture';
import { PRODUCTS_ENDPOINTS } from '../../src/api/endpoints/products.endpoints';

test.describe('Products API', () => {
  test('GET /products returns 200 and a non-empty list @api', async ({ apiContext }) => {
    const response = await apiContext.get(PRODUCTS_ENDPOINTS.BASE);

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  test('GET /products/:id returns the correct product @api', async ({ apiContext }) => {
    const response = await apiContext.get(PRODUCTS_ENDPOINTS.BY_ID(1));

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
  });
});
