import { Test, TestingModule } from '@nestjs/testing';
import { SessionRecallUseCase } from './session-recall.use-case';
import { WherebyService } from '../../whereby/whereby.service';
import { SessionsService } from '../../sessions/sessions.service';
import { getModelToken } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { MailerModule } from '@nestjs-modules/mailer';

describe('SessionRecallUseCase', () => {
  let provider: SessionRecallUseCase;

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
      providers: [
        SessionRecallUseCase,
        WherebyService,
        SessionsService,
        {
          provide: getModelToken('Session'),
          useValue: {},
        },
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    provider = module.get<SessionRecallUseCase>(SessionRecallUseCase);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
