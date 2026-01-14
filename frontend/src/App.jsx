import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import { api } from './services/api';
import './App.css';

function App() {
  const [page, setPage] = useState('home');
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getQuizzes();
      setQuizzes(data.quizzes);
      setAnswers([]);
      setResult(null);
      setPage('quiz');
    } catch (err) {
      setError('퀴즈를 불러오는 데 실패했습니다. 서버가 실행 중인지 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const submitQuiz = async (userAnswers) => {
    setLoading(true);
    try {
      const data = await api.submitAnswers(userAnswers);
      setResult(data);
      setAnswers(userAnswers);
      setPage('result');
    } catch (err) {
      setError('답안 제출에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const goHome = () => {
    setPage('home');
    setQuizzes([]);
    setAnswers([]);
    setResult(null);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <>
      {page === 'home' && (
        <Home onStart={startQuiz} error={error} />
      )}
      {page === 'quiz' && (
        <Quiz quizzes={quizzes} onSubmit={submitQuiz} />
      )}
      {page === 'result' && (
        <Result
          result={result}
          quizzes={quizzes}
          answers={answers}
          onRestart={startQuiz}
          onHome={goHome}
        />
      )}
    </>
  );
}

export default App;
