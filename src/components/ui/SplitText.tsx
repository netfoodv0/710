import { useLayoutEffect, useMemo, useRef, memo } from 'react';
import { gsap } from 'gsap';

interface SplitTextProps {
  text: string;
  /** Delay before animation starts, in milliseconds */
  delay?: number;
  /** Animation duration, in seconds */
  duration?: number;
  /** HTML tag to render as container */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  /** Initial animation values per character */
  animateFrom?: { y?: number; opacity?: number; rotate?: number; scale?: number };
  /** Stagger time between characters, in seconds */
  stagger?: number;
}

function SplitTextComponent({
  text,
  delay = 0,
  duration = 0.6,
  as: Tag = 'span',
  className,
  animateFrom = { y: 20, opacity: 0 },
  stagger = 0.025,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  const characters = useMemo(() => Array.from(text), [text]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll<HTMLElement>('[data-char=true]') ?? [];

      if (elements && elements.length > 0) {
        gsap.from(elements, {
          ...animateFrom,
          ease: 'power3.out',
          duration,
          delay: Math.max(0, delay) / 1000,
          stagger,
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [text, delay, duration, animateFrom, stagger]);

  return (
    <Tag ref={containerRef as unknown as (instance: HTMLElement | null) => void} className={className} aria-label={text}>
      {characters.map((char, index) => {
        const isSpace = char === ' ';
        return (
          <span
            key={`char-${index}-${char}`}
            data-char={true}
            aria-hidden="true"
            className="inline-block will-change-transform"
            style={{ whiteSpace: isSpace ? 'pre' : undefined }}
          >
            {isSpace ? '\u00A0' : char}
          </span>
        );
      })}
    </Tag>
  );
}

export const SplitText = memo(SplitTextComponent);

export type { SplitTextProps };

