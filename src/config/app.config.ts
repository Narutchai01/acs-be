export interface AppConfig {
  port: number;
  database: {
    url: string;
  };
  jwt: {
    secret: string;
    expiration: string;
  };
  supabase: {
    url: string;
    key: string;
    bucket: string;
  };
  mail: {
    host: string;
    port: number;
    user: string;
    pass: string;
    from: string;
  };
  app: {
    domain: string;
  };
  cors: {
    origins: string[];
  };
}

export default (): AppConfig => ({
  port: parseInt(process.env.PORT || '8000', 10),
  database: {
    url: process.env.DATABASE_URL || '',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'supersecretkey',
    expiration: process.env.JWT_EXPIRATION || '1d',
  },
  supabase: {
    url: process.env.SUPABASE_URL || '',
    key: process.env.SUPABASE_KEY || '',
    bucket: process.env.SUPABASE_BUCKET || 'acs-website',
  },
  mail: {
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.MAIL_PORT || '587', 10),
    user: process.env.MAIL_USER || '',
    pass: process.env.MAIL_PASS || '',
    from: process.env.MAIL_FROM || '',
  },
  app: {
    domain: process.env.APP_DOMAIN || 'http://localhost:3000',
  },
  cors: {
    origins: process.env.CORS_ORIGINS?.split(',') || [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://acs-dev.narutchai.com',
    ],
  },
});
