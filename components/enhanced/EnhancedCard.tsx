import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface EnhancedCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export function EnhancedCard({
  title,
  description,
  children,
  hover = true,
  className = '',
  icon,
}: EnhancedCardProps) {
  return (
    <Card className={`
      border border-gray-200 dark:border-gray-800 rounded-2xl
      bg-white dark:bg-neutral-900
      transition-all duration-300
      ${hover ? 'hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-700 hover:scale-105' : ''}
      ${className}
    `}>
      {(title || description || icon) && (
        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            {icon && (
              <div className="text-black dark:text-white hover:scale-110 transition-transform">
                {icon}
              </div>
            )}
            <div className="flex-1">
              {title && (
                <CardTitle className="text-black dark:text-white text-xl md:text-2xl">
                  {title}
                </CardTitle>
              )}
              {description && (
                <CardDescription className="text-gray-600 dark:text-gray-400 text-base">
                  {description}
                </CardDescription>
              )}
            </div>
          </div>
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
}
