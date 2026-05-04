import { expect, test } from '@playwright/test';

test.describe('Intentional failure guard', () => {
  test('should always fail to validate failure reporting @smoke', async () => {
    test.fail();
    expect('FAILURE_SENTINEL').toBe('SUCCESS_SENTINEL');
  });
});
