'use server';

export type BasicFormState = {
  success: boolean
  message: string
  error: string
}

export async function submitEmail(
  prevState: BasicFormState,
  formData: FormData
): Promise<BasicFormState> {
  const email = formData.get('email')?.toString().trim() || ''

  if (!email) {
    return {
      success: false,
      message: '',
      error: 'Email is required.',
    };
  }

  console.log('Submitted Email:', email)

  return {
    success: true,
    message: 'Thanks for submitting!',
    error: '',
  };
}
