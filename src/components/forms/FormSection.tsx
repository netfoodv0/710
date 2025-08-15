import React from 'react';

interface FormSectionProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export function FormSection({
  title,
  description,
  icon,
  children,
  className = '',
  collapsible = false,
  defaultExpanded = true
}: FormSectionProps) {
  const [expanded, setExpanded] = React.useState(defaultExpanded);

  return (
    <div className={`bg-white rounded-lg p-4 ${className}`} style={{ padding: '16px' }}>
      <div
        className={`mb-4 ${
          collapsible ? 'cursor-pointer hover:bg-gray-50 p-2 rounded' : ''
        }`}
        onClick={collapsible ? () => setExpanded(!expanded) : undefined}
        style={{ height: '73px' }}
      >
        <div className="flex items-center justify-between" style={{ height: '73px' }}>
          <div className="flex items-center space-x-3" style={{ height: '73px' }}>
            {icon && (
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <div className="text-purple-600">{icon}</div>
              </div>
            )}
            <div style={{ height: '73px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              {description && (
                <p className="text-sm text-gray-600 mt-1">{description}</p>
              )}
            </div>
          </div>

          {collapsible && (
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded transition-colors"
            >
              <svg
                className={`w-5 h-5 text-gray-400 transform transition-transform ${
                  expanded ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {(!collapsible || expanded) && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}
