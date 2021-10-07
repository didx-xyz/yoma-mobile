import { StackNavigationProp } from '@react-navigation/stack'
import { types as SocialButtonTypes } from 'components/SocialButton'
import React from 'react'
import { useDispatch } from 'react-redux'

import * as AuthActions from '../Auth/Auth.reducer'
import { AuthNavigationRoutes, AuthNavigatorParamsList } from '../AuthNavigation/AuthNavigation.types'
import Register from './Register'

interface Props {
  navigation: StackNavigationProp<AuthNavigatorParamsList, AuthNavigationRoutes.Register>
}

const RegisterContainer = ({ navigation }: Props) => {
  const dispatch = useDispatch()

  const onAuthWithSocial = (authProvider: SocialButtonTypes.SocialVariants) => {
    dispatch(AuthActions.authSocialRegistration(authProvider))
  }

  return <Register navigation={navigation} onAuthWithSocial={onAuthWithSocial} />
}

export default RegisterContainer
