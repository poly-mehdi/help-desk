import { Injectable } from '@nestjs/common';

@Injectable()
export class ParticipantSocketMapService {
  private participantSocketMap = new Map<string, string>();

  setParticipantSocket(participantId: string, socketId: string) {
    this.participantSocketMap.set(participantId, socketId);
  }

  getSocketId(participantId: string) {
    return this.participantSocketMap.get(participantId);
  }

  deleteParticipantSocket(participantId: string) {
    this.participantSocketMap.delete(participantId);
  }
}
