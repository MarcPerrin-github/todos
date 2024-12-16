import { useState } from "react";
import { Todo, Status, TodoType } from "@prisma/client";

interface TodoItemProps {
  todo: Todo;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
}

export default function TodoItem({
  todo,
  updateTodo,
  deleteTodo,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTodo(todo.id, editedTodo);
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditedTodo({ ...editedTodo, [e.target.name]: e.target.value });
  };

  return (
    <div className="border p-4 mb-4 rounded">
      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            value={editedTodo.title}
            onChange={handleChange}
            className="mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="description"
            value={editedTodo.description || ""}
            onChange={handleChange}
            className="mb-2 p-2 border rounded"
          />
          <select
            name="status"
            value={editedTodo.status}
            onChange={handleChange}
            className="mb-2 p-2 border rounded"
          >
            {Object.values(Status).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <select
            name="type"
            value={editedTodo.type}
            onChange={handleChange}
            className="mb-2 p-2 border rounded"
          >
            {Object.values(TodoType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h3 className="text-xl font-bold">{todo.title}</h3>
          <p>{todo.description}</p>
          <p>Status: {todo.status}</p>
          <p>Type: {todo.type}</p>
          <button
            onClick={handleEdit}
            className="bg-yellow-500 text-white p-2 rounded mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="bg-red-500 text-white p-2 rounded"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}
