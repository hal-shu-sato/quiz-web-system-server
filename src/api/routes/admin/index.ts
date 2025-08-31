import { Request, Router } from 'express';
import type { AnswerType, JudgmentResult } from '../../../generated/prisma';
import {
  createAnswer,
  deleteAnswer,
  getAnswerById,
  updateAnswer,
} from '../../../services/answer';
import {
  createParticipant,
  deleteParticipant,
  getParticipantById,
  updateParticipant,
} from '../../../services/participant';
import {
  createQuestion,
  deleteQuestion,
  getQuestionById,
  updateQuestion,
} from '../../../services/question';
import {
  createSession,
  deleteSession,
  getSessionById,
  updateSession,
} from '../../../services/session';

const router = Router();

// Session CRUD
router.post(
  '/sessions',
  async (
    req: Request<
      unknown,
      unknown,
      {
        title: string;
        code: string;
        startAt?: string;
        endAt?: string;
      }
    >,
    res,
  ) => {
    const { title, code, startAt, endAt } = req.body;
    const session = await createSession(
      title,
      code,
      startAt ? new Date(startAt) : undefined,
      endAt ? new Date(endAt) : undefined,
    );
    res.json(session);
  },
);
router.get('/sessions/:id', async (req, res) => {
  const session = await getSessionById(req.params.id);
  res.json(session);
});
router.put(
  '/sessions/:id',
  async (
    req: Request<
      { id: string },
      unknown,
      {
        title?: string;
        code?: string;
        startAt?: string;
        endAt?: string;
      }
    >,
    res,
  ) => {
    const { title, code, startAt, endAt } = req.body;
    const session = await updateSession(req.params.id, {
      title,
      code,
      startAt: startAt ? new Date(startAt) : undefined,
      endAt: endAt ? new Date(endAt) : undefined,
    });
    res.json(session);
  },
);
router.delete('/sessions/:id', async (req, res) => {
  const session = await deleteSession(req.params.id);
  res.json(session);
});

// Participant CRUD
router.post(
  '/participants',
  async (
    req: Request<
      unknown,
      unknown,
      { sessionId: string; name: string; reconnectionCode: string }
    >,
    res,
  ) => {
    const { sessionId, name, reconnectionCode } = req.body;
    const participant = await createParticipant({
      name,
      sessionId,
      score: 0,
      isDobon: false,
      reconnectionCode,
    });
    res.json(participant);
  },
);
router.get('/participants/:id', async (req, res) => {
  const participant = await getParticipantById(req.params.id);
  res.json(participant);
});
router.put(
  '/participants/:id',
  async (
    req: Request<
      { id: string },
      unknown,
      {
        name?: string;
        reconnectionCode?: string;
        score?: number;
        isDobon?: boolean;
      }
    >,
    res,
  ) => {
    const participant = await updateParticipant(req.params.id, req.body);
    res.json(participant);
  },
);
router.delete('/participants/:id', async (req, res) => {
  const participant = await deleteParticipant(req.params.id);
  res.json(participant);
});

// Question CRUD
router.post(
  '/questions',
  async (
    req: Request<
      unknown,
      unknown,
      { sessionId: string; title: string; maxPoints: number }
    >,
    res,
  ) => {
    const { sessionId, title, maxPoints } = req.body;
    const question = await createQuestion(sessionId, title, maxPoints);
    res.json(question);
  },
);
router.get('/questions/:id', async (req, res) => {
  const question = await getQuestionById(req.params.id);
  res.json(question);
});
router.put(
  '/questions/:id',
  async (
    req: Request<
      { id: string },
      unknown,
      {
        title?: string;
        maxPoints?: number;
      }
    >,
    res,
  ) => {
    const question = await updateQuestion(req.params.id, req.body);
    res.json(question);
  },
);
router.delete('/questions/:id', async (req, res) => {
  const question = await deleteQuestion(req.params.id);
  res.json(question);
});

// Answer CRUD
router.post(
  '/answers',
  async (
    req: Request<
      unknown,
      unknown,
      {
        participantId: string;
        questionId: string;
        answerType: AnswerType;
        answerText: string | null;
        answerImagePath: string | null;
        judgmentResult: JudgmentResult;
        awardedPoints: number;
      }
    >,
    res,
  ) => {
    const answer = await createAnswer(req.body);
    res.json(answer);
  },
);
router.get('/answers/:id', async (req, res) => {
  const answer = await getAnswerById(req.params.id);
  res.json(answer);
});
router.put(
  '/answers/:id',
  async (
    req: Request<
      { id: string },
      unknown,
      {
        answerType?: AnswerType;
        answerText?: string | null;
        answerImagePath?: string | null;
        judgmentResult?: JudgmentResult;
        awardedPoints?: number;
      }
    >,
    res,
  ) => {
    const answer = await updateAnswer(req.params.id, req.body);
    res.json(answer);
  },
);
router.delete('/answers/:id', async (req, res) => {
  const answer = await deleteAnswer(req.params.id);
  res.json(answer);
});

export default router;
