import { expect } from '@playwright/test';
import { test } from '../fixtures/api.fixture';
import { USERS_ENDPOINTS } from '../../src/api/endpoints/users.endpoints';
import { VALID_ADMIN, INVALID_USER } from '../../src/data/constants';

test.describe('Users API', () => {
  test('POST /auth/login returns a token for valid credentials @api', async ({ apiContext }) => {
    const response = await apiContext.post(USERS_ENDPOINTS.LOGIN, {
      data: {
        email: VALID_ADMIN.email,
        password: VALID_ADMIN.password,
      },
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toHaveProperty('token');
  });

  test('POST /auth/login returns 401 for invalid credentials @api', async ({ apiContext }) => {
    const response = await apiContext.post(USERS_ENDPOINTS.LOGIN, {
      data: {
        email: INVALID_USER.email,
        password: INVALID_USER.password,
      },
    });

    expect(response.status()).toBe(401);
  });
});
