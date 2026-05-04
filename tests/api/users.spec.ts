import { expect } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import { test } from '../fixtures/api.fixture';
import { USERS_ENDPOINTS } from '../../src/api/endpoints/users.endpoints';

test.describe('Users API', () => {
  test('POST /users/login returns a token for valid credentials @api', async ({ apiContext }) => {
    const email = `pw-ci-${randomUUID()}@example.com`;
    const password = `S3cure!${randomUUID()}Aa1`;

    const registerResponse = await apiContext.post(USERS_ENDPOINTS.REGISTER, {
      data: {
        first_name: 'Playwright',
        last_name: 'CI',
        email,
        password,
      },
    });
    expect(registerResponse.ok()).toBeTruthy();

    const response = await apiContext.post(USERS_ENDPOINTS.LOGIN, {
      data: { email, password },
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(typeof body.access_token).toBe('string');
    expect(body.access_token.length).toBeGreaterThan(0);
  });

  test('POST /users/login returns 401 for invalid credentials @api', async ({ apiContext }) => {
    const response = await apiContext.post(USERS_ENDPOINTS.LOGIN, {
      data: {
        email: `nonexistent-${randomUUID()}@example.com`,
        password: 'ThisIsANotUsedPassword!22',
      },
    });

    expect(response.status()).toBe(401);
  });
});
