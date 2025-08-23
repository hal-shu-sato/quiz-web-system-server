import type { Session } from '../generated/prisma';
import prisma from '../lib/prisma';

export function createSession(
  title: string,
  code: string,
  startAt?: Date,
  endAt?: Date,
) {
  return prisma.session.create({
    data: {
      title,
      code,
      startAt,
      endAt,
    },
  });
}

export function getSessionById(id: string) {
  return prisma.session.findUnique({
    where: { id },
  });
}

export function getSessionByCode(code: string) {
  return prisma.session.findUnique({
    where: { code },
  });
}
export function updateSession(id: string, data: Partial<Session>) {
  return prisma.session.update({
    where: { id },
    data,
  });
}

export function deleteSession(id: string) {
  return prisma.session.delete({
    where: { id },
  });
}
