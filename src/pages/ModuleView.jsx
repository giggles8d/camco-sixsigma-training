import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import modules from '../data/modules.json';
import { ALL_MODULE_VISUALS } from '../components/all_visuals';

// Convert **bold**, *italic*, `code` to HTML
function renderInline(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+?)`/g, '<code>$1</code>');
}

// Render a paragraph with inline markdown â splits on \n\n for multiple paragraphs
function RichParagraphs({ text, className }) {
  const paras = (text || '').split('\n\n').filter(Boolean);
  return (
    <>
      {paras.map((para, i) => (
        <p
          key={i}
          className={className}
          dangerouslySetInnerHTML={{ __html: renderInline(para) }}
        />
      ))}
    </>
  );
}

// Render a single content block
function ContentBlock({ block }) {
  switch (block.type) {
    case 'intro':
      return (
        <div className="cb-intro">
          <p dangerouslySetInnerHTML={{ __html: renderInline(block.text) }} />
        </div>
      );
    case 'heading':
      return (
        <div className="cb-heading-wrap">
          <div className="cb-heading-dots">â â â</div>
          <h3 className="cb-heading">{block.text}</h3>
          <div className="cb-heading-rule" />
        </div>
      );
    case 'body':
      return (
        <div className="cb-body">
          <RichParagraphs text={block.text} />
        </div>
      );
    case 'callout':
      return (
        <div className="cb-callout">
          <RichParagraphs text={block.text} />
        </div>
      );
    default:
      return (
        <div className="cb-body">
          <p dangerouslySetInnerHTML={{ __html: renderInline(block.text) }} />
        </div>
      );
  }
}

export default function ModuleView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getModuleProgress, markLessonComplete, markModuleComplete } = useProgress();

  const mod = modules.find(m => m.id === parseInt(id));
  const [activeSection, setActiveSection] = useState(0);

  if (!mod) return (
    <div className="error-page">
      <h2>Module not found</h2>
      <Link to="/">Back to Dashboard</Link>
    </div>
  );

  const p = getModuleProgress(mod.id);
  const Visual = ALL_MODULE_VISUALS[mod.id];
  const sections = mod.subsections;
  const isLastSection = activeSection === sections.length - 1;
  const totalSections = sections.length;
  const totalQuizQuestions = sections.reduce((acc, s) => acc + (s.quiz?.questions?.length || 0), 0);

  const handleFinishLesson = () => markLessonComplete(mod.id);
  const handleMarkComplete = () => markModuleComplete(mod.id);

  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  const currentSection = sections[activeSection];

  return (
    <div className="mv-shell">

      {/* ââ HEADER ââ */}
      <header className="mv-header">
        <div className="mv-header-left">
          <a href="https://camcotraining.com" className="mv-back mv-back--hub">â TRAINING HUB</a>
          <div className="mv-header-divider" />
          <Link to="/" className="mv-back">â DASHBOARD</Link>
          <div className="mv-header-divider" />
          <span className="mv-header-module">MODULE {String(mod.id).padStart(2, '0')}</span>
        </div>
        <div className="mv-header-right">
          <span className="mv-header-name">{user.name.toUpperCase()}</span>
          <div className="mv-avatar" onClick={logout} title="Sign Out">{initials}</div>
        </div>
      </header>

      <div className="mv-accent-rule" />

      <div className="mv-body">

        {/* ââ SIDEBAR ââ */}
        <nav className="mv-sidebar">
          <div className="mv-sidebar-top">
            <div className="mv-sidebar-label">MODULE {String(mod.id).padStart(2, '0')}</div>
            <div className="mv-sidebar-title">{mod.title.toUpperCase()}</div>
            <div className="mv-sidebar-progress-bar">
              <div
                className="mv-sidebar-progress-fill"
                style={{ width: p.lessonComplete ? '100%' : `${(activeSection / totalSections) * 100}%` }}
              />
            </div>
            <div className="mv-sidebar-progress-text">
              {p.lessonComplete ? 'LESSON COMPLETE' : `SUBSECTION ${activeSection + 1} OF ${totalSections}`}
            </div>
          </div>

          <div className="mv-sidebar-sections">
            {sections.map((sec, i) => (
              <button
                key={i}
                onClick={() => setActiveSection(i)}
                className={`mv-section-btn ${i === activeSection ? 'mv-section-btn--active' : ''} ${i < activeSection || p.lessonComplete ? 'mv-section-btn--done' : ''}`}
              >
                <span className="mv-section-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="mv-section-name">{sec.title.toUpperCase()}</span>
                {(i < activeSection || p.lessonComplete) && <span className="mv-section-check">â</span>}
              </button>
            ))}
          </div>

          <div className="mv-sidebar-footer">
            {p.lessonComplete && <div className="mv-status-tag mv-status-tag--ok">â LESSON COMPLETE</div>}
            {p.quizPassed && <div className="mv-status-tag mv-status-tag--ok">â QUIZ PASSED</div>}
            {p.completed && <div className="mv-status-tag mv-status-tag--ok">â MODULE COMPLETE</div>}
            {p.quizScore !== null && p.quizScore !== undefined && !p.quizPassed && (
              <div className="mv-status-tag mv-status-tag--warn">
                QUIZ: {p.quizScore}/{p.quizTotal}
              </div>
            )}
            <Link to={`/module/${mod.id}/quiz`} className="mv-quiz-link">
              â¶ TAKE QUIZ â {totalQuizQuestions} QUESTIONS
            </Link>
          </div>
        </nav>

        {/* ââ MAIN CONTENT ââ */}
        <main className="mv-main">

          {/* Section header bar */}
          <div className="mv-section-header">
            <div className="mv-section-number-box">
              <span>{String(activeSection + 1).padStart(2, '0')}</span>
            </div>
            <div className="mv-section-header-text">
              <div className="mv-section-header-label">
                SUBSECTION {activeSection + 1} OF {totalSections}
                {currentSection?.estimatedReadingMinutes && (
                  <span style={{ marginLeft: 12, color: 'var(--text-light)', fontWeight: 400 }}>
                    Â· ~{currentSection.estimatedReadingMinutes} MIN READ
                  </span>
                )}
              </div>
              <div className="mv-section-header-title">
                {currentSection?.title}
              </div>
            </div>
            <div className="mv-section-header-actions">
              <div className="mv-tab mv-tab--active">READING</div>
              <button
                className="mv-tab mv-tab--inactive"
                onClick={() => navigate(`/module/${mod.id}/quiz`)}
              >
                QUIZ ({currentSection?.quiz?.questions?.length || 0} QS)
              </button>
            </div>
          </div>

          {/* Lesson content area */}
          <div className="mv-content-area">
            <div className="mv-lesson-body mv-lesson-body--blocks">
              {currentSection?.content?.map((block, i) => (
                <ContentBlock key={i} block={block} />
              ))}
            </div>

            {/* Interactive visual â last section only */}
            {Visual && isLastSection && (
              <div className="mv-visual-wrapper">
                <div className="mv-visual-label">
                  <span className="mv-visual-label-bar" />
                  INTERACTIVE TRAINING VISUAL
                  <span className="mv-visual-label-bar" />
                </div>
                <Visual />
              </div>
            )}

            {/* Complete module CTA */}
            {p.lessonComplete && p.quizPassed && !p.completed && (
              <div className="mv-complete-cta">
                <div className="mv-complete-cta-text">All requirements met â mark this module complete.</div>
                <button className="mv-btn mv-btn--success" onClick={handleMarkComplete}>
                  MARK MODULE COMPLETE
                </button>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mv-nav-row">
              {activeSection > 0 && (
                <button className="mv-btn mv-btn--outline" onClick={() => setActiveSection(activeSection - 1)}>
                  â PREVIOUS
                </button>
              )}
              <div style={{ flex: 1 }} />
              {!isLastSection && (
                <button className="mv-btn mv-btn--primary" onClick={() => setActiveSection(activeSection + 1)}>
                  NEXT SECTION â
                </button>
              )}
              {isLastSection && !p.lessonComplete && (
                <button className="mv-btn mv-btn--success" onClick={handleFinishLesson}>
                  MARK LESSON COMPLETE â
                </button>
              )}
              {isLastSection && p.lessonComplete && (
                <button className="mv-btn mv-btn--primary" onClick={() => navigate(`/module/${mod.id}/quiz`)}>
                  TAKE QUIZ â
                </button>
              )}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
