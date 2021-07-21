import { Dispatch } from '@reduxjs/toolkit'
import { selector as OrganisationsSelectors } from 'modules/Organisations'
import { selector as SkillsSelectors } from 'modules/Skills'
import { connect } from 'react-redux'
import { RootState } from 'redux/redux.types'

import { actions as OrganisationActions } from '../Organisations'
import { actions as SkillsActions } from '../Skills'
import Experience from './Experience'

const mapStateToProps = (state: RootState) => {
  return {
    qualifications: [],
    skills: SkillsSelectors.selectSkills(state),
    organisations: OrganisationsSelectors.selectOrganisations(state),
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchSkillsList: () => {
      dispatch(SkillsActions.fetchSkills())
    },
    fetchOrganizationsList: () => {
      dispatch(OrganisationActions.fetchOrganisations())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Experience)
