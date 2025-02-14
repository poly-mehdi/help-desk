import { Test, TestingModule } from '@nestjs/testing';
import { RejectSessionUseCase } from './reject-session.use-case';
import { SessionsService } from '../../sessions/sessions.service';
import { Session } from '../../sessions/interfaces/session.interface';
import { ParticipantRole } from '../../sessions/models/participant-role.enum';
import { SessionStatus } from '../../sessions/models/session-status.enum';

describe('RejectSessionUseCase', () => {
  let useCase: RejectSessionUseCase;
  let sessionService: SessionsService;

  const mockSession: Session = {
    id: '1',
    appName: 'app1',
    participants: [
      {
        id: '1',
        email: 'john@doe.com',
        firstName: 'John',
        lastName: 'Doe',
        role: ParticipantRole.Assistant,
      },
    ],
    status: SessionStatus.Rejected,
    isResolved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    rejectedReason: 'reason',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RejectSessionUseCase,
        {
          provide: SessionsService,
          useValue: {
            update: jest.fn().mockResolvedValue(mockSession),
          },
        },
      ],
    }).compile();

    useCase = module.get<RejectSessionUseCase>(RejectSessionUseCase);
    sessionService = module.get<SessionsService>(SessionsService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should reject a session', async () => {
    const sessionId = '1';
    const rejectedReason = 'reason';
    const result = await useCase.execute({
      sessionId,
      rejectedReason,
    });
    expect(result).toEqual(mockSession);
    expect(sessionService.update).toHaveBeenCalledWith(sessionId, {
      status: SessionStatus.Rejected,
      rejectedReason,
    });
  });
});
