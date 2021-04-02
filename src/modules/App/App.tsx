import React, { useEffect } from 'react'

import AppNavigation from '../AppNavigation'
import FlashMessage from "react-native-flash-message";
import { RNLocalize, setI18nConfig } from 'locales/i18n';

setI18nConfig();

const App = () => {
  useEffect(() => {
    RNLocalize.addEventListener('change', setI18nConfig);
    return () => {
      RNLocalize.removeEventListener('change', setI18nConfig);
    };
  }, []);

  return (
    <>
      <AppNavigation />
      <FlashMessage position="top" />
    </>
  );
}

export default App
