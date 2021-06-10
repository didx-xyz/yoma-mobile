import SUT, { INITIAL_STATE, setAuthCredentials } from './Auth.reducer'

describe('modules/Auth/Auth.reducer', () => {
  describe('setAuthCredentials', () => {
    it('should set the Auth credentials correctly', () => {
      // give ... there are no credentials in state
      const state = INITIAL_STATE
      const credentials = {
        refreshToken: 'REFRESH_TOKEN',
        token: 'TOKEN',
        expiresAt: 'DATE OF EXPIRY',
        user: {},
      }
      // when ... we set the Auth credentials
      const action = setAuthCredentials(credentials)
      const result = SUT(state, action)
      // then ... should set the credentials correctly
      expect(result).toEqual(credentials)
    })
    it('should update the Auth credentials correctly', () => {
      // give ... there are are credentials in state
      const state = {
        refreshToken: 'OLD REFRESH_TOKEN',
        token: 'OLD TOKEN',
        expiresAt: 'OLD DATE',
      }
      const credentials = {
        refreshToken: 'NEW REFRESH_TOKEN',
        token: 'NEW TOKEN',
        expiresAt: 'NEW DATE',
      }
      // when ... we update the Auth credentials
      const action = setAuthCredentials(credentials)
      const result = SUT(state, action)
      // then ... should update the credentials correctly
      expect(result).toEqual(credentials)
    })
  })
})
