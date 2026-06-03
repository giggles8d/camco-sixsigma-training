import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import modules from '../data/modules.json';

const statusIcon = (p) => {
  if (p.completed) return 'â';
  if (p.lessonComplete || p.quizPassed) return 'â';
  return 'â';
};

const statusClass = (p) => {
  if (p.completed) return 'status-complete';
  if (p.lessonComplete || p.quizPassed) return 'status-progress';
  return 'status-pending';
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { getModuleProgress, getOverallProgress } = useProgress();
  const overall = getOverallProgress(modules.length);

  return (
    <div className="dashboard">
      <header className="app-header">
        <div className="header-left">
          <h1>Training Portal</h1>
          <span className="subtitle">Six Sigma Program</span>
        </div>
        <div className="header-right">
          <Link to="/glossary" className="glossary-nav-link">ð GLOSSARY</Link>
          <span className="user-info">{user.name}</span>
          <button onClick={logout} className="btn btn-sm btn-outline">Sign Out</button>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="progress-overview">
          <h2>Your Progress</h2>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${overall.percentage}%` }}></div>
          </div>
          <p className="progress-text">{overall.completed} of {overall.total} modules completed ({overall.percentage}%)</p>
        </section>

        <section className="modules-grid">
          {modules.map((mod) => {
            const p = getModuleProgress(mod.id);
            const sectionCount = mod.subsections ? mod.subsections.length : 0;
            const totalQuizQuestions = mod.subsections
              ? mod.subsections.reduce((acc, s) => acc + (s.quiz?.questions?.length || 0), 0)
              : 0;
            return (
              <Link to={`/module/${mod.id}`} key={mod.id} className={`module-card ${statusClass(p)}`}>
                <div className="module-card-header">
                  <span className={`status-badge ${statusClass(p)}`}>{statusIcon(p)}</span>
                  <span className="module-number">Module {mod.id}</span>
                </div>
                <h3 className="module-title">{mod.title}</h3>
                <div className="module-card-footer">
                  <span>{sectionCount} sections</span>
                  <span>{totalQuizQuestions} quiz questions</span>
                  {p.quizScore !== null && p.quizScore !== undefined && (
                    <span className={p.quizPassed ? 'score-pass' : 'score-fail'}>
                      Quiz: {p.quizScore}/{p.quizTotal}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </section>
      </main>
    </div>
  );
}
