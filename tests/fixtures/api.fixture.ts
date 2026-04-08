import 'dotenv/config';
import { test as base, type APIRequestContext } from '@playwright/test';
import { config } from '../../src/config';

type ApiFixtures = {
  apiContext: APIRequestContext;
};

export const test = base.extend<ApiFixtures>({
  apiContext: async ({ playwright }, use) => {
    const ctx = await playwright.request.newContext({
      baseURL: config.apiUrl,
    });
    await use(ctx);
    await ctx.dispose();
  },
});
