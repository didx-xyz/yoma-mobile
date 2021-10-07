import { StackNavigationProp } from '@react-navigation/stack'
import { SocialVariants } from 'components/SocialButton/SocialButton.types'
import { Formik, FormikProps, FormikValues } from 'formik'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import * as AuthActions from '../Auth/Auth.reducer'
import { AuthCredentials } from '../Auth/Auth.types'
import { AuthNavigationRoutes, AuthNavigatorParamsList } from '../AuthNavigation/AuthNavigation.types'
import Login from './Login'
import { schema } from './Login.schema'
import { INITIAL_VALUES } from './LoginForm/LoginForm.constants'

interface Props {
  navigation: StackNavigationProp<AuthNavigatorParamsList, AuthNavigationRoutes.Login>
}

const LoginContainer = ({ navigation }: Props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const onAuthWithSocial = useCallback(
    (authProvider: SocialVariants) => {
      dispatch(AuthActions.authSocialLogin(authProvider))
    },
    [dispatch],
  )

  const onLoginUser = useCallback(
    (details: AuthCredentials) => {
      dispatch(AuthActions.login(details))
    },
    [dispatch],
  )

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={schema(t)} onSubmit={onLoginUser}>
      {(formikHandlers: FormikProps<FormikValues>) => (
        <Login navigation={navigation} onAuthWithSocial={onAuthWithSocial} form={formikHandlers} />
      )}
    </Formik>
  )
}

export default LoginContainer
