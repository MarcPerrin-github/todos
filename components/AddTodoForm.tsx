import { useState } from 'react'
import { TodoType } from '@prisma/client'

interface AddTodoFormProps {
  addTodo: (todo: { title: string; description: string; type: TodoType }) => void
}

export default function AddTodoForm({ addTodo }: AddTodoFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState<TodoType>(TodoType.WORK)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addTodo({ title, description, type })
    setTitle('')
    setDescription('')
    setType(TodoType.WORK)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Todo title"
        required
        className="mb-2 p-2 border rounded"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Todo description"
        className="mb-2 p-2 border rounded"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value as TodoType)}
        className="mb-2 p-2 border rounded"
      >
        {Object.values(TodoType).map(todoType => (
          <option key={todoType} value={todoType}>{todoType}</option>
        ))}
      </select>
      <button type="submit" className="bg-green-500 text-white p-2 rounded">Add Todo</button>
    </form>
  )
}

