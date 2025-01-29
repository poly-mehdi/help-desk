import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MailerModule.forRoot({
          transport: {
            host: process.env.MAILER_HOST,
            port: parseInt(process.env.MAILER_PORT),
            auth: {
              user: process.env.MAILER_USER,
              pass: process.env.MAILER_PASS,
            },
          },
        }),
      ],
      providers: [EmailService],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
