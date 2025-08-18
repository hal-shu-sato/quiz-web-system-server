export type SessionState =
  | 'wait'
  | 'question'
  | 'answer'
  | 'judge'
  | 'answer_check'
  | 'judge_check';

export type ScreenState = 'linked' | 'answers' | 'judges' | 'scores';

export interface ServerToClientEvents {
  'state:updated': (state: SessionState) => void;

  'judge:updated': (judge: {
    question_id: string;
    judge: 'correct' | 'partial' | 'incorrect' | 'dobon';
    points: number;
  }) => void;
}

export interface ClientToServerEvents {
  'answer:create': (answer: {
    session_id: string;
    participant_id: string;
    question_id: string;
    answer_text: string;
    answer_base64: string;
  }) => void;
}

export interface AdminServerToClientEvents {
  'state:updated': (state: SessionState) => void;

  'screen:updated': (screen: ScreenState) => void;

  'participants:updated': (
    participants: {
      id: string;
      name: string;
      score: number;
      answer_order: number;
    }[],
  ) => void;

  'question:updated': (question: {
    id: string;
    title: string;
    points: number;
    type: string;
  }) => void;

  'answers:updated': (
    answers: {
      id: string;
      session_id: string;
      participant_id: string;
      question_id: string;
      answer_text: string;
      answer_image_url: string;
      judge: 'pending' | 'correct' | 'partial' | 'incorrect' | 'dobon';
      points: number;
    }[],
  ) => void;
}

export interface AdminClientToServerEvents {
  'state:update': (state: SessionState) => void;

  'screen:update': (screen: ScreenState) => void;

  'question:create': (question: {
    question_title: string;
    question_points: number;
    question_type: string;
  }) => void;

  'question:update': (
    id: string,
    question: {
      question_title: string;
      question_points: number;
      question_type: string;
    },
  ) => void;

  'judge:update': (
    id: string,
    judge: 'correct' | 'partial' | 'incorrect' | 'dobon',
    points: number,
  ) => void;

  'answer:delete': (id: string) => void;
}
