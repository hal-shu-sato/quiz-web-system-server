import { Router, type Request } from 'express';
import { getAnswersByParticipantId } from '../../../services/answer';
import {
  createParticipant,
  getParticipantByReconnectionCode,
} from '../../../services/participant';
import { getSessionByCode, getSessionById } from '../../../services/session';

const router = Router();

router.post(
  '/join',
  async (
    req: Request<
      unknown,
      unknown,
      { code: string; name: string; reconnectionCode: string }
    >,
    res,
  ) => {
    const { code, name, reconnectionCode } = req.body;
    if (!code || !name || !reconnectionCode) {
      return res
        .status(400)
        .json({ error: 'code, name and reconnectionCode required' });
    }

    const session = await getSessionByCode(code);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const { id: sessionId } = session;
    const participant = await createParticipant({
      sessionId,
      name,
      score: 0,
      isDobon: false,
      reconnectionCode,
    });

    res.json({ session, participant });
  },
);

router.post(
  '/login',
  async (
    req: Request<unknown, unknown, { code: string; reconnectionCode: string }>,
    res,
  ) => {
    const { code, reconnectionCode } = req.body;
    if (!code || !reconnectionCode) {
      return res
        .status(400)
        .json({ error: 'code and reconnectionCode required' });
    }

    const session = await getSessionByCode(code);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const { id: sessionId } = session;
    const participant = await getParticipantByReconnectionCode(
      sessionId,
      reconnectionCode,
    );
    if (!participant) {
      return res.status(404).json({ error: 'Participant not found' });
    }

    res.json({ session, participant });
  },
);

router.get('/sessions/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  if (!sessionId) {
    return res.status(400).json({ error: 'sessionId required' });
  }

  const session = await getSessionById(sessionId);
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  res.json(session);
});

router.get(
  '/answers',
  async (
    req: Request<unknown, unknown, unknown, { participantId: string }>,
    res,
  ) => {
    const { participantId } = req.query;
    if (!participantId || typeof participantId !== 'string') {
      return res.status(400).json({ error: 'participantId required' });
    }

    const answers = await getAnswersByParticipantId(participantId);

    res.json(answers);
  },
);

export default router;
