import { AuthNavigationRoutes } from './Authentication.routes'

export type AuthNavigatorParamsList = {
  [AuthNavigationRoutes.Landing]: undefined
  [AuthNavigationRoutes.Register]: undefined
  [AuthNavigationRoutes.RegisterWithEmail]: undefined
  [AuthNavigationRoutes.Login]: undefined
  [AuthNavigationRoutes.ForgotPassword]: undefined
  [AuthNavigationRoutes.ResetPassword]: undefined
}
