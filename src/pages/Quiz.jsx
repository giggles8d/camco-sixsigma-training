import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import modules from '../data/modules.json';

export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { saveQuizScore, getModuleProgress } = useProgress();

  const mod = modules.find(m => m.id === parseInt(id));
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);

  if (!mod) return <div className="error-page"><h2>Module not found</h2><Link to="/">Back to Dashboard</Link></div>;

  const p = getModuleProgress(mod.id);
  const quiz = mod.quiz || [];
  const total = quiz.length;

  const handleSelect = (qNum, letter) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qNum]: letter }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let correct = 0;
    const details = {};

    for (const q of quiz) {
      const userAnswer = answers[q.number];
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) correct++;
      details[q.number] = { userAnswer, correctAnswer: q.correctAnswer, isCorrect };
    }

    const passed = Math.round((correct / total) * 100) >= mod.quizPassingScore;
    setResults({ correct, total, passed, details });
    setSubmitted(true);
    saveQuizScore(mod.id, correct, total, passed);
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setResults(null);
  };

  return (
    <div className="quiz-page">
      <header className="app-header">
        <div className="header-left">
          <Link to={`/module/${mod.id}`} className="back-link">â Back to Lesson</Link>
          <h1>Module {mod.id} Quiz</h1>
        </div>
        <div className="header-right">
          <span className="user-info">{user.name}</span>
          <button onClick={logout} className="btn btn-sm btn-outline">Sign Out</button>
        </div>
      </header>

      <main className="quiz-content">
        <h2>{mod.title} â Quiz</h2>
        <p className="quiz-info">
          {total} questions | Passing score: {mod.quizPassingScore}%
        </p>

        {submitted && results && (
          <div className={`quiz-result ${results.passed ? 'result-pass' : 'result-fail'}`}>
            <h3>{results.passed ? 'Congratulations! You passed!' : 'Not quite â keep studying!'}</h3>
            <p>Score: {results.correct} / {results.total} ({Math.round((results.correct / results.total) * 100)}%)</p>
            <div className="result-actions">
              {!results.passed && (
                <button className="btn btn-primary" onClick={handleRetry}>Retry Quiz</button>
              )}
              <Link to={`/module/${mod.id}`} className="btn btn-outline">Back to Lesson</Link>
              <Link to="/" className="btn btn-outline">Dashboard</Link>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {quiz.map((q, idx) => {
            const detail = results?.details[q.number];
            return (
              <div key={q.number} className={`quiz-question ${detail ? (detail.isCorrect ? 'q-correct' : 'q-incorrect') : ''}`}>
                <p className="question-text">
                  <strong>{idx + 1}.</strong> {q.question}
                  {q.type === 'tf' && <span className="q-type-badge">True/False</span>}
                </p>
                <div className="options">
                  {q.options.map(opt => {
                    const isSelected = answers[q.number] === opt.letter;
                    const isCorrectAnswer = submitted && opt.letter === q.correctAnswer;
                    const isWrong = submitted && isSelected && !detail?.isCorrect;
                    return (
                      <label
                        key={opt.letter}
                        className={`option ${isSelected ? 'selected' : ''} ${isCorrectAnswer ? 'correct-answer' : ''} ${isWrong ? 'wrong-answer' : ''}`}
                      >
                        <input
                          type="radio"
                          name={`q-${q.number}`}
                          value={opt.letter}
                          checked={isSelected}
                          onChange={() => handleSelect(q.number, opt.letter)}
                                   disabled={submitted}
                        />
                        <span className="option-letter">{opt.letter}</span>
                        <span className="option-text">{opt.text}</span>
                      </label>
                    );
                  })}
                </div>
                {submitted && detail && (
                  <div className={`answer-feedback ${detail.isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
                    {detail.isCorrect ? 'â Correct' : `â Correct answer: ${q.correctAnswer}`}
                  </div>
                )}
              </div>
            );
          })}

          {!submitted && (
            <div className="quiz-submit-area">
              <p className="answered-count">
                {Object.keys(answers).length} of {total} answered
              </p>
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={Object.keys(answers).length < total}
              >
                Submit Quiz
              </button>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
