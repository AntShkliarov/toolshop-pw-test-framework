import { expect } from '@playwright/test';
import { test } from '../fixtures/api.fixture';
import { PAYMENT_ENDPOINTS } from '../../src/api/endpoints/payment.endpoints';

test.describe('Payment API', () => {
  test('POST /payment/check returns 200 and a success message @api', async ({ apiContext }) => {
    const response = await apiContext.post(PAYMENT_ENDPOINTS.CHECK, {
      data: {
        payment_method: 'cash-on-delivery',
        payment_details: {},
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('message');
    expect(typeof body.message).toBe('string');
    expect(body.message.length).toBeGreaterThan(0);
  });
});
