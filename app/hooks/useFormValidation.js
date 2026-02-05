"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

export const useFormValidation = (schema, defaultValues = {}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    setValue,
    watch,
    trigger,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onBlur', // Validate on blur for better UX
  });

  const onSubmit = async (data, submitHandler) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      if (submitHandler) {
        await submitHandler(data);
      }
      
      setSubmitSuccess(true);
      reset(); // Reset form after successful submission
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = (submitHandler) => {
    return handleSubmit((data) => onSubmit(data, submitHandler));
  };

  const getFieldError = (fieldName) => {
    return errors[fieldName]?.message;
  };

  const hasFieldError = (fieldName) => {
    return !!errors[fieldName];
  };

  const clearFieldError = (fieldName) => {
    clearErrors(fieldName);
  };

  const setFieldError = (fieldName, message) => {
    setError(fieldName, {
      type: 'manual',
      message,
    });
  };

  const resetForm = () => {
    reset();
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  return {
    // Form state
    errors,
    isValid,
    isDirty,
    isSubmitting,
    submitError,
    submitSuccess,
    
    // Form methods
    register,
    handleSubmit: handleFormSubmit,
    reset: resetForm,
    setValue,
    watch,
    trigger,
    getValues,
    
    // Error handling
    getFieldError,
    hasFieldError,
    clearFieldError,
    setFieldError,
    clearErrors,
    
    // Utility methods
    resetForm,
  };
};
