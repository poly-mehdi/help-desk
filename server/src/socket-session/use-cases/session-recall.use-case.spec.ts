import { Test, TestingModule } from '@nestjs/testing';
import { SessionRecallUseCase } from './session-recall.use-case';
import { WherebyService } from '../../whereby/whereby.service';
import { SessionsService } from '../../sessions/sessions.service';
import { getModelToken } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { EmailService } from '../../email/email.service';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailModule } from '../../email/email.module';

describe('SessionRecallUseCase', () => {
  let provider: SessionRecallUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionRecallUseCase,
        WherebyService,
        SessionsService,
        {
          provide: getModelToken('Session'),
          useValue: {},
        },
        EmailService,
        HttpService,
      ],
    }).compile();

    provider = module.get<SessionRecallUseCase>(SessionRecallUseCase);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
