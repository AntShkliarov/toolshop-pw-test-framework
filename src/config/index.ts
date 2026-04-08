import 'dotenv/config';
import { EnvironmentConfig } from './types';
import { devConfig } from './environments/dev.config';
import { stagingConfig } from './environments/staging.config';
import { prodConfig } from './environments/prod.config';

const environments: Record<string, EnvironmentConfig> = {
  dev: devConfig,
  staging: stagingConfig,
  prod: prodConfig,
};

const currentEnv = process.env.TEST_ENV || 'dev';
export const config: EnvironmentConfig = environments[currentEnv] || devConfig;
