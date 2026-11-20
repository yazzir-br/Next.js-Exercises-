'use client';

import { useActionState } from 'react';
import { submitEmail, BasicFormState } from './actions'

const initialState: BasicFormState = {
  success: false,
  message: '',
  error: '',
};

export default function BasicFormPage() {
  const [state, formAction] = useActionState(submitEmail, initialState)

  return (
    <form action={formAction} className="space-y-4 p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold">Exercise 1: Email Form</h1>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        className="border p-2 w-full rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
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