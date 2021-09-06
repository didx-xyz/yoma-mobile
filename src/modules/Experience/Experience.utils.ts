import { format } from 'date-fns/fp'
import {
  always,
  apply,
  applySpec,
  compose,
  isEmpty,
  join,
  path,
  pathOr,
  pick,
  pipe,
  prop,
  props,
  reject,
  values,
} from 'ramda'

import { DATES_DIVIDER, DATE_DURATION_DIVIDER, DATE_TPL_MON_YEAR } from '../../constants/date.constants'
import { formatIntervalToDuration, newDate } from '../../utils/dates.utils'

export const extractUserJobsFormValues = applySpec({
  id: path(['job', 'id']),
  title: path(['job', 'title']),
  description: path(['job', 'description']),
  skillNames: pathOr([], ['job', 'skills']),
  organisationId: path(['job', 'organisationId']),
  startTime: prop('startDate'),
  endTime: prop('endDate'),
})

type FormatDurationString = (args: { startDate: string; endDate: string }) => string
export const formatDurationString: FormatDurationString = pipe(
  applySpec({
    start: compose(format(DATE_TPL_MON_YEAR), newDate, prop('startDate')),
    datesDivider: always(DATES_DIVIDER),
    end: compose(format(DATE_TPL_MON_YEAR), newDate, prop('endDate')),
    durationDivider: always(DATE_DURATION_DIVIDER),
    period: compose(apply(formatIntervalToDuration), values),
  }),
  props(['start', 'datesDivider', 'end', 'durationDivider', 'period']),
  join(' '),
)

export const getExperienceMetadata = pipe(
  applySpec({
    organisation: pathOr(null, ['job', 'organisationName']),
    duration: compose(formatDurationString, pick(['startDate', 'endDate'])),
    countries: compose(join(', '), pathOr([], ['job', 'countries'])),
  }),
  values,
  reject(isEmpty),
)
