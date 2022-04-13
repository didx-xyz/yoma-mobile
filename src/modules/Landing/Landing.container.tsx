import { StackNavigationProp } from '@react-navigation/stack'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import * as AuthActions from '~/modules/Auth/Auth.reducer'
import { AuthNavigationRoutes, AuthNavigatorParamsList } from '~/modules/AuthNavigation/AuthNavigation.types'
import Landing from '~/modules/Landing/Landing'

interface Props {
  navigation: StackNavigationProp<AuthNavigatorParamsList, AuthNavigationRoutes.Landing>
}

const LandingContainer = ({ navigation }: Props) => {
  const dispatch = useDispatch()

  const onLogin = useCallback(() => {
    dispatch(AuthActions.login())
  }, [dispatch])

  return <Landing navigation={navigation} onLogin={onLogin} />
}

export default LandingContainer
