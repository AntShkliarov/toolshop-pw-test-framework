import { expect } from '@playwright/test';
import { test } from '../fixtures/api.fixture';
import { BRANDS_ENDPOINTS } from '../../src/api/endpoints/brands.endpoints';

test.describe('Brands API', () => {
  test('GET /brands returns 200 and a non-empty list @api', async ({ apiContext }) => {
    const response = await apiContext.get(BRANDS_ENDPOINTS.BASE);

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      slug: expect.any(String),
    });
  });

  test('GET /brands/:id returns the correct brand @api', async ({ apiContext }) => {
    const allBrandsResponse = await apiContext.get(BRANDS_ENDPOINTS.BASE);
    expect(allBrandsResponse.ok()).toBeTruthy();
    const allBrandsBody = await allBrandsResponse.json();
    const firstBrand = allBrandsBody[0];

    const response = await apiContext.get(BRANDS_ENDPOINTS.BY_ID(firstBrand.id));

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toMatchObject({
      id: firstBrand.id,
      name: firstBrand.name,
      slug: firstBrand.slug,
    });
  });
});
