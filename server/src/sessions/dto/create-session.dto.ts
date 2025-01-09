export class CreateSessionDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone?: string;
  readonly appName?: string;
  readonly status?: string;
  readonly meetingId?: string;
}
