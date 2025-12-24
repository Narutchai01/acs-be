import { ConfigService } from '@nestjs/config';
import { AppConfig } from './app.config';

export const getAppDomain = (
  configService: ConfigService<AppConfig>,
): string => {
  return (
    configService.get('app.domain', { infer: true }) || 'http://localhost:3000'
  );
};

// Backwards compatibility
export const appDominain = process.env.APP_DOMAIN || 'http://localhost:3000';
