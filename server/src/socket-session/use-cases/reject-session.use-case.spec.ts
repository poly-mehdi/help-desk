import { Test, TestingModule } from '@nestjs/testing';
import { RejectSessionUseCase } from './reject-session.use-case';
import { SessionsService } from '../../sessions/sessions.service';
import { getModelToken } from '@nestjs/mongoose';

describe('RejectSessionUseCase', () => {
  let provider: RejectSessionUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RejectSessionUseCase,
        SessionsService,
        {
          provide: getModelToken('Session'),
          useValue: {},
        },
      ],
    }).compile();

    provider = module.get<RejectSessionUseCase>(RejectSessionUseCase);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
