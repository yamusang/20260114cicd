import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

// CORS 설정
app.use('/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
}));

// AI 퀴즈 데이터
const quizzes = [
  {
    id: 1,
    question: "인공지능(AI)의 아버지로 불리는 사람은 누구인가요?",
    options: ["앨런 튜링", "제프리 힌튼", "일론 머스크", "스티브 잡스"],
    answer: 0,
    explanation: "앨런 튜링은 튜링 테스트를 제안하고 컴퓨터 과학의 기초를 닦아 '인공지능의 아버지'로 불립니다."
  },
  {
    id: 2,
    question: "딥러닝에서 주로 사용되는 신경망 구조는 무엇인가요?",
    options: ["결정 트리", "서포트 벡터 머신", "인공 신경망", "랜덤 포레스트"],
    answer: 2,
    explanation: "딥러닝은 여러 층의 인공 신경망(Artificial Neural Network)을 사용하여 복잡한 패턴을 학습합니다."
  },
  {
    id: 3,
    question: "GPT는 무엇의 약자인가요?",
    options: ["General Purpose Technology", "Generative Pre-trained Transformer", "Global Processing Tool", "Graphical Processing Terminal"],
    answer: 1,
    explanation: "GPT는 Generative Pre-trained Transformer의 약자로, 사전 학습된 생성형 트랜스포머 모델입니다."
  },
  {
    id: 4,
    question: "머신러닝에서 '과적합(Overfitting)'이란 무엇인가요?",
    options: ["모델이 너무 단순한 경우", "모델이 학습 데이터에만 잘 맞는 경우", "모델이 학습을 못하는 경우", "모델의 크기가 너무 큰 경우"],
    answer: 1,
    explanation: "과적합은 모델이 학습 데이터에 너무 맞춰져서 새로운 데이터에 대한 일반화 능력이 떨어지는 현상입니다."
  },
  {
    id: 5,
    question: "CNN은 주로 어떤 종류의 데이터를 처리하는 데 사용되나요?",
    options: ["텍스트 데이터", "음성 데이터", "이미지 데이터", "시계열 데이터"],
    answer: 2,
    explanation: "CNN(Convolutional Neural Network)은 합성곱 연산을 통해 이미지의 특징을 효과적으로 추출합니다."
  },
  {
    id: 6,
    question: "자연어 처리(NLP)에서 'Transformer' 아키텍처를 처음 소개한 논문의 제목은?",
    options: ["Deep Learning", "ImageNet Classification", "Attention Is All You Need", "BERT: Pre-training of Deep Bidirectional Transformers"],
    answer: 2,
    explanation: "'Attention Is All You Need' 논문(2017)에서 Google 연구팀이 Transformer 아키텍처를 처음 제안했습니다."
  },
  {
    id: 7,
    question: "강화학습에서 에이전트가 행동을 결정하는 기준이 되는 것은?",
    options: ["손실 함수", "정책(Policy)", "그래디언트", "배치 크기"],
    answer: 1,
    explanation: "강화학습에서 정책(Policy)은 주어진 상태에서 어떤 행동을 취할지 결정하는 전략입니다."
  },
  {
    id: 8,
    question: "다음 중 생성형 AI 모델이 아닌 것은?",
    options: ["DALL-E", "Stable Diffusion", "ResNet", "Midjourney"],
    answer: 2,
    explanation: "ResNet은 이미지 분류를 위한 심층 잔차 학습 네트워크이며, 생성형 모델이 아닙니다."
  },
  {
    id: 9,
    question: "LLM(Large Language Model)의 파라미터 수가 많아지면 일반적으로 어떤 현상이 나타나나요?",
    options: ["학습 속도가 빨라진다", "모델의 성능이 향상된다", "메모리 사용량이 줄어든다", "과적합이 감소한다"],
    answer: 1,
    explanation: "일반적으로 LLM의 파라미터 수가 증가하면 더 복잡한 패턴을 학습할 수 있어 성능이 향상됩니다."
  },
  {
    id: 10,
    question: "AI 윤리에서 '설명 가능한 AI(XAI)'가 중요한 이유는?",
    options: ["모델의 속도를 높이기 위해", "AI의 결정 과정을 이해하고 신뢰하기 위해", "학습 데이터를 줄이기 위해", "하드웨어 비용을 절감하기 위해"],
    answer: 1,
    explanation: "XAI는 AI 시스템의 의사결정 과정을 인간이 이해할 수 있게 하여 신뢰성과 투명성을 확보합니다."
  }
];

// API 라우트
app.get('/', (c) => {
  return c.json({ message: 'AI Quiz API Server', version: '1.0.0' });
});

// 모든 퀴즈 조회
app.get('/api/quizzes', (c) => {
  const quizList = quizzes.map(({ id, question, options }) => ({
    id,
    question,
    options
  }));
  return c.json({ quizzes: quizList, total: quizList.length });
});

// 특정 퀴즈 조회
app.get('/api/quizzes/:id', (c) => {
  const id = parseInt(c.req.param('id'));
  const quiz = quizzes.find(q => q.id === id);
  
  if (!quiz) {
    return c.json({ error: 'Quiz not found' }, 404);
  }
  
  const { answer, explanation, ...quizData } = quiz;
  return c.json(quizData);
});

// 퀴즈 답안 제출
app.post('/api/quizzes/submit', async (c) => {
  const body = await c.req.json();
  const { answers } = body; // [{ quizId: 1, selectedAnswer: 0 }, ...]
  
  if (!answers || !Array.isArray(answers)) {
    return c.json({ error: 'Invalid answers format' }, 400);
  }
  
  let correctCount = 0;
  const results = answers.map(({ quizId, selectedAnswer }) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) {
      return { quizId, correct: false, error: 'Quiz not found' };
    }
    
    const isCorrect = quiz.answer === selectedAnswer;
    if (isCorrect) correctCount++;
    
    return {
      quizId,
      correct: isCorrect,
      correctAnswer: quiz.answer,
      explanation: quiz.explanation
    };
  });
  
  return c.json({
    totalQuestions: answers.length,
    correctAnswers: correctCount,
    score: Math.round((correctCount / answers.length) * 100),
    results
  });
});

export default app;
