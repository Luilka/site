import type { ReactNode } from "react";

import { useRetry } from "@/shared/hooks/use-retry.ts";
import { ErrorBoundary } from "@/shared/ui/link.tsx";
import Errors from "@/routes/errors.tsx";

type FeedbackBoundaryProps = {
  children: ReactNode;
};

export default function FeedbackBoundary({ children }: FeedbackBoundaryProps) {
  const { attempt, retry } = useRetry();
  return (
    <ErrorBoundary key={attempt} fallback={(_error, reset) => <Errors reset={() => retry(reset)} />}>
      {children}
    </ErrorBoundary>
  );
}
