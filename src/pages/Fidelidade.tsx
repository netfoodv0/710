import React, { useState } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { PageHeader } from '../components/ui';
import { FidelidadeProvider, useFidelidade } from '../context/fidelidadeContext';
import { FidelidadeContent } from '../components/fidelidade/FidelidadeContent';

export default function Fidelidade() {
  return (
    <ErrorBoundary>
      <FidelidadeProvider>
        <FidelidadePage />
      </FidelidadeProvider>
    </ErrorBoundary>
  );
}

function FidelidadePage() {
  return (
      <div className="min-h-screen flex flex-col">
        <PageHeader
          title="Fidelidade"
          subtitle="Sistema de fidelidade e recompensas"
        />

        <div className="flex-1 px-4 py-4">
          <div className="max-w-6xl mx-auto space-y-4">
            <FidelidadeContent />
            <div className="h-6"></div>
          </div>
        </div>
      </div>
  );
}
