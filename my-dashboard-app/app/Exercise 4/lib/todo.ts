import { ObjectId } from "mongodb";
import {
  CreateTodoInput,
  Priority,
  Todo,
  TodoFilter,
  UpdateTodoInput,
} from "../types/todo";
import { getTodoCollection } from "./db";

const priorityWeight: Record<Priority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

function normalizePriority(value: unknown): Priority {
  if (value === "low" || value === "medium" || value === "high") {
    return value;
  }
  return "medium";
}

export async function fetchTodos(options?: {
  search?: string;
  status?: TodoFilter;
}): Promise<Todo[]> {
  try {
    const collection: any = await getTodoCollection();
    const filter: Record<string, unknown> = {};

    const search = options?.search?.trim();
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (options?.status === "active") {
      filter.completed = false;
    } else if (options?.status === "completed") {
      filter.completed = true;
    }

    const todos: any[] = await collection
      .find(filter)
      .sort({ _id: -1 })
      .toArray();

    const mapped: Todo[] = todos.map((todo) => ({
      _id: String(todo._id),
      title: String(todo.title ?? ""),
      completed: Boolean(todo.completed),
      priority: normalizePriority(todo.priority),
      createdAt: todo.createdAt
        ? new Date(todo.createdAt).toISOString()
        : new Date().toISOString(),
      updatedAt: todo.updatedAt
        ? new Date(todo.updatedAt).toISOString()
        : undefined,
    }));

    return mapped.sort(
      (a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]
    );
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
}

export async function fetchTodoById(id: string): Promise<Todo | null> {
  try {
    if (!ObjectId.isValid(id)) {
      return null;
    }

    const collection: any = await getTodoCollection();
    const todo: any = await collection.findOne({ _id: new ObjectId(id) });

    if (!todo) {
      return null;
    }

    return {
      _id: String(todo._id),
      title: String(todo.title ?? ""),
      completed: Boolean(todo.completed),
      priority: normalizePriority(todo.priority),
      createdAt: todo.createdAt
        ? new Date(todo.createdAt).toISOString()
        : new Date().toISOString(),
      updatedAt: todo.updatedAt
        ? new Date(todo.updatedAt).toISOString()
        : undefined,
    };
  } catch (error) {
    console.error("Error fetching todo by id:", error);
    return null;
  }
}

export async function createTodo(input: CreateTodoInput): Promise<string | null> {
  try {
    const collection: any = await getTodoCollection();
    const now = new Date();

    const result = await collection.insertOne({
      title: input.title,
      completed: input.completed ?? false,
      priority: normalizePriority(input.priority),
      createdAt: now,
      updatedAt: now,
    });

    return String(result.insertedId);
  } catch (error) {
    console.error("Error creating todo:", error);
    return null;
  }
}

export async function updateTodo(
  id: string,
  input: UpdateTodoInput
): Promise<boolean> {
  try {
    if (!ObjectId.isValid(id)) {
      return false;
    }

    const collection: any = await getTodoCollection();
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...input,
          updatedAt: new Date(),
        },
      }
    );

    return Number(result.matchedCount) > 0;
  } catch (error) {
    console.error("Error updating todo:", error);
    return false;
  }
}

export async function deleteTodo(id: string): Promise<boolean> {
  try {
    if (!ObjectId.isValid(id)) {
      return false;
    }

    const collection: any = await getTodoCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    return Number(result.deletedCount) > 0;
  } catch (error) {
    console.error("Error deleting todo:", error);
    return false;
  }
}

export async function bulkDeleteTodos(ids: string[]): Promise<boolean> {
  try {
    const validIds = ids
      .filter((id) => ObjectId.isValid(id))
      .map((id) => new ObjectId(id));
    if (validIds.length === 0) return false;

    const collection: any = await getTodoCollection();
    const result = await collection.deleteMany({ _id: { $in: validIds } });
    return Number(result.deletedCount) > 0;
  } catch (error) {
    console.error("Error bulk deleting todos:", error);
    return false;
  }
}

export async function bulkSetCompleted(
  ids: string[],
  completed: boolean
): Promise<boolean> {
  try {
    const validIds = ids
      .filter((id) => ObjectId.isValid(id))
      .map((id) => new ObjectId(id));
    if (validIds.length === 0) return false;

    const collection: any = await getTodoCollection();
    const result = await collection.updateMany(
      { _id: { $in: validIds } },
      { $set: { completed, updatedAt: new Date() } }
    );
    return Number(result.matchedCount) > 0;
  } catch (error) {
    console.error("Error bulk updating todos:", error);
    return false;
  }
}