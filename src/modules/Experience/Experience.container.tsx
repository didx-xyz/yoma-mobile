import { Dispatch } from '@reduxjs/toolkit'
import { connect } from 'react-redux'

import { actions as OrganisationActions } from '../Organisations'
import { actions as SkillsActions } from '../Skills'
import Experience from './Experience'
import selector from './Experience.selector'

const mapStateToProps = selector
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
