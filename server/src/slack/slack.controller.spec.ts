import { Test, TestingModule } from '@nestjs/testing';
import { SlackController } from './slack.controller';
import { SlackService } from './slack.service';

describe('SlackController', () => {
  let slackController: SlackController;
  let slackService: SlackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlackController],
      providers: [
        {
          provide: SlackService,
          useValue: {
            postToSlack: jest
              .fn()
              .mockResolvedValue('Message sent successfully'),
          },
        },
      ],
    }).compile();

    slackController = module.get<SlackController>(SlackController);
    slackService = module.get<SlackService>(SlackService);
  });

  it('should be defined', () => {
    expect(slackController).toBeDefined();
  });

  describe('testSlack', () => {
    it('should call SlackService.postToSlack and return the result', async () => {
      const result = await slackController.testSlack();
      expect(result).toBe('Message sent successfully');
      expect(slackService.postToSlack).toHaveBeenCalledWith(
        "Hello from NestJS, I'm a bot message!",
      );
    });
  });
});
