import type { Question } from '../generated/prisma';
import prisma from '../lib/prisma';

export function createQuestion(
  sessionId: string,
  title: string,
  maxPoints: number,
) {
  return prisma.question.create({
    data: {
      sessionId,
      title,
      maxPoints,
    },
  });
}

export function getQuestionById(id: string) {
  return prisma.question.findUnique({
    where: { id },
  });
}

export function getQuestionsBySessionId(sessionId: string) {
  return prisma.question.findMany({
    where: { sessionId },
  });
}

export function updateQuestion(id: string, data: Partial<Question>) {
  return prisma.question.update({
    where: { id },
    data,
  });
}

export function deleteQuestion(id: string) {
  return prisma.question.delete({
    where: { id },
  });
}

export function listQuestions() {
  return prisma.question.findMany();
}
