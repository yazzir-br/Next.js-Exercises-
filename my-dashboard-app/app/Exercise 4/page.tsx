import Link from "next/link";
import { fetchTodos } from "./lib/todo";
import { toggleTodo } from "./actions/toggle";
import { deleteTodo } from "./actions/delete";
import { bulkAction } from "./actions/bulk";
import { Priority, TodoFilter } from "./types/todo";

interface HomePageProps {
  searchParams: Promise<{
    q?: string;
    status?: string;
  }>;
}

const priorityStyles: Record<Priority, { label: string; classes: string }> = {
  high: {
    label: "🔴 High",
    classes: "bg-red-100 text-red-700 border-red-200",
  },
  medium: {
    label: "🟡 Medium",
    classes: "bg-amber-100 text-amber-800 border-amber-200",
  },
  low: {
    label: "🟢 Low",
    classes: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
};

export default async function Exercise4Home({ searchParams }: HomePageProps) {
  const { q = "", status = "all" } = await searchParams;
  const validStatus: TodoFilter =
    status === "active" || status === "completed" ? status : "all";

  const todos = await fetchTodos({ search: q, status: validStatus });

  return (
    <main className="max-w-4xl mx-auto mt-10 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              📝 Todo App (Exercise 4)
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Priority sorting, search/filter, and bulk actions
            </p>
          </div>

          <Link
            href="/Exercise 4/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            ➕ Add New Todo
          </Link>
        </div>

        {/* Search & Filter Form */}
        <form
          method="GET"
          action="/Exercise 4"
          className="flex flex-wrap gap-3 mb-6 bg-gray-50 p-3 rounded-lg border border-gray-200"
        >
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search todos..."
            className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="status"
            defaultValue={validStatus}
            className="px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="active">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <button
            type="submit"
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors cursor-pointer"
          >
            Filter
          </button>

          {(q || validStatus !== "all") && (
            <Link
              href="/Exercise 4"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
            >
              Reset
            </Link>
          )}
        </form>

        {todos.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No matching todos found.</p>
            <p className="text-gray-400 text-sm mt-2">
              Create a new todo or clear your search/filter.
            </p>
          </div>
        ) : (
          <form action={bulkAction} className="space-y-4">
            {/* Bulk Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <span className="text-sm text-blue-900 font-medium">
                Bulk Actions (select checkboxes below):
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  name="intent"
                  value="complete"
                  className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  Mark Completed
                </button>
                <button
                  type="submit"
                  name="intent"
                  value="incomplete"
                  className="px-3 py-1.5 text-sm bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors cursor-pointer"
                >
                  Mark Pending
                </button>
                <button
                  type="submit"
                  name="intent"
                  value="delete"
                  className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Delete Selected
                </button>
              </div>
            </div>

            {/* Todo Items */}
            <div className="space-y-3">
              {todos.map((todo) => {
                const badge = priorityStyles[todo.priority];
                return (
                  <div
                    key={todo._id}
                    className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <input
                        type="checkbox"
                        name="selectedIds"
                        value={todo._id}
                        aria-label={`Select ${todo.title}`}
                        className="w-4 h-4 accent-blue-600 cursor-pointer"
                      />

                      <button
                        type="submit"
                        formAction={toggleTodo.bind(null, todo._id)}
                        className="text-2xl hover:scale-110 transition-transform cursor-pointer"
                        title={
                          todo.completed
                            ? "Mark as incomplete"
                            : "Mark as complete"
                        }
                      >
                        {todo.completed ? "✅" : "⬜"}
                      </button>

                      <span
                        className={`text-lg ${
                          todo.completed
                            ? "line-through text-gray-500"
                            : "text-gray-800"
                        }`}
                      >
                        {todo.title}
                      </span>

                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${badge.classes}`}
                      >
                        {badge.label}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/Exercise 4/edit/${todo._id}`}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                        title="Edit todo"
                      >
                        ✏️
                      </Link>

                      <button
                        type="submit"
                        formAction={deleteTodo.bind(null, todo._id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors cursor-pointer"
                        title="Delete todo"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </form>
        )}
      </div>
    </main>
  );
}