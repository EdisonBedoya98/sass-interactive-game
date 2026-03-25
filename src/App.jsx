import { useState, useCallback, useEffect } from 'react';
import challenges, { categories } from './data/challenges';
import { compileSass, compareCss } from './utils/sassCompiler';
import CodeEditor from './components/CodeEditor';
import VisualPreview from './components/VisualPreview';
import LevelSelector from './components/LevelSelector';
import './App.scss';

function App() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [code, setCode] = useState(challenges[0].initialCode);
  const [compiledCss, setCompiledCss] = useState('');
  const [compileError, setCompileError] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [blockedMessage, setBlockedMessage] = useState(null);
  const [completedLevels, setCompletedLevels] = useState(() => {
    const saved = localStorage.getItem('sass-game-completed');
    return saved ? JSON.parse(saved) : [];
  });

  const challenge = challenges[currentLevel];

  const handleCompile = useCallback(() => {
    const { css, error } = compileSass(code);
    if (error) {
      setCompileError(error);
      setCompiledCss('');
      setIsCorrect(false);
    } else {
      setCompileError(null);
      setCompiledCss(css);
      const correct = compareCss(css, challenge.expectedCss);
      setIsCorrect(correct);
      if (correct && !completedLevels.includes(challenge.id)) {
        const updated = [...completedLevels, challenge.id];
        setCompletedLevels(updated);
        localStorage.setItem('sass-game-completed', JSON.stringify(updated));
      }
    }
  }, [code, challenge, completedLevels]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCompile();
    }, 500);
    return () => clearTimeout(timer);
  }, [code, handleCompile]);

  const canLeaveCurrent = () => {
    return completedLevels.includes(challenge.id);
  };

  const handleLevelChange = (index, force = false) => {
    if (!force && index > currentLevel && !canLeaveCurrent()) {
      setBlockedMessage('Complete the current challenge before moving forward! Your CSS output must match the expected CSS.');
      setTimeout(() => setBlockedMessage(null), 4000);
      return;
    }
    setCurrentLevel(index);
    setCode(challenges[index].initialCode);
    setCompiledCss('');
    setCompileError(null);
    setIsCorrect(false);
    setShowHint(false);
    setSidebarOpen(false);
    setBlockedMessage(null);
  };

  const handleNext = () => {
    if (currentLevel < challenges.length - 1) {
      handleLevelChange(currentLevel + 1);
    }
  };

  const handlePrev = () => {
    if (currentLevel > 0) {
      handleLevelChange(currentLevel - 1, true);
    }
  };

  const handleReset = () => {
    setCode(challenge.initialCode);
    setShowHint(false);
  };

  const progress = Math.round((completedLevels.length / challenges.length) * 100);

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-left">
          <button className="app__menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? '✕' : '☰'}
          </button>
          <h1 className="app__title">SASS Learning Game</h1>
          <span className="app__badge">{categories.length} Categories</span>
          <span className="app__badge">{challenges.length} Challenges</span>
        </div>
        <div className="app__header-right">
          <div className="app__progress">
            <div className="app__progress-bar" style={{ width: `${progress}%` }} />
            <span className="app__progress-text">{progress}% Complete</span>
          </div>
        </div>
      </header>

      <div className="app__body">
        {sidebarOpen && <div className="app__overlay" onClick={() => setSidebarOpen(false)} />}
        <aside className={`app__sidebar ${sidebarOpen ? 'app__sidebar--open' : ''}`}>
          <LevelSelector
            challenges={challenges}
            categories={categories}
            currentLevel={currentLevel}
            completedLevels={completedLevels}
            onSelect={handleLevelChange}
          />
        </aside>

        <main className="app__main">
          <div className="challenge-header">
            <div className="challenge-header__top">
              <span className="challenge-header__category">{challenge.category}</span>
              <span className="challenge-header__number">
                Level {challenge.id} of {challenges.length}
              </span>
            </div>
            <h2 className="challenge-header__title">{challenge.title}</h2>
            <p className="challenge-header__desc">{challenge.description}</p>
            <div className="challenge-header__actions">
              <button className="btn btn--ghost" onClick={() => setShowHint(!showHint)}>
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
              <button className="btn btn--ghost" onClick={handleReset}>
                Reset
              </button>
              <div className="challenge-header__nav">
                <button className="btn btn--ghost" onClick={handlePrev} disabled={currentLevel === 0}>
                  Prev
                </button>
                <button
                  className="btn btn--primary"
                  onClick={handleNext}
                  disabled={currentLevel === challenges.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
            {showHint && <div className="challenge-header__hint">{challenge.hint}</div>}
          </div>

          {blockedMessage && (
            <div className="blocked-banner">
              <span className="blocked-banner__icon">!</span>
              <span>{blockedMessage}</span>
            </div>
          )}

          <div className="challenge-grid">
            <div className="challenge-grid__editor">
              <div className="panel">
                <div className="panel__header">
                  <span className="panel__dot panel__dot--red" />
                  <span className="panel__dot panel__dot--yellow" />
                  <span className="panel__dot panel__dot--green" />
                  <span className="panel__title">SCSS Editor</span>
                </div>
                <CodeEditor value={code} onChange={setCode} language="scss" />
              </div>
            </div>

            <div className="challenge-grid__preview">
              <div className="panel">
                <div className="panel__header">
                  <span className="panel__dot panel__dot--red" />
                  <span className="panel__dot panel__dot--yellow" />
                  <span className="panel__dot panel__dot--green" />
                  <span className="panel__title">Visual Preview</span>
                </div>
                <VisualPreview html={challenge.htmlPreview} css={compiledCss} />
              </div>
            </div>

            <div className="challenge-grid__output">
              <div className="panel">
                <div className="panel__header">
                  <span className="panel__dot panel__dot--red" />
                  <span className="panel__dot panel__dot--yellow" />
                  <span className="panel__dot panel__dot--green" />
                  <span className="panel__title">Compiled CSS</span>
                  {isCorrect && <span className="panel__badge panel__badge--success">Correct!</span>}
                  {compileError && <span className="panel__badge panel__badge--error">Error</span>}
                </div>
                <div className="panel__body panel__body--code">
                  {compileError ? (
                    <pre className="error-output">{compileError}</pre>
                  ) : (
                    <pre className="css-output">{compiledCss || '// Your compiled CSS will appear here'}</pre>
                  )}
                </div>
              </div>
            </div>

            <div className="challenge-grid__expected">
              <div className="panel">
                <div className="panel__header">
                  <span className="panel__dot panel__dot--red" />
                  <span className="panel__dot panel__dot--yellow" />
                  <span className="panel__dot panel__dot--green" />
                  <span className="panel__title">Expected CSS</span>
                </div>
                <div className="panel__body panel__body--code">
                  <pre className="css-output">{challenge.expectedCss}</pre>
                </div>
              </div>
            </div>
          </div>

          {isCorrect && (
            <div className="success-banner">
              <span>Challenge completed!</span>
              {currentLevel < challenges.length - 1 && (
                <button className="btn btn--primary" onClick={handleNext}>
                  Next Challenge &rarr;
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
