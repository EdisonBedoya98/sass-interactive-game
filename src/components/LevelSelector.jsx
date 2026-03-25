export default function LevelSelector({ challenges, categories, currentLevel, completedLevels, onSelect }) {
  return (
    <div className="level-selector">
      {categories.map((cat) => {
        const catChallenges = challenges.filter((c) => c.category === cat);
        const allDone = catChallenges.every((c) => completedLevels.includes(c.id));

        return (
          <div key={cat} className="level-selector__group">
            <h3 className="level-selector__category">
              {allDone && <span className="level-selector__check">✓</span>}
              {cat}
            </h3>
            {catChallenges.map((ch) => {
              const index = challenges.indexOf(ch);
              const isActive = index === currentLevel;
              const isDone = completedLevels.includes(ch.id);

              return (
                <button
                  key={ch.id}
                  className={`level-selector__item ${isActive ? 'level-selector__item--active' : ''} ${isDone ? 'level-selector__item--done' : ''}`}
                  onClick={() => onSelect(index)}
                >
                  <span className="level-selector__num">{ch.id}</span>
                  <span className="level-selector__name">{ch.title}</span>
                  {isDone && <span className="level-selector__done-icon">✓</span>}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
