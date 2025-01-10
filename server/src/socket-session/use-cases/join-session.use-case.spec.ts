import { Test, TestingModule } from '@nestjs/testing';
import { JoinSessionUseCase } from './join-session.use-case';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SessionsService } from '../../sessions/sessions.service';
import { getModelToken } from '@nestjs/mongoose';

describe('JoinSessionUseCase', () => {
  let provider: JoinSessionUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JoinSessionUseCase,
        EventEmitter2,
        SessionsService,
        {
          provide: getModelToken('Session'),
          useValue: {},
        },
      ],
    }).compile();

    provider = module.get<JoinSessionUseCase>(JoinSessionUseCase);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
