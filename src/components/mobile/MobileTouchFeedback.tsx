import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils';

interface MobileTouchFeedbackProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  feedbackType?: 'scale' | 'ripple' | 'both';
  scaleAmount?: number;
  rippleColor?: string;
  rippleDuration?: number;
}

export function MobileTouchFeedback({
  children,
  className,
  onPress,
  onLongPress,
  disabled = false,
  feedbackType = 'scale',
  scaleAmount = 0.95,
  rippleColor = 'rgba(59, 130, 246, 0.3)',
  rippleDuration = 600
}: MobileTouchFeedbackProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [rippleId, setRippleId] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const longPressTimeoutRef = useRef<NodeJS.Timeout>();
  const isLongPressRef = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;

    setIsPressed(true);
    isLongPressRef.current = false;

    // Start long press timer
    longPressTimeoutRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      onLongPress?.();
    }, 500);

    // Add ripple effect
    if (feedbackType === 'ripple' || feedbackType === 'both') {
      const rect = elementRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;
        
        const newRipple = { id: rippleId, x, y };
        setRipples(prev => [...prev, newRipple]);
        setRippleId(prev => prev + 1);

        // Remove ripple after animation
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, rippleDuration);
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (disabled) return;

    setIsPressed(false);
    
    // Clear long press timer
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }

    // Handle press (if not long press)
    if (!isLongPressRef.current) {
      onPress?.();
    }
  };

  const handleTouchCancel = () => {
    if (disabled) return;

    setIsPressed(false);
    
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (longPressTimeoutRef.current) {
        clearTimeout(longPressTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={cn(
        'relative overflow-hidden touch-manipulation',
        {
          'cursor-pointer': !disabled,
          'cursor-not-allowed': disabled,
          'select-none': true
        },
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      style={{
        transform: isPressed && (feedbackType === 'scale' || feedbackType === 'both') 
          ? `scale(${scaleAmount})` 
          : 'scale(1)',
        transition: 'transform 0.1s ease-out'
      }}
    >
      {children}
      
      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40,
            backgroundColor: rippleColor,
            animation: `ripple ${rippleDuration}ms ease-out forwards`
          }}
        />
      ))}
      
      {/* Ripple Animation CSS */}
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

// HOC for adding touch feedback to any component
export function withTouchFeedback<P extends object>(
  Component: React.ComponentType<P>,
  feedbackProps?: Omit<MobileTouchFeedbackProps, 'children'>
) {
  return React.forwardRef<any, P>((props, ref) => (
    <MobileTouchFeedback {...feedbackProps}>
      <Component {...props} ref={ref} />
    </MobileTouchFeedback>
  ));
} 