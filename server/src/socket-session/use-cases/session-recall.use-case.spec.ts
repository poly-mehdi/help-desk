import { Test, TestingModule } from '@nestjs/testing';
import { SessionRecallUseCase } from './session-recall.use-case';
import { WherebyService } from '../../whereby/whereby.service';
import { SessionsService } from '../../sessions/sessions.service';
import { EmailService } from '../../email/email.service';
import { SessionStatus } from '../../sessions/models/session-status.enum';
import { Session } from '../../sessions/interfaces/session.interface';
import { ParticipantRole } from '../../sessions/models/participant-role.enum';
import { WherebyMeetingResponse } from '../../whereby/interfaces/whereby-meeting-response.interface';

describe('SessionRecallUseCase', () => {
  let useCase: SessionRecallUseCase;
  let sessionService: SessionsService;
  let wherebyService: WherebyService;
  let emailService: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionRecallUseCase,
        {
          provide: SessionsService,
          useValue: {
            update: jest.fn(),
            create: jest.fn(),
            addParticipant: jest.fn(),
          },
        },
        {
          provide: WherebyService,
          useValue: {
            createMeeting: jest.fn(),
          },
        },
        {
          provide: EmailService,
          useValue: {
            sendRecallMail: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<SessionRecallUseCase>(SessionRecallUseCase);
    sessionService = module.get<SessionsService>(SessionsService);
    wherebyService = module.get<WherebyService>(WherebyService);
    emailService = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should update the session and create a new session', async () => {
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
      status: SessionStatus.OnHold,
      isResolved: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const mockMeeting: WherebyMeetingResponse = {
      meetingId: '123',
      roomUrl: 'www.room123',
      hostRoomUrl: 'www.host-room123',
      roomName: 'room123',
      startDate: '2021-09-01T00:00:00Z',
      endDate: '2021-09-01T00:00:00Z',
    };
    const mockNewSession: Session = {
      id: '2',
      participants: [
        {
          id: '1',
          email: 'john@doe.com',
          firstName: 'John',
          lastName: 'Doe',
          role: ParticipantRole.Assistant,
        },
      ],
      meetingId: 'meeting123',
      roomUrl: 'room123',
      hostRoomUrl: 'host-room123',
      status: SessionStatus.InProgress,
      isResolved: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const mockUpdatedSession: Session = {
      id: '1',
      participants: [
        {
          id: '1',
          email: 'john@doe.com',
          firstName: 'John',
          lastName: 'Doe',
          role: ParticipantRole.Assistant,
        },
      ],
      meetingId: 'meeting123',
      roomUrl: 'room123',
      hostRoomUrl: 'host-room123',
      status: SessionStatus.Recalled,
      isResolved: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const mockEmailResponse = {
      status: 'success',
    };

    jest.spyOn(sessionService, 'update').mockResolvedValue(mockSession);
    jest.spyOn(wherebyService, 'createMeeting').mockResolvedValue(mockMeeting);

    jest.spyOn(sessionService, 'create').mockResolvedValue(mockNewSession);
    jest.spyOn(sessionService, 'addParticipant').mockResolvedValue();
    jest.spyOn(sessionService, 'update').mockResolvedValue(mockUpdatedSession);
    jest.spyOn(emailService, 'sendRecallMail').mockResolvedValue();

    const data = { session: mockSession };
    const result = await useCase.execute(data);

    expect(sessionService.update).toHaveBeenCalledWith(mockSession.id, {
      status: SessionStatus.Recalled,
    });
    expect(wherebyService.createMeeting).toHaveBeenCalled();
    expect(sessionService.create).toHaveBeenCalledWith({
      status: SessionStatus.InProgress,
      isResolved: false,
      appName: mockSession.appName,
    });
    expect(sessionService.addParticipant).toHaveBeenCalledWith(
      mockNewSession.id,
      mockSession.participants[0],
    );

    expect(sessionService.update).toHaveBeenCalledWith(mockNewSession.id, {
      meetingId: mockMeeting.meetingId,
      roomUrl: mockMeeting.roomUrl,
      hostRoomUrl: mockMeeting.hostRoomUrl,
    });
    expect(emailService.sendRecallMail).toHaveBeenCalledWith(
      mockUpdatedSession.participants[0].email,
      mockUpdatedSession.participants[0].firstName,
      `${process.env.FRONTEND_URL}/session/${mockUpdatedSession.id}?participant=${mockUpdatedSession.participants[0].id}`,
    );
    expect(result).toEqual(mockUpdatedSession);
  });
});
