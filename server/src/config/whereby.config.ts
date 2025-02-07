import { registerAs } from '@nestjs/config';

export default registerAs('whereby', () => ({
  api_url: process.env.WHEREBY_API_URL,
  api_key: process.env.WHEREBY_API_KEY,
}));
