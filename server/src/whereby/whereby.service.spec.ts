import { Test, TestingModule } from '@nestjs/testing';
import { WherebyService } from './whereby.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { WherebyMeetingResponse } from './interfaces/whereby-meeting-response.interface';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

describe('WherebyService', () => {
  let service: WherebyService;
  let httpService: HttpService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WherebyService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              switch (key) {
                case 'whereby.api_url':
                  return process.env.WHEREBY_API_URL;
                case 'whereby.api_key':
                  return process.env.WHEREBY_API_KEY;
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<WherebyService>(WherebyService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createMeeting', () => {
    it('should create a meeting and return the response', async () => {
      const mockResponse: AxiosResponse<WherebyMeetingResponse> = {
        data: {
          roomUrl: 'https://whereby.com/test-room',
          hostRoomUrl: 'https://whereby.com/host-room',
          meetingId: '123456',
          startDate: '26/01',
          endDate: '28/01',
          roomName: 'room123456',
        },
        status: 201,
        statusText: 'Created',
        headers: {},
        config: {
          headers: undefined,
        },
      };

      jest.spyOn(httpService, 'post').mockReturnValueOnce(of(mockResponse));

      const result = await service.createMeeting();

      expect(result).toEqual(mockResponse.data);
      expect(httpService.post).toHaveBeenCalledWith(
        configService.get<string>('whereby.api_url'),
        expect.objectContaining({
          roomMode: 'normal',
        }),
        expect.objectContaining({
          headers: {
            Authorization: `Bearer ${configService.get<string>('whereby.api_key')}`,
          },
        }),
      );
    });

    it('should throw an error if the API call fails', async () => {
      jest
        .spyOn(httpService, 'post')
        .mockReturnValueOnce(throwError(() => new Error('Request failed')));

      await expect(service.createMeeting()).rejects.toThrow(
        'Failed to create meeting',
      );
    });
  });
});
