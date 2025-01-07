import { Test, TestingModule } from '@nestjs/testing';
import { StartAssistanceUseCase } from './start-assistance.use-case';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SessionsService } from '../../sessions/sessions.service';
import { getModelToken } from '@nestjs/mongoose';

describe('StartAssistanceUseCase', () => {
  let provider: StartAssistanceUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StartAssistanceUseCase,
        EventEmitter2,
        SessionsService,
        {
          provide: getModelToken('Session'),
          useValue: {},
        },
      ],
    }).compile();

    provider = module.get<StartAssistanceUseCase>(StartAssistanceUseCase);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
