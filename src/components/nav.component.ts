import { type Locator, type Page } from '@playwright/test';

export class NavComponent {
  readonly homeLink: Locator;
  readonly profileLink: Locator;

  constructor(page: Page) {
    this.homeLink = page.getByRole('link', { name: /home/i });
    this.profileLink = page.getByRole('link', { name: /profile/i });
  }

  async goHome(): Promise<void> {
    await this.homeLink.click();
  }
}
