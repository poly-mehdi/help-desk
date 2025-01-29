import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Global, Logger, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        return {
          transport: {
            host: config.get('MAILER_HOST'),
            secure: false,
            port: parseInt(config.get('MAILER_PORT')),
            auth: {
              user: config.get('MAILER_USER'),
              pass: config.get('MAILER_PASS'),
            },
          },
          defaults: {
            from: `"Bench Data" <${config.get('MAILER_SENDER')}>`,
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new EjsAdapter(),
            options: {
              strict: false,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
