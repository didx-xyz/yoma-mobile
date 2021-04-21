import { format, formatDuration, intervalToDuration } from 'date-fns'

export const formatDateString = (formatter: string) => (dateString: string) => format(new Date(dateString), formatter)

export const calculateDifferenceInDate = (startDate: string, endDate: string) => {
  const { years, months } = intervalToDuration({ start: new Date(startDate), end: new Date(endDate) })
  const formattedvalue = formatDuration({ years: years, months: months })
  return formattedvalue
}
