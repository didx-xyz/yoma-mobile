export enum AuthNavigationRoutes {
  Landing = 'Landing',
  Register = 'Register',
  RegisterWithEmail = 'RegisterWithEmail',
  Login = 'Login',
  ForgotPassword = 'ForgotPassword',
  ResetPassword = 'ResetPassword',
}

export type AuthNavigatorParamsList = {
  [AuthNavigationRoutes.Landing]: undefined
  [AuthNavigationRoutes.Register]: undefined
  [AuthNavigationRoutes.RegisterWithEmail]: undefined
  [AuthNavigationRoutes.Login]: undefined
  [AuthNavigationRoutes.ForgotPassword]: undefined
  [AuthNavigationRoutes.ResetPassword]: undefined
}
