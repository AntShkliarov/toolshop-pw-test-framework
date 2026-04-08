import { EnvironmentConfig } from '../types';

export const devConfig: EnvironmentConfig = {
  name: 'dev',
  baseUrl: process.env.DEV_URL || 'http://localhost:3000',
  apiUrl: process.env.DEV_API_URL || 'http://localhost:3000/api',
  timeout: 30000,
};
