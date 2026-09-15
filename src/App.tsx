import { useMemo, useState } from 'react'
import './App.css'
import { FilterBar } from './components/FilterBar'
import { Toast } from './components/Toast'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import { useTodos } from './hooks/useTodos'
import type { Filter } from './types'

function App() {
  const {
    todos,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    clearCompleted,
    lastDeleted,
    undoDelete,
    dismissUndo,
  } = useTodos()
  const [filter, setFilter] = useState<Filter>('all')

  const activeCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos],
  )
  const completedCount = todos.length - activeCount

  const visibleTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((todo) => !todo.completed)
    if (filter === 'completed') return todos.filter((todo) => todo.completed)
    return todos
  }, [todos, filter])

  return (
    <div className="app">
      <h1>TODO</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList
        todos={visibleTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
      {todos.length > 0 && (
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          activeCount={activeCount}
          completedCount={completedCount}
          onClearCompleted={clearCompleted}
        />
      )}
      {lastDeleted && (
        <Toast
          key={lastDeleted.token}
          message={`"${lastDeleted.todo.text}" を削除しました`}
          actionLabel="元に戻す"
          onAction={undoDelete}
          onDismiss={dismissUndo}
        />
      )}
    </div>
  )
}

export default App
