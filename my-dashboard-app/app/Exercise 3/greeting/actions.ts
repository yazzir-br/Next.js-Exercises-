'use server';

export type GreetingState = {
  success: boolean;
  message: string;
  error: string;
};

export async function sayHello(
  prevState: GreetingState,
  formData: FormData
): Promise<GreetingState> {
  const firstName = formData.get('firstName')?.toString().trim() || ''
  const lastName = formData.get('lastName')?.toString().trim() || ''

  if (!firstName || !lastName) {
    return {
      success: false,
      message: '',
      error: 'Both first name and last name are required.',
    };
  }

  return {
    success: true,
    message: `Hello, ${firstName} ${lastName}!`,
    error: '',
  };
}