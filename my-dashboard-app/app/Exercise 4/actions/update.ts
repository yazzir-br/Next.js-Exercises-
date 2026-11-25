"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fetchTodoById, updateTodo } from "../lib/todo";
import { Priority } from "../types/todo";

export async function updateTodoAction(formData: FormData) {
  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string | null;
  const rawPriority = formData.get("priority") as string | null;

  if (!id) {
    console.error("Todo ID is required");
    return;
  }

  if (!title || title.trim().length === 0) {
    console.error("Title is required");
    return;
  }

  if (title.trim().length > 200) {
    console.error("Title must be less than 200 characters");
    return;
  }

  const existingTodo = await fetchTodoById(id);
  if (!existingTodo) {
    console.error("Todo not found");
    return;
  }

  const priority: Priority =
    rawPriority === "low" || rawPriority === "medium" || rawPriority === "high"
      ? rawPriority
      : existingTodo.priority;

  const success = await updateTodo(id, { title: title.trim(), priority });

  if (!success) {
    console.error("Failed to update todo");
    return;
  }

  revalidatePath("/Exercise 4");
  redirect("/Exercise 4");
}