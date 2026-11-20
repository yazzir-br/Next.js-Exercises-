import { Suspense } from "react";
import { SlowComponent } from "./slow-component";

export const dynamic = "force-dynamic";

export default function StreamingPage() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Streaming with Suspense</h1>
      <p>Cinwaanka sare isla markiiba wuu soo baxayaa.</p>

      <Suspense fallback={<p className="text-amber-600">Loading...</p>}>
        <SlowComponent />
      </Suspense>
    </main>
  );
}