import { expect, test } from '@playwright/test';
import { HomePage } from '../../src/pages/home.page';

test.describe('Home page', () => {
  test('page loads with a main heading @ui', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();

    await expect(homePage.mainHeading).toBeVisible();
  });
});
