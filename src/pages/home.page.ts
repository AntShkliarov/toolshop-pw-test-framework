import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly mainHeading: Locator;

  constructor(page: Page) {
    super(page);
    // The public practice app currently exposes "Sort" as the first stable heading on home.
    this.mainHeading = page.getByRole('heading', { name: 'Sort', level: 4 });
  }

  async open(): Promise<void> {
    await this.navigate('/');
  }
}
