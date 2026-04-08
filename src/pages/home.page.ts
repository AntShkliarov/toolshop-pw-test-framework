import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly mainHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.mainHeading = page.getByRole('heading', { level: 1 });
  }

  async open(): Promise<void> {
    await this.navigate('/');
  }
}
