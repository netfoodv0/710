import React from 'react';
import clsx from 'clsx';

// Componente Card base
export function Card({ 
  children, 
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('bg-white rounded-lg border border-gray-200 shadow-sm', className)} {...props}>
      {children}
    </div>
  );
}

// Componente CardHeader
export function CardHeader({ 
  children, 
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('flex flex-col space-y-1.5 p-6', className)} {...props}>
      {children}
    </div>
  );
}

// Componente CardTitle
export function CardTitle({ 
  children, 
  className = '',
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={clsx('text-2xl font-semibold leading-none tracking-tight text-gray-900', className)} {...props}>
      {children}
    </h3>
  );
}

// Componente CardDescription
export function CardDescription({ 
  children, 
  className = '',
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={clsx('text-sm text-gray-500', className)} {...props}>
      {children}
    </p>
  );
}

// Componente CardContent
export function CardContent({ 
  children, 
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
}

// Componente CardFooter
export function CardFooter({ 
  children, 
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('flex items-center p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
}
