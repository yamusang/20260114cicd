const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://20260114cicd.ttobiyam.workers.dev:8787';

export const api = {
    // 모든 퀴즈 가져오기
    async getQuizzes() {
        const response = await fetch(`${API_BASE_URL}/api/quizzes`);
        if (!response.ok) {
            throw new Error('Failed to fetch quizzes');
        }
        return response.json();
    },

    // 퀴즈 답안 제출
    async submitAnswers(answers) {
        const response = await fetch(`${API_BASE_URL}/api/quizzes/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answers }),
        });
        if (!response.ok) {
            throw new Error('Failed to submit answers');
        }
        return response.json();
    },
};
