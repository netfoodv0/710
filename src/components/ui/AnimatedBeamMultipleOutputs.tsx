"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam.tsx";
import { AnimatedListDemo } from "@/components/ui/AnimatedList";
import { OrderIcon } from "./OrderIcon";
import { MenuIcon } from "./MenuIcon";
import { SupportIcon } from "./SupportIcon";
import { UsersIcon } from "./UsersIcon";
import { ReportIcon } from "./ReportIcon";
import { SettingsIcon } from "./SettingsIcon";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamMultipleOutputDemo({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="bg-gradient-to-b from-white to-[#f5eff2] rounded-2xl p-0 shadow-lg relative">
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <p className="text-sm text-gray-700 leading-relaxed max-w-[165px]">
            Tudo o que seu delivery precisa: pedidos, cardápio, clientes, entregas e relatórios, conectados em um só lugar.
          </p>
        </div>
        <div
          className={cn(
            "relative flex h-[400px] w-full items-center justify-center overflow-hidden px-5 pt-10 pb-5",
            className,
          )}
          ref={containerRef}
        >
          <div className="flex size-full max-w-lg flex-row items-stretch justify-between gap-10">
            <div className="flex flex-col justify-center">
              <Circle ref={div7Ref}>
                <UsersIcon size={20} color="#525866" />
              </Circle>
            </div>
            <div className="flex flex-col justify-center">
              <Circle ref={div6Ref} className="size-16">
                <span className="text-base font-bold text-purple-600">Voult</span>
              </Circle>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <Circle ref={div1Ref}>
                <OrderIcon size={20} color="#525866" />
              </Circle>
              <Circle ref={div2Ref}>
                <MenuIcon size={20} color="#525866" />
              </Circle>
              <Circle ref={div3Ref}>
                <SupportIcon size={20} color="#525866" />
              </Circle>
              <Circle ref={div4Ref}>
                <UsersIcon size={20} color="#525866" />
              </Circle>
              <Circle ref={div5Ref}>
                <ReportIcon size={20} color="#525866" />
              </Circle>
            </div>
          </div>

          {/* AnimatedBeams */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div1Ref}
            toRef={div6Ref}
            duration={3}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div2Ref}
            toRef={div6Ref}
            duration={3}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div3Ref}
            toRef={div6Ref}
            duration={3}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div4Ref}
            toRef={div6Ref}
            duration={3}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div5Ref}
            toRef={div6Ref}
            duration={3}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div6Ref}
            toRef={div7Ref}
            duration={3}
          />
        </div>
      </div>
      
      {/* Container em branco separado por 20px */}
      <div className="mt-5 bg-gradient-to-b from-white to-[#f5eff2] rounded-2xl p-6 shadow-lg h-[400px]">
        <AnimatedListDemo />
      </div>
    </>
  );
}
