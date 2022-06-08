import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import * as AuthActions from '~/modules/Auth/Auth.reducer'
import Landing from '~/modules/Landing/Landing'

const LandingContainer = () => {
  const dispatch = useDispatch()

  const onLogin = useCallback(() => {
    dispatch(AuthActions.login())
  }, [dispatch])

  return <Landing onLogin={onLogin} />
}

export default LandingContainer
