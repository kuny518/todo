import { useEffect } from 'react'

interface ToastProps {
  message: string
  actionLabel: string
  onAction: () => void
  onDismiss: () => void
  duration?: number
}

export function Toast({
  message,
  actionLabel,
  onAction,
  onDismiss,
  duration = 5000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration)
    return () => clearTimeout(timer)
  }, [onDismiss, duration])

  return (
    <div className="toast" role="status">
      <span className="toast-message">{message}</span>
      <button type="button" className="toast-action" onClick={onAction}>
        {actionLabel}
      </button>
      <button
        type="button"
        className="toast-close"
        onClick={onDismiss}
        aria-label="閉じる"
      >
        ×
      </button>
    </div>
  )
}
