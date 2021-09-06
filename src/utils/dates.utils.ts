import { format, formatDuration, intervalToDuration, parseISO } from 'date-fns'

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
