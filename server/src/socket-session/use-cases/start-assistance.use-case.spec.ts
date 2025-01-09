import { EventEmitter2 } from '@nestjs/event-emitter';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { SessionsService } from '../../sessions/sessions.service';
import { StartAssistanceUseCase } from './start-assistance.use-case';
import { WherebyService } from '../../whereby/whereby.service';
import { HttpService } from '@nestjs/axios';

describe('StartAssistanceUseCase', () => {
  let provider: StartAssistanceUseCase;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StartAssistanceUseCase,
        EventEmitter2,
        SessionsService,
        WherebyService,
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

    provider = module.get<StartAssistanceUseCase>(StartAssistanceUseCase);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
