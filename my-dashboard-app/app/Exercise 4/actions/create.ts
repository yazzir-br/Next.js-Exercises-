"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTodo } from "../lib/todo";
import { ActionState, Priority } from "../types/todo";

export async function createTodoAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const title = formData.get("title") as string | null;
  const rawPriority = formData.get("priority") as string | null;

  if (!title || title.trim().length === 0) {
    return { error: "Title is required" };
  }

  if (title.trim().length > 200) {
    return { error: "Title must be less than 200 characters" };
  }

  const priority: Priority =
    rawPriority === "low" || rawPriority === "medium" || rawPriority === "high"
      ? rawPriority
      : "medium";

  const todoId = await createTodo({ title: title.trim(), priority });

  if (!todoId) {
    return { error: "Failed to create todo" };
  }

  revalidatePath("/Exercise 4");
  redirect("/Exercise 4");
}