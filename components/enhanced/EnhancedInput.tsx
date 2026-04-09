import React from 'react';
import { Input } from '@/components/ui/input';

interface EnhancedInputProps extends React.ComponentProps<typeof Input> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  error?: string;
  success?: boolean;
  label?: string;
}

export const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ icon, iconPosition = 'left', error, success, label, className = '', ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-semibold text-gray-900 dark:text-white">
            {label}
          </label>
        )}
        <div className="relative">
          <Input
            ref={ref}
            className={`
              border-2 rounded-lg font-medium transition-all duration-300
              focus:ring-2 focus:ring-offset-0
              dark:bg-neutral-900 dark:border-gray-700 dark:text-white dark:focus:border-white
              ${
                error
                  ? 'border-red-500 dark:border-red-500 focus:border-red-600 dark:focus:border-red-600 focus:ring-red-500 focus:ring-red-500/20'
                  : success
                  ? 'border-green-500 dark:border-green-500 focus:border-green-600 dark:focus:border-green-600 focus:ring-green-500 focus:ring-green-500/20'
                  : 'border-gray-300 dark:border-gray-700 focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white'
              }
              ${icon ? (iconPosition === 'left' ? 'pl-10 pr-4' : 'pr-10 pl-4') : 'px-4'}
              py-3 text-base
              ${className}
            `.trim()}
            {...props}
          />
          {icon && (
            <div className={`
              absolute top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400
              ${iconPosition === 'left' ? 'left-3' : 'right-3'}
            `}>
              {icon}
            </div>
          )}
          {success && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm font-medium text-red-600 dark:text-red-400 animate-slide-in-up">
            {error}
          </p>
        )}
      </div>
    );
  }
);

EnhancedInput.displayName = 'EnhancedInput';
