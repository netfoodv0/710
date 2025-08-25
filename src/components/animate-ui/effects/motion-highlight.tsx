'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

import { cn } from '../../../lib/utils';

type MotionHighlightProps = HTMLMotionProps<'div'> & {
  children: React.ReactNode;
  controlledItems?: boolean;
  value?: string;
  transition?: any;
};

export function MotionHighlight({
  children,
  className,
  controlledItems = false,
  value,
  transition = {
    type: 'spring',
    stiffness: 200,
    damping: 25,
  },
  ...props
}: MotionHighlightProps) {
  const [activeValue, setActiveValue] = React.useState<string | undefined>(value);
  const [activeRect, setActiveRect] = React.useState<DOMRect | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const itemsRef = React.useRef(new Map<string, HTMLElement>());

  React.useEffect(() => {
    if (value !== undefined) {
      setActiveValue(value);
    }
  }, [value]);

  React.useEffect(() => {
    if (activeValue && itemsRef.current.has(activeValue)) {
      const element = itemsRef.current.get(activeValue);
      if (element && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        
        setActiveRect({
          x: elementRect.x - containerRect.x,
          y: elementRect.y - containerRect.y,
          width: elementRect.width,
          height: elementRect.height,
          top: elementRect.top - containerRect.top,
          left: elementRect.left - containerRect.left,
          right: elementRect.right - containerRect.left,
          bottom: elementRect.bottom - containerRect.top,
          toJSON: () => {}
        });
      }
    }
  }, [activeValue]);

  const registerItem = (value: string, node: HTMLElement | null) => {
    if (node) {
      itemsRef.current.set(value, node);
      if (!activeValue) {
        setActiveValue(value);
      }
    } else {
      itemsRef.current.delete(value);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn('relative', className)}
      {...props}
    >
      {activeRect && (
        <motion.div
          className="absolute bg-white rounded-lg shadow-sm border border-gray-200"
          initial={false}
          animate={{
            x: activeRect.x,
            y: activeRect.y,
            width: activeRect.width,
            height: activeRect.height,
          }}
          transition={transition}
        />
      )}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            registerItem,
            activeValue,
            setActiveValue,
          } as any);
        }
        return child;
      })}
    </motion.div>
  );
}

type MotionHighlightItemProps = HTMLMotionProps<'div'> & {
  children: React.ReactNode;
  value: string;
  registerItem?: (value: string, node: HTMLElement | null) => void;
  activeValue?: string;
  setActiveValue?: (value: string) => void;
};

export function MotionHighlightItem({
  children,
  value,
  className,
  registerItem,
  activeValue,
  setActiveValue,
  ...props
}: MotionHighlightItemProps) {
  const itemRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (registerItem && itemRef.current) {
      registerItem(value, itemRef.current);
    }
    return () => {
      if (registerItem) {
        registerItem(value, null);
      }
    };
  }, [value, registerItem]);

  const handleClick = () => {
    if (setActiveValue) {
      setActiveValue(value);
    }
  };

  return (
    <motion.div
      ref={itemRef}
      className={cn('relative z-10', className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}
