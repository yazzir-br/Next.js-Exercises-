"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button
      type="button"
      onClick={() => setCount((prev) => prev + 1)}
      className="px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 cursor-pointer"
    >
      Count: {count}
    </button>
  );
}