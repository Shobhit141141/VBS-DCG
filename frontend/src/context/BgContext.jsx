import React, { createContext, useState } from 'react';

export const BackgroundContext = createContext();

export const BackgroundProvider = ({ children }) => {
  const [background, setBackground] = useState('');

  const handleBg = (venue) => {
    switch (venue) {
      case 'RAJ_SOIN':
        setBackground('/assets/raj_soin_3.png');
        break;
      case 'BR_AUDI':
        setBackground('/assets/br_audi.png');
        break;
      case 'SPS_13':
        setBackground('/assets/sps_bg.png');
        break;
      default:
        setBackground('/assets/dtu_bg_2.png');

     
        break;
    }
  };

  return (
    <BackgroundContext.Provider value={{ background, handleBg }}>
      {children}
    </BackgroundContext.Provider>
  );
};
