export const dynamic = "force-dynamic";

export default function TimePage() {
  const currentTime = new Date().toLocaleTimeString();

  return (
    <main className="p-6 space-y-2">
      <h1 className="text-2xl font-bold">SSR Time Simulation</h1>
      <p className="text-lg">Current server time: {currentTime}</p>
      <p className="text-sm text-gray-500">
        Refresh gareey page-ka si aad u aragto waqtiga cusub.
      </p>
    </main>
  );
}