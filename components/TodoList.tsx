"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";

export default function TodoList() {
  const { data: session } = useSession();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (session) {
      fetchTodos();
    }
  }, [session]);

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async (todo) => {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
  };

  const updateTodo = async (id, updatedTodo) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
    const updatedTodoData = await res.json();
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodoData : todo)));
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <AddTodoForm addTodo={addTodo} />
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}
