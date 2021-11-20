import React, { createContext, useEffect, useState } from "react";

export const ToneContext = createContext<{
  hasStarted: boolean;
  setHasStarted: (hasStarted: boolean) => void;
}>({
  hasStarted: false,
  setHasStarted: () => undefined,
});

interface ToneProviderProps {
  children?: React.ReactNode;
}

const ToneProvider = ({ children }: ToneProviderProps): React.ReactElement => {
  const [hasStarted, setHasStarted] = useState(false);

  const [contextValue, setContextValue] = useState({
    hasStarted,
    setHasStarted,
  });

  useEffect(() => {
    setContextValue({ hasStarted, setHasStarted });
  }, [hasStarted]);

  return (
    <ToneContext.Provider value={contextValue}>{children}</ToneContext.Provider>
  );
};

export default ToneProvider;
