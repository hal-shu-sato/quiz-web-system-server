import type { Answer } from '../generated/prisma';
import prisma from '../lib/prisma';

export function createAnswer(data: Omit<Answer, 'id' | 'timestamp'>) {
  return prisma.answer.create({
    data,
  });
}

export function getAnswerById(id: string) {
  return prisma.answer.findUnique({
    where: { id },
  });
}

export function getAnswersByParticipantId(participantId: string) {
  return prisma.answer.findMany({
    where: { participantId },
  });
}

export function getAnswersByQuestionId(questionId: string) {
  return prisma.answer.findMany({
    where: { questionId },
  });
}

export function updateAnswer(id: string, data: Partial<Answer>) {
  return prisma.answer.update({
    where: { id },
    data,
  });
}

export function deleteAnswer(id: string) {
  return prisma.answer.delete({
    where: { id },
  });
}

export function listAnswers() {
  return prisma.answer.findMany();
}
