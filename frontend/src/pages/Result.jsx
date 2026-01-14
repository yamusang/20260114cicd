function Result({ result, quizzes, answers, onRestart, onHome }) {
    const { score, correctAnswers, totalQuestions, results } = result;

    const getMessage = () => {
        if (score >= 90) return '🏆 완벽해요! AI 전문가시네요!';
        if (score >= 70) return '🎉 훌륭해요! AI에 대해 잘 알고 계시네요!';
        if (score >= 50) return '👍 좋아요! 조금 더 공부하면 전문가가 될 수 있어요!';
        return '💪 화이팅! AI 공부를 더 해보세요!';
    };

    const getScoreColor = () => {
        if (score >= 70) return '#38ef7d';
        if (score >= 50) return '#f5a623';
        return '#f45c43';
    };

    return (
        <div className="result animate-fadeIn">
            <div className="result-score" style={{ color: getScoreColor() }}>
                {score}점
            </div>

            <div className="result-message">{getMessage()}</div>

            <div className="result-stats">
                <div className="result-stat">
                    <div className="result-stat-value" style={{ color: '#38ef7d' }}>
                        {correctAnswers}
                    </div>
                    <div className="result-stat-label">정답</div>
                </div>
                <div className="result-stat">
                    <div className="result-stat-value" style={{ color: '#f45c43' }}>
                        {totalQuestions - correctAnswers}
                    </div>
                    <div className="result-stat-label">오답</div>
                </div>
                <div className="result-stat">
                    <div className="result-stat-value">{totalQuestions}</div>
                    <div className="result-stat-label">총 문제</div>
                </div>
            </div>

            <div className="result-details">
                <h3 style={{ marginBottom: '1rem', textAlign: 'left' }}>📋 상세 결과</h3>
                {results.map((item, index) => {
                    const quiz = quizzes.find(q => q.id === item.quizId);
                    const userAnswer = answers.find(a => a.quizId === item.quizId);

                    return (
                        <div
                            key={item.quizId}
                            className={`result-item ${item.correct ? 'correct' : 'incorrect'}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="result-item-question">
                                {item.correct ? '✓' : '✗'} Q{index + 1}. {quiz?.question}
                            </div>
                            <div style={{
                                fontSize: '0.875rem',
                                marginBottom: '0.5rem',
                                color: item.correct ? '#38ef7d' : '#f45c43'
                            }}>
                                내 답: {quiz?.options[userAnswer?.selectedAnswer] || '답변 없음'}
                                {!item.correct && (
                                    <span style={{ color: '#38ef7d', marginLeft: '1rem' }}>
                                        정답: {quiz?.options[item.correctAnswer]}
                                    </span>
                                )}
                            </div>
                            <div className="result-item-explanation">
                                💡 {item.explanation}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn btn-secondary" onClick={onHome}>
                    🏠 홈으로
                </button>
                <button className="btn btn-primary" onClick={onRestart}>
                    🔄 다시 도전
                </button>
            </div>
        </div>
    );
}

export default Result;
