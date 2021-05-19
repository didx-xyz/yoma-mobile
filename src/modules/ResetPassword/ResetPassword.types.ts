export type ResetPasswordRoute = {
  key: string
  name: string
  params: Params
}

type Params = {
  Id: string
  Token: string
}
