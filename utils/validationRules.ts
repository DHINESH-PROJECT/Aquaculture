export type ValidationRule = (value: string) => string | undefined;

export const required: ValidationRule = (value) => {
  return value.trim() ? undefined : 'This field is required';
};

export const minLength = (min: number): ValidationRule => (value) => {
  return value.length >= min ? undefined : `Minimum length is ${min} characters`;
};

export const isEmail: ValidationRule = (value) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(value) ? undefined : 'Invalid email address';
};

// Add more validation rules as needed
