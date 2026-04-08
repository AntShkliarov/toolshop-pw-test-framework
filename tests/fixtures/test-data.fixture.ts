import { test as base } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

type TestUser = { email: string; password: string; role: string };

export const test = base.extend<{ testUsers: TestUser[] }>({
  testUsers: async (_fixtures, use) => {
    const dataPath = path.resolve(__dirname, '../../data/test-users.json');
    const users: TestUser[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    await use(users);
  },
});
