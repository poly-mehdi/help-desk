import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SessionsService } from '../../sessions/sessions.service';
import { Session } from '../../sessions/interfaces/session.interface';
import { ParticipantRole } from '../../sessions/models/participant-role.enum';
import { SessionStatus } from '../../sessions/models/session-status.enum';
import { SessionCreatedEvent } from '../events/session-created.event';
import { CreateSessionUseCase } from './create-session.use-case';

describe('CreateSessionUseCase', () => {
  let useCase: CreateSessionUseCase;
  let sessionService: SessionsService;
  let eventEmitter: EventEmitter2;

  const mockSession: Session = {
    id: '1',
    status: SessionStatus.Pending,
    isResolved: false,
    appName: 'TestApp',
    participants: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateSessionUseCase,
        {
          provide: SessionsService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockSession),
            addParticipant: jest.fn().mockResolvedValue(undefined),
            findOne: jest.fn().mockResolvedValue({
              ...mockSession,
              participants: [
                {
                  firstName: 'John',
                  lastName: 'Doe',
                  email: 'john@example.com',
                  role: ParticipantRole.Customer,
                },
              ],
            }),
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

    useCase = module.get<CreateSessionUseCase>(CreateSessionUseCase);
    sessionService = module.get<SessionsService>(SessionsService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should create a session, add a participant, and emit an event', async () => {
    const inputData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      appName: 'TestApp',
    };

    const result = await useCase.execute(inputData);

    expect(sessionService.create).toHaveBeenCalledWith({
      status: SessionStatus.Pending,
      appName: 'TestApp',
      isResolved: false,
    });

    expect(sessionService.addParticipant).toHaveBeenCalledWith('1', {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      role: ParticipantRole.Customer,
    });

    expect(sessionService.findOne).toHaveBeenCalledWith('1');

    expect(eventEmitter.emit).toHaveBeenCalledWith(
      'session.created',
      new SessionCreatedEvent('John', 'Doe', 'john@example.com', result),
    );
    expect(result).toEqual({
      ...mockSession,
      participants: [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          role: ParticipantRole.Customer,
        },
      ],
    });
  });
});
