import React, { useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  className = '',
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = props.id || generatedId;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {props.required && <span className="text-red-600 ml-0.5" aria-hidden="true">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-3 py-2 border rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-1 ${
          error
            ? 'border-red-400'
            : 'border-gray-300'
        } ${className}`}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={
          error ? `${inputId}-error` : helperText ? `${inputId}-hint` : undefined
        }
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${inputId}-hint`} className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
}
