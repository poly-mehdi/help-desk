import { Test, TestingModule } from '@nestjs/testing';
import { CreateSessionUseCase } from './create-session.use-case';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('CreateSessionUseCase', () => {
  let provider: CreateSessionUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateSessionUseCase, EventEmitter2],
    }).compile();

    provider = module.get<CreateSessionUseCase>(CreateSessionUseCase);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
