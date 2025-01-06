import { Test, TestingModule } from '@nestjs/testing';
import { NotifyController } from './notify.controller';
import { SlackService } from './providers/slack.service';

describe('SlackController', () => {
  let notifyController: NotifyController;
  let slackService: SlackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotifyController],
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

    notifyController = module.get<NotifyController>(NotifyController);
    slackService = module.get<SlackService>(SlackService);
  });

  it('should be defined', () => {
    expect(notifyController).toBeDefined();
  });

  describe('testSlack', () => {
    // it('should call SlackService.postToSlack and return the result', async () => {
    //   const result = await notifyController.testSlack();
    //   expect(result).toBe('Message sent successfully');
    //   expect(slackService.postToSlack).toHaveBeenCalledWith(
    //     "Hello from NestJS, I'm a bot message!",
    //   );
    // });
  });
});
