import React from 'react';
import { Button } from '@/components/ui/button';

interface EnhancedButtonProps extends React.ComponentProps<typeof Button> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function EnhancedButton({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'left',
  children,
  disabled,
  className = '',
  ...props
}: EnhancedButtonProps) {
  const baseClasses = 'font-semibold transition-all duration-300 rounded-lg hover:shadow-lg';

  const variantClasses = {
    primary: 'bg-black dark:bg-white text-white dark:text-black hover:opacity-90 hover:scale-105',
    secondary: 'bg-gray-100 dark:bg-gray-900 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800',
    outline: 'border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black',
    ghost: 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900',
    destructive: 'bg-red-600 text-white hover:bg-red-700 hover:scale-105',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  const finalClassName = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
    btn-hover-effect
  `.trim();

  return (
    <Button
      disabled={disabled || isLoading}
      className={finalClassName}
      {...props}
    >
      <div className="flex items-center gap-2 justify-center">
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>جاري...</span>
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && <span>{icon}</span>}
            {children}
            {icon && iconPosition === 'right' && <span>{icon}</span>}
          </>
        )}
      </div>
    </Button>
  );
}
