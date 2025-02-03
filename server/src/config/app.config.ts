import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  host: process.env.HOST || 'localhost',
  env: process.env.NODE_ENV || 'development',
  prefix: process.env.PREFIX || '',
}));
