import * as session from 'express-session';

declare module 'http' {
  interface IncomingMessage {
    session: SessionData;
  }
}
