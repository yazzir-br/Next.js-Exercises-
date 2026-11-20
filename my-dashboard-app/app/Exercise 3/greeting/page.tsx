'use client';

import { useActionState } from 'react';
import { sayHello, GreetingState } from './actions';

const initialState: GreetingState = {
  success: false,
  message: '',
  error: '',
};

export default function GreetingFormPage() {
  const [state, formAction] = useActionState(sayHello, initialState);

  return (
    <form action={formAction} className="space-y-4 p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold">Exercise 3: Full Name Greeting</h1>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        className="border p-2 w-full rounded"
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        className="border p-2 w-full rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Greet
      </button>

      {state.success && (
        <p className="text-green-600 font-medium">{state.message}</p>
      )}
      {!state.success && state.error && (
        <p className="text-red-600 font-medium">{state.error}</p>
      )}
    </form>
  );
}