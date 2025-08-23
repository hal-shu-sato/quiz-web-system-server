import type { Participant } from '../generated/prisma';
import prisma from '../lib/prisma';

export function createParticipant(data: Omit<Participant, 'id'>) {
  return prisma.participant.create({
    data,
  });
}

export function getParticipantById(id: string) {
  return prisma.participant.findUnique({
    where: { id },
  });
}

export function getParticipantsBySessionId(sessionId: string) {
  return prisma.participant.findMany({
    where: { sessionId },
  });
}

export function getParticipantByReconnectionCode(
  sessionId: string,
  reconnectionCode: string,
) {
  return prisma.participant.findUnique({
    where: {
      sessionId_reconnectionCode: {
        sessionId,
        reconnectionCode,
      },
    },
  });
}

export function updateParticipant(id: string, data: Partial<Participant>) {
  return prisma.participant.update({
    where: { id },
    data,
  });
}

export function deleteParticipant(id: string) {
  return prisma.participant.delete({
    where: { id },
  });
}

export function listParticipants() {
  return prisma.participant.findMany();
}
