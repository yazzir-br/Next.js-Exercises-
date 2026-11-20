'use client';

import { useActionState } from 'react';
import { validatePassword, PasswordFormState } from './actions';

const initialState: PasswordFormState = {
  success: false,
  message: '',
  error: '',
};

export default function PasswordFormPage() {
  const [state, formAction] = useActionState(validatePassword, initialState)

  return (
    <form action={formAction} className="space-y-4 p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold">Exercise 2: Password Check</h1>
      <input
        type="password"
        name="password"
        placeholder="Enter password (min 6 chars)"
        className="border p-2 w-full rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Check Password
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