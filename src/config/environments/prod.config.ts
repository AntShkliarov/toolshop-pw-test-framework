import { EnvironmentConfig } from '../types';

export const prodConfig: EnvironmentConfig = {
  name: 'prod',
  baseUrl: process.env.PROD_URL || 'https://example.com',
  apiUrl: process.env.PROD_API_URL || 'https://api.example.com',
  timeout: 30000,
};
