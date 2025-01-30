import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { MailerService } from '@nestjs-modules/mailer';

const mockMailerService = {
  sendMail: jest.fn().mockResolvedValue(true),
};

describe('EmailService', () => {
  let service: EmailService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        { provide: MailerService, useValue: mockMailerService },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    mailerService = module.get<MailerService>(MailerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send recall email with correct parameters', async () => {
    const testData = {
      mailAddress: 'test@example.com',
      name: 'John Doe',
      url: 'https://example.com/recall',
    };

    await service.sendRecallMail(
      testData.mailAddress,
      testData.name,
      testData.url,
    );

    expect(mailerService.sendMail).toHaveBeenCalledWith({
      to: testData.mailAddress,
      subject: 'Follow-Up on Your Support Request',
      template: './recall',
      context: {
        name: testData.name,
        url: testData.url,
      },
    });
  });

  it('should throw error when mail sending fails', async () => {
    const error = new Error('SMTP Error');
    mockMailerService.sendMail.mockRejectedValueOnce(error);

    await expect(
      service.sendRecallMail('test@example.com', 'John', 'http://test.com'),
    ).rejects.toThrow(error);
  });

  it('should use correct template and static content', async () => {
    await service.sendRecallMail('test@example.com', 'John', 'http://test.com');

    const sendMailCall = mockMailerService.sendMail.mock.calls[0][0];

    expect(sendMailCall.template).toBe('./recall');
    expect(sendMailCall.subject).toBe('Follow-Up on Your Support Request');
  });
});
