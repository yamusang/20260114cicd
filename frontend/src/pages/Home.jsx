function Home({ onStart, error }) {
    return (
        <div className="home animate-fadeIn">
            <div className="home-icon">🤖</div>
            <h1>AI 퀴즈 챌린지</h1>
            <p className="home-description">
                인공지능에 대한 지식을 테스트해보세요!
                머신러닝, 딥러닝, 자연어처리 등 다양한 AI 주제를 다룹니다.
            </p>

            <div className="home-features">
                <div className="feature-item">
                    <div className="feature-item-icon">📝</div>
                    <div className="feature-item-text">10문제</div>
                </div>
                <div className="feature-item">
                    <div className="feature-item-icon">⏱️</div>
                    <div className="feature-item-text">무제한 시간</div>
                </div>
                <div className="feature-item">
                    <div className="feature-item-icon">🎯</div>
                    <div className="feature-item-text">즉시 결과</div>
                </div>
            </div>

            {error && (
                <div style={{
                    color: '#f45c43',
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    background: 'rgba(244, 92, 67, 0.1)',
                    borderRadius: '8px',
                    maxWidth: '500px'
                }}>
                    {error}
                </div>
            )}

            <button className="btn btn-primary btn-lg" onClick={onStart}>
                퀴즈 시작하기 🚀
            </button>
        </div>
    );
}

export default Home;
