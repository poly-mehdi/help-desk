import { Test, TestingModule } from '@nestjs/testing';
import { SessionsService } from '../../sessions/sessions.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SessionStatus } from '../../sessions/models/session-status.enum';
import { EndAssistanceByUserUseCase } from './end-assistance-by-user.use-case';

describe('EndAssistanceByUserUseCase', () => {
  let useCase: EndAssistanceByUserUseCase;
  let sessionService: SessionsService;
  let eventEmitter: EventEmitter2;

  const mockSession = {
    id: '1',
    status: SessionStatus.OnHold,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EndAssistanceByUserUseCase,
        {
          provide: SessionsService,
          useValue: {
            update: jest.fn().mockResolvedValue(mockSession),
          },
        },
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<EndAssistanceByUserUseCase>(
      EndAssistanceByUserUseCase,
    );
    sessionService = module.get<SessionsService>(SessionsService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should update the session status to OnHold and emit an event', async () => {
    const inputData = {
      sessionId: '1',
      participantId: '123',
    };

    await useCase.execute(inputData);

    expect(sessionService.update).toHaveBeenCalledWith('1', {
      status: SessionStatus.OnHold,
    });

    expect(eventEmitter.emit).toHaveBeenCalledWith('assistance.ended.by.user', {
      session: mockSession,
    });
  });
});
