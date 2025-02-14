export class CreateSessionDto {
  readonly status: string;
  readonly isResolved: boolean;
  readonly appName?: string;
  readonly language?: string;
}
