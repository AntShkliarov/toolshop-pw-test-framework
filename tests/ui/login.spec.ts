import { expect, test } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';

test.describe('Login page', () => {
  test('form shows validation feedback for invalid input @ui', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.fillAndSubmit('invalid-email', 'short');

    await expect(loginPage.errorMessage).toBeVisible();
  });
});
