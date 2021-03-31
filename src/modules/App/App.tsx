import React from 'react'

import AppNavigation from '../AppNavigation'
import FlashMessage from "react-native-flash-message";

const App = () => {
  return (
    <>
      <AppNavigation />
      <FlashMessage position="top" />
    </>
  );
}

export default App
