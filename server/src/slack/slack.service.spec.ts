import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { SlackService } from './slack.service';
import { of } from 'rxjs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { SlackConfig } from './slack.config';
import { AxiosResponse, AxiosHeaders } from 'axios';

describe('SlackService', () => {
  let service: SlackService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SlackService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SlackService>(SlackService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('postToSlack', () => {
    it('should send a message to Slack successfully', async () => {
      const message = 'Test message';
      const response: AxiosResponse = {
        data: {
          ok: true,
          message: 'Message sent successfully',
        },
        status: 200,
        statusText: 'OK',
        headers: new AxiosHeaders(),
        config: {
          headers: new AxiosHeaders(),
        },
      };

      jest.spyOn(httpService, 'post').mockReturnValue(of(response));

      const result = await service.postToSlack(message);
      expect(result).toEqual('Message sent successfully');
    });

    it('should throw an error if Slack response is not ok', async () => {
      const message = 'Test message';
      const response: AxiosResponse = {
        data: {
          ok: false,
          error: 'Some error',
        },
        status: 200,
        statusText: 'OK',
        headers: new AxiosHeaders(),
        config: {
          headers: new AxiosHeaders(),
        },
      };

      jest.spyOn(httpService, 'post').mockReturnValue(of(response));

      await expect(service.postToSlack(message)).rejects.toThrow(
        expect.objectContaining({
          message: expect.stringContaining(
            'Failed to send Slack message, details: Some error',
          ),
        }),
      );
    });

    it('should throw an error if there is a network error', async () => {
      const message = 'Test message';

      jest.spyOn(httpService, 'post').mockImplementation(() => {
        throw new Error('Network error');
      });

      await expect(service.postToSlack(message)).rejects.toThrow(
        new HttpException(
          `Failed to send Slack message, details: Network error`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
});
