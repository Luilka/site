import { useState, type ReactNode } from "react";

import { ErrorBoundary } from "@/components/ui/link.tsx";
import Errors from "@/routes/errors.tsx";

type FeedbackBoundaryProps = {
  children: ReactNode;
};

export default function FeedbackBoundary({ children }: FeedbackBoundaryProps) {
  const [attempt, setAttempt] = useState(0);

  return (
    <ErrorBoundary
      key={attempt}
      fallback={(_error, reset) => (
        <Errors
          reset={() => {
            reset();
            setAttempt((value) => value + 1);
          }}
        />
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
