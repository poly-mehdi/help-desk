import { Test, TestingModule } from '@nestjs/testing';
import { EndAssistanceByUserUseCase } from './end-assistance-by-user.use-case';
import { SessionsService } from '../../sessions/sessions.service';
import { getModelToken } from '@nestjs/mongoose';

describe('EndAssistanceByUserUseCase', () => {
  let provider: EndAssistanceByUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EndAssistanceByUserUseCase,
        SessionsService,
        {
          provide: getModelToken('Session'),
          useValue: {},
        },
      ],
    }).compile();

    provider = module.get<EndAssistanceByUserUseCase>(
      EndAssistanceByUserUseCase,
    );
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
