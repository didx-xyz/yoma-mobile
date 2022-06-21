import { createMiddlewareMock } from 'tests/tests.utils'

import { actions as AuthActions } from '~/modules/Auth'
import * as ChallengesActions from '~/modules/Challenges/Challenges.reducer'
import * as OrganisationsActions from '~/modules/Organisations/Organisations.reducer'
import * as SkillsActions from '~/modules/Skills/Skills.reducer'
import { actions as UserActions } from '~/modules/User'
import { actions as UserChallengesActions } from '~/modules/UserChallenges'
import { actions as UserSkillsActions } from '~/modules/UserSkills/'

import * as SUT from './App.middleware'
import { hydrateApp, resetAppData } from './App.reducer'

describe('modules/App/App.middleware', () => {
  describe('appResetFlow', () => {
    it('should correctly handle an app reset action', () => {
      const create = createMiddlewareMock(jest)
      // given ... the resetAppData action is fired
      const action = resetAppData()
      const { store, next, invoke } = create(SUT.appResetFlow)

      invoke(action)
      // ... we validate that our actions were triggered
      expect(next).toHaveBeenCalledWith(action)
      expect(store.dispatch).toHaveBeenCalled()
    })
    it('should handle app reset action accurately', () => {
      const create = createMiddlewareMock(jest)

      // given ... the resetAppData action is fired
      const action = resetAppData()
      const { store, invoke } = create(SUT.appResetFlow)

      invoke(action)
      // ... we validate that our actions were triggered
      expect(store.dispatch).toHaveBeenCalledWith(AuthActions.clearAuth())
      expect(store.dispatch).toHaveBeenCalledWith(UserActions.clearUser())
      expect(store.dispatch).toHaveBeenCalledWith(UserChallengesActions.clearUserChallenges())
      expect(store.dispatch).toHaveBeenCalledWith(UserSkillsActions.clearUserSkills())
    })
  })
  describe('hydrateAppFlow', () => {
    it('should correctly handle being called', () => {
      const create = createMiddlewareMock(jest)
      // given ...

      // when ... we want to populate the required app data
      const action = hydrateApp()
      const { store, next, invoke } = create(SUT.hydrateAppFlow)

      invoke(action)

      // then ...
      // ... the action should be passed through
      expect(next).toHaveBeenCalledWith(action)

      // ... we should ensure that we populating the app data
      // ... by expecting that an action will be dispatched
      expect(store.dispatch).toHaveBeenCalled()
    })
    it('should fetch all required data', () => {
      // given ...

      // when ... we want to populate the required app data
      const create = createMiddlewareMock(jest)
      const action = hydrateApp()
      const { store, invoke } = create(SUT.hydrateAppFlow)

      invoke(action)

      // then ... we should fetch data from all expected endpoints
      expect(store.dispatch).toHaveBeenCalledWith(ChallengesActions.fetchChallenges())
      expect(store.dispatch).toHaveBeenCalledWith(OrganisationsActions.fetchOrganisations())
      expect(store.dispatch).toHaveBeenCalledWith(SkillsActions.fetchSkills())
    })
  })
})
