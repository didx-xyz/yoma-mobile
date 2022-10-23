import UserEducationForm from './Form'
import * as middleware from './UserEducation.middleware'
import reducer, * as actions from './UserEducation.reducer'
import * as selectors from './UserEducation.selector'
import * as types from './UserEducation.types'
import * as utils from './UserEducation.utils'
import UserEducationView from './View'
import EducationWidget from './Widget'

export { actions, reducer, middleware, types, selectors, utils, UserEducationForm, EducationWidget, UserEducationView }
