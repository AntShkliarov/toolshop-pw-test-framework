import { EnvironmentConfig } from '../types';

export const stagingConfig: EnvironmentConfig = {
  name: 'staging',
  baseUrl: process.env.STAGING_URL || 'https://staging.example.com',
  apiUrl: process.env.STAGING_API_URL || 'https://staging-api.example.com',
  timeout: 30000,
};
