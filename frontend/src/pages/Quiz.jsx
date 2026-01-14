import { useState } from 'react';

function Quiz({ quizzes, onSubmit }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const currentQuiz = quizzes[currentIndex];
    const totalQuizzes = quizzes.length;
    const progress = ((currentIndex + 1) / totalQuizzes) * 100;

    const handleSelectAnswer = (optionIndex) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [currentQuiz.id]: optionIndex
        }));
    };

    const handleNext = () => {
        if (currentIndex < totalQuizzes - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const handleSubmit = () => {
        const answers = quizzes.map(quiz => ({
            quizId: quiz.id,
            selectedAnswer: selectedAnswers[quiz.id] ?? -1
        }));
        onSubmit(answers);
    };

    const isAnswered = selectedAnswers[currentQuiz?.id] !== undefined;
    const isLastQuestion = currentIndex === totalQuizzes - 1;
    const answeredCount = Object.keys(selectedAnswers).length;

    if (!currentQuiz) {
        return <div className="loading">퀴즈를 불러오는 중...</div>;
    }

    return (
        <div className="quiz-container">
            <div className="container">
                <div className="quiz-header animate-fadeIn">
                    <div className="quiz-progress">
                        <span className="quiz-progress-text">
                            {currentIndex + 1} / {totalQuizzes}
                        </span>
                        <div className="progress-bar" style={{ flex: 1 }}>
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <span className="quiz-progress-text">
                            {answeredCount}개 답변
                        </span>
                    </div>
                </div>

                <div className="card animate-fadeIn" key={currentQuiz.id}>
                    <h2 className="quiz-question">{currentQuiz.question}</h2>

                    <div className="quiz-options">
                        {currentQuiz.options.map((option, index) => (
                            <button
                                key={index}
                                className={`option-btn animate-slideIn ${selectedAnswers[currentQuiz.id] === index ? 'selected' : ''
                                    }`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onClick={() => handleSelectAnswer(index)}
                            >
                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.1)',
                                    marginRight: '12px',
                                    fontSize: '0.875rem',
                                    fontWeight: '600'
                                }}>
                                    {String.fromCharCode(65 + index)}
                                </span>
                                {option}
                            </button>
                        ))}
                    </div>

                    <div className="quiz-actions" style={{ gap: '1rem', display: 'flex' }}>
                        {currentIndex > 0 && (
                            <button
                                className="btn btn-secondary"
                                onClick={handlePrev}
                            >
                                ← 이전
                            </button>
                        )}

                        <div style={{ flex: 1 }}></div>

                        {isLastQuestion ? (
                            <button
                                className="btn btn-primary"
                                onClick={handleSubmit}
                                disabled={answeredCount < totalQuizzes}
                                style={{
                                    opacity: answeredCount < totalQuizzes ? 0.5 : 1,
                                    cursor: answeredCount < totalQuizzes ? 'not-allowed' : 'pointer'
                                }}
                            >
                                제출하기 ✓
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary"
                                onClick={handleNext}
                            >
                                다음 →
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quiz;
