"use server";

import { revalidatePath } from "next/cache";
import { bulkDeleteTodos, bulkSetCompleted } from "../lib/todo";

export async function bulkAction(formData: FormData) {
  const selectedIds = formData.getAll("selectedIds") as string[];
  const intent = formData.get("intent") as string | null;

  if (!selectedIds || selectedIds.length === 0) {
    return;
  }

  if (intent === "delete") {
    await bulkDeleteTodos(selectedIds);
  } else if (intent === "complete") {
    await bulkSetCompleted(selectedIds, true);
  } else if (intent === "incomplete") {
    await bulkSetCompleted(selectedIds, false);
  }

  revalidatePath("/Exercise 4");
}