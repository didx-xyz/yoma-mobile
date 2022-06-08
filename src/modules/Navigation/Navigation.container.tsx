import React from 'react'
import { useSelector } from 'react-redux'

import Navigation from './Navigation'
import selector from './Navigation.selector'

const NavigationContainer = () => {
  const { isAuthorised } = useSelector(selector)

  return <Navigation isAuthorised={isAuthorised} />
}

export default NavigationContainer
