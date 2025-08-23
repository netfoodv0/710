'use client';

import * as React from 'react';
import { motion, type Transition, type HTMLMotionProps, AnimatePresence } from 'motion/react';
import { cn } from '../../../lib/utils';

type TabsContextType<T extends string> = {
  activeValue: T;
  handleValueChange: (value: T) => void;
};

const TabsContext = React.createContext<TabsContextType<any> | undefined>(undefined);

function useTabs<T extends string = string>(): TabsContextType<T> {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
}

type BaseTabsProps = React.ComponentProps<'div'> & {
  children: React.ReactNode;
};

type UnControlledTabsProps<T extends string = string> = BaseTabsProps & {
  defaultValue?: T;
  value?: never;
  onValueChange?: never;
};

type ControlledTabsProps<T extends string = string> = BaseTabsProps & {
  value: T;
  onValueChange?: (value: T) => void;
  defaultValue?: never;
};

type TabsProps<T extends string = string> =
  | UnControlledTabsProps<T>
  | ControlledTabsProps<T>;

function Tabs<T extends string = string>({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
  ...props
}: TabsProps<T>) {
  const [activeValue, setActiveValue] = React.useState<T | undefined>(
    defaultValue ?? undefined,
  );
  const isControlled = value !== undefined;

  React.useEffect(() => {
    if (value !== undefined) {
      setActiveValue(value);
    }
  }, [value]);

  const handleValueChange = (val: T) => {
    if (!isControlled) setActiveValue(val);
    else onValueChange?.(val);
  };

  return (
    <TabsContext.Provider
      value={{
        activeValue: (value ?? activeValue)!,
        handleValueChange,
      }}
    >
      <div
        data-slot="tabs"
        className={cn('flex flex-col gap-2', className)}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

type TabsListProps = React.ComponentProps<'div'> & {
  children: React.ReactNode;
};

function TabsList({
  children,
  className,
  ...props
}: TabsListProps) {
  const { activeValue } = useTabs();

  return (
    <div
      role="tablist"
      data-slot="tabs-list"
      className={cn(
        'relative inline-flex h-12 w-fit items-center justify-center rounded-lg p-1 bg-gray-100',
        className,
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isActive: child.props.value === activeValue,
          } as any);
        }
        return child;
      })}
    </div>
  );
}

type TabsTriggerProps = HTMLMotionProps<'button'> & {
  value: string;
  children: React.ReactNode;
  isActive?: boolean;
};

function TabsTrigger({
  value,
  children,
  className,
  isActive = false,
  ...props
}: TabsTriggerProps) {
  const { handleValueChange } = useTabs();

  return (
    <motion.button
      data-slot="tabs-trigger"
      role="tab"
      whileTap={{ scale: 0.98 }}
      onClick={() => handleValueChange(value)}
      data-state={isActive ? 'active' : 'inactive'}
      className={cn(
        'inline-flex cursor-pointer items-center h-full justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 relative overflow-hidden',
        isActive
          ? 'bg-white text-purple-600 shadow-lg border border-purple-200'
          : 'text-gray-600 hover:text-gray-800 hover:bg-white/50',
        className,
      )}
      {...props}
    >
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-50 to-purple-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <motion.span
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}

type TabsContentsProps = React.ComponentProps<'div'> & {
  children: React.ReactNode;
  transition?: Transition;
};

function TabsContents({
  children,
  className,
  transition = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  },
  ...props
}: TabsContentsProps) {
  const { activeValue } = useTabs();
  const childrenArray = React.Children.toArray(children);
  const activeIndex = childrenArray.findIndex(
    (child): child is React.ReactElement<{ value: string }> =>
      React.isValidElement(child) &&
      typeof child.props === 'object' &&
      child.props !== null &&
      'value' in child.props &&
      child.props.value === activeValue,
  );

  return (
    <div
      data-slot="tabs-contents"
      className={cn('overflow-hidden', className)}
      {...props}
    >
      <motion.div
        className="flex -mx-2"
        animate={{ x: activeIndex * -100 + '%' }}
        transition={transition}
      >
        {childrenArray.map((child, index) => (
          <div key={index} className="w-full shrink-0 px-2">
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

type TabsContentProps = HTMLMotionProps<'div'> & {
  value: string;
  children: React.ReactNode;
};

function TabsContent({
  children,
  value,
  className,
  ...props
}: TabsContentProps) {
  const { activeValue } = useTabs();
  const isActive = activeValue === value;
  
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          role="tabpanel"
          data-slot="tabs-content"
          className={cn('overflow-hidden', className)}
          initial={{ 
            opacity: 0
          }}
          animate={{ 
            opacity: 1
          }}
          exit={{ 
            opacity: 0
          }}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContents,
  TabsContent,
  useTabs,
  type TabsContextType,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentsProps,
  type TabsContentProps,
};
