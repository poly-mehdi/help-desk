import { HttpService } from '@nestjs/axios';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { SessionStatus } from '../../sessions/models/session-status.enum';
import { SessionsService } from '../../sessions/sessions.service';
import { WherebyService } from '../../whereby/whereby.service';
import { StartAssistanceUseCase } from './start-assistance.use-case';

describe('StartAssistanceUseCase', () => {
  let useCase: StartAssistanceUseCase;
  let sessionService: SessionsService;
  let wherebyService: WherebyService;
  let eventEmitter: EventEmitter2;

  const mockSession = {
    id: '1',
    status: SessionStatus.Pending,
    meetingId: null,
    roomUrl: null,
    hostRoomUrl: null,
    startTime: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StartAssistanceUseCase,
        {
          provide: SessionsService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockSession),
            update: jest.fn(),
          },
        },
        {
          provide: WherebyService,
          useValue: {
            createMeeting: jest.fn(),
          },
        },
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
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

    useCase = module.get<StartAssistanceUseCase>(StartAssistanceUseCase);
    sessionService = module.get<SessionsService>(SessionsService);
    wherebyService = module.get<WherebyService>(WherebyService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should start assistance', async () => {
    const sessionId = '1';
    const meeting = {
      meetingId: '1',
      roomUrl: 'roomUrl',
      hostRoomUrl: 'hostRoomUrl',
    };
    const updatedSession = {
      ...mockSession,
      status: SessionStatus.InProgress,
      meetingId: meeting.meetingId,
      roomUrl: meeting.roomUrl,
      hostRoomUrl: meeting.hostRoomUrl,
      startTime: new Date(),
    };
    (wherebyService.createMeeting as jest.Mock).mockResolvedValue(meeting);
    (sessionService.update as jest.Mock).mockResolvedValue(updatedSession);

    const result = await useCase.execute({ sessionId });
    expect(result).toEqual(meeting.hostRoomUrl);
    expect(sessionService.update).toHaveBeenCalledWith(sessionId, {
      status: SessionStatus.InProgress,
      meetingId: meeting.meetingId,
      roomUrl: meeting.roomUrl,
      hostRoomUrl: meeting.hostRoomUrl,
      startTime: expect.any(Date),
    });
    expect(eventEmitter.emit).toHaveBeenCalledWith('assistance.started', {
      session: updatedSession,
      roomUrl: meeting.roomUrl,
    });
  });

  it('should handle error in creating meeting and revert session status', async () => {
    const sessionId = '1';

    jest
      .spyOn(wherebyService, 'createMeeting')
      .mockRejectedValue(new Error('Failed to create meeting'));

    await expect(useCase.execute({ sessionId })).rejects.toThrow(
      'Failed to create meeting',
    );

    expect(sessionService.update).toHaveBeenCalledWith(sessionId, {
      status: SessionStatus.Pending,
    });
  });
});
