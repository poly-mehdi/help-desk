import { registerAs } from '@nestjs/config';

export default registerAs('slack', () => ({
  channel: process.env.SLACK_CHANNEL,
  botName: process.env.SLACK_BOT_NAME || 'HelpDeskBot',
  icon: ':telephone_receiver:',
  url: 'https://slack.com/api/chat.postMessage',
}));
