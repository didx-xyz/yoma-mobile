import WorkExperienceForm from './Form'
import WorkExperienceView from './View'
import WorkExperienceWidget from './Widget'
import WorkExperience from './WorkExperience'
import * as middleware from './WorkExperience.middleware'
import reducer, * as actions from './WorkExperience.reducer'
import * as types from './WorkExperience.types'

export default WorkExperience
export { WorkExperienceWidget, WorkExperienceForm, WorkExperienceView, actions, middleware, reducer, types }
