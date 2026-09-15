import { useState } from 'react'
import type { FormEvent } from 'react'

interface TodoFormProps {
  onAdd: (text: string) => void
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text)
    setText('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="何をしますか？"
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="新しいタスク"
        autoFocus
      />
      <button type="submit" className="todo-add-btn" disabled={!text.trim()}>
        追加
      </button>
    </form>
  )
}
