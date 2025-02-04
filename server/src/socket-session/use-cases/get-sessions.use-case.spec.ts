import { Test, TestingModule } from '@nestjs/testing';
import { GetSessionsUseCase } from './get-sessions.use-case';
import { SessionsService } from '../../sessions/sessions.service';
import { getModelToken } from '@nestjs/mongoose';
import { find } from 'rxjs';

describe('GetSessionsUseCase', () => {
  let useCase: GetSessionsUseCase;
  let sessionService: SessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetSessionsUseCase,
        {
          provide: SessionsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetSessionsUseCase>(GetSessionsUseCase);
    sessionService = module.get<SessionsService>(SessionsService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return all sessions', async () => {
    const sessions = await useCase.execute();
    expect(sessions).toEqual([]);
  });
});
