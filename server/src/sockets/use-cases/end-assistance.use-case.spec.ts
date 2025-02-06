import { Test, TestingModule } from '@nestjs/testing';
import { EndAssistanceUseCase } from './end-assistance.use-case';
import { SessionsService } from '../../sessions/sessions.service';
import { HttpService } from '@nestjs/axios';
import { SessionStatus } from '../../sessions/models/session-status.enum';
import { of, throwError } from 'rxjs';
import { AxiosHeaders, AxiosResponse } from 'axios';

describe('EndAssistanceUseCase', () => {
  let useCase: EndAssistanceUseCase;
  let sessionService: SessionsService;
  let httpService: HttpService;

  const mockSession = {
    id: '1',
    status: SessionStatus.Completed,
    meetingId: 'meeting123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EndAssistanceUseCase,
        {
          provide: SessionsService,
          useValue: {
            update: jest.fn().mockResolvedValue(mockSession),
          },
        },
        {
          provide: HttpService,
          useValue: {
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<EndAssistanceUseCase>(EndAssistanceUseCase);
    sessionService = module.get<SessionsService>(SessionsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should update the session and delete the meeting', async () => {
    const inputData = {
      sessionId: '1',
      isResolved: true,
      issueType: 'Technical',
      description: 'Issue description',
    };
    const mockAxiosResponse: AxiosResponse = {
      data: {},
      status: 200,
      statusText: 'OK',
      headers: new AxiosHeaders(),
      config: {
        headers: new AxiosHeaders(),
      },
    };

    jest.spyOn(httpService, 'delete').mockReturnValue(of(mockAxiosResponse));

    await useCase.execute(inputData);

    expect(sessionService.update).toHaveBeenCalledWith('1', {
      status: SessionStatus.Completed,
      isResolved: true,
      issueType: 'Technical',
      description: 'Issue description',
    });

    expect(httpService.delete).toHaveBeenCalledWith(
      `${process.env.WHEREBY_API_URL}/meeting123`,
      {
        headers: {
          Authorization: `Bearer ${process.env.WHEREBY_API_KEY}`,
        },
      },
    );
  });

  it('should handle error in deleting meeting and revert session status', async () => {
    const inputData = {
      sessionId: '1',
      isResolved: false,
      issueType: 'Technical',
      description: 'Issue description',
    };

    jest
      .spyOn(httpService, 'delete')
      .mockReturnValue(throwError(() => new Error('Failed to delete')));

    await expect(useCase.execute(inputData)).rejects.toThrow(
      'Failed to delete meeting',
    );

    expect(sessionService.update).toHaveBeenCalledWith('1', {
      status: SessionStatus.Pending,
    });
  });
});
