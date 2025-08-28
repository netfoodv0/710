import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  collapsible = true,
  defaultExpanded = false
}: FormSectionProps) {
  const [expanded, setExpanded] = React.useState(defaultExpanded);

  return (
    <div className={`bg-white rounded-2xl p-4 border-2 ${className}`} style={{ padding: '16px', borderColor: 'rgba(255, 255, 255, 1)', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
             <div
         className="mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
         onClick={() => setExpanded(!expanded)}
         style={{ height: '73px' }}
       >
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-3 h-full">
                         {icon && (
               <div className="flex-shrink-0 w-15 h-15 bg-purple-100 rounded-full flex items-center justify-center">
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

                                           <motion.button
                        type="button"
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.svg
                          animate={{ rotate: expanded ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="w-5 h-5 text-gray-400"
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
                        </motion.svg>
                      </motion.button>
        </div>
      </div>

                                                       <motion.div
                              animate={{ height: expanded ? "auto" : 0 }}
                              transition={{ 
                                duration: 0.3, 
                                ease: "easeInOut"
                              }}
                              className="overflow-hidden"
                            >
                                                             <div className="pt-4">
                                 {children}
                               </div>
                            </motion.div>
    </div>
  );
}
