import React, {createContext, useState, useCallback, ReactNode} from 'react';

type SwipeableContextType = {
  openSwipeable: number | null;
  handleOpen: (id: number) => void;
  handleClose: () => void;
};

export const SwipeableContext = createContext<SwipeableContextType | undefined>(undefined);

type SwipeableProviderProps = {
  children: ReactNode;
};

export const SwipeableProvider: React.FC<SwipeableProviderProps> = ({children}) => {
  const [openSwipeable, setOpenSwipeable] = useState<number | null>(null);

  const handleOpen = useCallback((id: number) => {
    setOpenSwipeable(id);
  }, []);

  const handleClose = useCallback(() => {
    setOpenSwipeable(null);
  }, []);

  return (
    <SwipeableContext.Provider value={{openSwipeable, handleOpen, handleClose}}>
      {children}
    </SwipeableContext.Provider>
  );
};
