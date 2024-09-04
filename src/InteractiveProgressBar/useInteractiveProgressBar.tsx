import { useState } from "react";
import InteractiveProgressBarOverlay from "./InteractiveProgressBar";

export const useInteractiveProgressBar = ({
  isLoading,
}: {
  isLoading: boolean;
}) => {
  const [apiRequestsCount, setApiRequestsCount] = useState(0);
  const [apiRequestsDone, setApiRequestsDone] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Loading....");

  function countAwaits(fn: any) {
    const fnStr = fn.toString(); // Convert the function to a string
    const awaitMatches = fnStr.match(/await\s+/g); // Use a regular expression to find all 'await' keywords
    return awaitMatches ? awaitMatches.length : 0; // Return the count of 'await' matches
  }

  const incrementStepsDone = (nextLoadingMessage?: string) => {
    if (apiRequestsDone + 1 < apiRequestsCount) {
      setApiRequestsDone((prev) => prev + 1);
      setLoadingMessage(nextLoadingMessage ?? "");
    }
  };

  const ProgressBar = () => (
    <InteractiveProgressBarOverlay
      apiRequestsDone={apiRequestsDone}
      apiRequestsCount={apiRequestsCount}
      loading={isLoading}
      message={loadingMessage}
    />
  );

  return {
    setApiRequestsCount,
    incrementStepsDone,
    setLoadingMessage,
    utils: {
      countAwaits,
    },
    ProgressBar,
  };
};
