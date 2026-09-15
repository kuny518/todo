import { useEffect, useState } from 'react'
import type { Todo } from '../types'

const STORAGE_KEY = 'todo-app:todos'

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function addTodo(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
        createdAt: Date.now(),
      },
    ])
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  function editTodo(id: string, text: string) {
    const trimmed = text.trim()
    setTodos((prev) => {
      if (!trimmed) return prev.filter((todo) => todo.id !== id)
      return prev.map((todo) =>
        todo.id === id ? { ...todo, text: trimmed } : todo,
      )
    })
  }

  function deleteTodo(id: string) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((todo) => !todo.completed))
  }

  function toggleAll(completed: boolean) {
    setTodos((prev) => prev.map((todo) => ({ ...todo, completed })))
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    clearCompleted,
    toggleAll,
  }
}
