import Counter from "../components/Counter";

export default function CounterDemoPage() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Server Page with Client Counter</h1>
      <p>Guji badhanka hoose si aad u kordhiso tirada:</p>
      <Counter />
    </main>
  );
}