import { useMemo, useState } from 'react'
import './App.css'
import { FilterBar } from './components/FilterBar'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import { useTodos } from './hooks/useTodos'
import type { Filter } from './types'

function App() {
  const { todos, addTodo, toggleTodo, editTodo, deleteTodo, clearCompleted } =
    useTodos()
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
    </div>
  )
}

export default App
