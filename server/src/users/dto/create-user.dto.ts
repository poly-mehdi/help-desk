export class CreateUserDto {
  readonly username: string;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly date: Date;
  readonly appName: string;
  readonly status: string;
}
