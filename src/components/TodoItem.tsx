import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import type { Todo } from '../types'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [isEditing])

  function startEditing() {
    setDraft(todo.text)
    setIsEditing(true)
  }

  function commitEdit() {
    onEdit(todo.id, draft)
    setIsEditing(false)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') commitEdit()
    if (e.key === 'Escape') {
      setDraft(todo.text)
      setIsEditing(false)
    }
  }

  return (
    <li className={`todo-item${todo.completed ? ' completed' : ''}`}>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          className="todo-edit-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <>
          <label className="todo-checkbox-label">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              aria-label={`${todo.text} を完了にする`}
            />
            <span className="todo-checkmark" aria-hidden="true" />
          </label>
          <span className="todo-text" onDoubleClick={startEditing}>
            {todo.text}
          </span>
          <button
            type="button"
            className="todo-delete-btn"
            onClick={() => onDelete(todo.id)}
            aria-label={`${todo.text} を削除`}
          >
            ×
          </button>
        </>
      )}
    </li>
  )
}
