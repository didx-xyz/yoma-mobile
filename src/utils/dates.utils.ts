import { format, formatDuration, intervalToDuration, parseISO } from 'date-fns'
import { format as formatFp } from 'date-fns/fp'
import { always, apply, applySpec, compose, join, pipe, prop, props, values } from 'ramda'

import { DATES_DIVIDER, DATE_DURATION_DIVIDER, DATE_TPL_MON_YEAR } from '../constants/date.constants'

export const formatDateString = (formatter: string) => (dateString: string) => format(new Date(dateString), formatter)
export const formatISOWithFallback =
  (formatter: string) =>
  (dateString: string, fallback = '') =>
    dateString ? format(parseISO(dateString), formatter) : fallback

export const formatIntervalToDuration = (startDate: string, endDate: string) => {
  const { years, months } = intervalToDuration({ start: new Date(startDate), end: new Date(endDate) })
  return formatDuration({ years, months })
}

export const dateToISOString = (date: Date) => date.toISOString()
export const newDate = (str: string) => new Date(str)

type FormatStartEndWithDurationString = (args: { startDate: string; endDate: string }) => string
export const formatStartEndWithDurationString: FormatStartEndWithDurationString = pipe(
  applySpec({
    start: compose(formatFp(DATE_TPL_MON_YEAR), newDate, prop('startDate')),
    datesDivider: always(DATES_DIVIDER),
    end: compose(formatFp(DATE_TPL_MON_YEAR), newDate, prop('endDate')),
    durationDivider: always(DATE_DURATION_DIVIDER),
    period: compose(apply(formatIntervalToDuration), values),
  }),
  props(['start', 'datesDivider', 'end', 'durationDivider', 'period']),
  join(' '),
)
