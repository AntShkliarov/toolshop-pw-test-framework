import { expect, test } from '@playwright/test';

test.describe('Health', () => {
  test('application root responds @smoke', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL(/\//);
  });
});
