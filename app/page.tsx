import { getServerSession } from "next-auth/next";
import TodoList from "./../components/TodoList";
import SignInButton from "./../components/SignInButton";

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-4">Welcome to Todo App</h1>
        <SignInButton />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Your Todos</h1>
      <TodoList />
    </div>
  );
}
