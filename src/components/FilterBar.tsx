import type { Filter } from '../types'

interface FilterBarProps {
  filter: Filter
  onFilterChange: (filter: Filter) => void
  activeCount: number
  completedCount: number
  onClearCompleted: () => void
}

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'すべて' },
  { key: 'active', label: '未完了' },
  { key: 'completed', label: '完了' },
]

export function FilterBar({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <span className="todo-count">残り {activeCount} 件</span>
      <div className="filter-group" role="group" aria-label="表示フィルタ">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            className={`filter-btn${filter === key ? ' active' : ''}`}
            onClick={() => onFilterChange(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="clear-completed-btn"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
      >
        完了を削除
      </button>
    </div>
  )
}
