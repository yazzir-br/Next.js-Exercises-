'use server';

export type PasswordFormState = {
  success: boolean;
  message: string;
  error: string;
};

export async function validatePassword(
  prevState: PasswordFormState,
  formData: FormData
): Promise<PasswordFormState> {
  const password = formData.get('password')?.toString() || ''

  if (password.length < 6) {
    return {
      success: false,
      message: '',
      error: 'Password must be at least 6 characters long.',
    };
  }

  return {
    success: true,
    message: 'Password is valid!',
    error: '',
  };
}


