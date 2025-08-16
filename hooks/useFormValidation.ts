import { useState, useCallback } from 'react';
import { ValidationRule } from '../utils/validationRules';

type FormValues = { [key: string]: string };
type FormErrors = { [key: string]: string | undefined };
type ValidationRules = { [key: string]: ValidationRule[] };

export function useFormValidation(initialValues: FormValues, validationRules: ValidationRules) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name: string, value: string) => {
    if (validationRules[name]) {
      for (const rule of validationRules[name]) {
        const error = rule(value);
        if (error) {
          return error;
        }
      }
    }
    return undefined;
  }, [validationRules]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validateField(name, value) }));
  }, [validateField]);

  const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validateField(name, value) }));
  }, [validateField]);

  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validateField, values, validationRules]);

  const handleSubmit = useCallback((onSubmit: (values: FormValues) => void) => (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      onSubmit(values);
    }

    setIsSubmitting(false);
  }, [validateForm, values]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
