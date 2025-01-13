import { Test, TestingModule } from '@nestjs/testing';
import { GetSessionsUseCase } from './get-sessions.use-case';
import { SessionsService } from '../../sessions/sessions.service';
import { getModelToken } from '@nestjs/mongoose';

describe('GetSessionsUseCase', () => {
  let provider: GetSessionsUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetSessionsUseCase,
        SessionsService,
        {
          provide: getModelToken('Session'),
          useValue: {},
        },
      ],
    }).compile();

    provider = module.get<GetSessionsUseCase>(GetSessionsUseCase);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
