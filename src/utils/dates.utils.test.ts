import * as SUT from './dates.utils'

describe('dates.utils', () => {
  describe('formatDateString', () => {
    it.each([
      ['MMM yyyy', '2016-10-04T00:00:00', 'Oct 2016'],
      ['MMM yyyy', '10-02-1998', 'Oct 1998'],
      ['MMMM yyyy', '02/02/1992', 'February 1992'],
    ])('should be able to convert the date into given format', (formatter, date, expected) => {
      const result = SUT.formatDateString(formatter)(date)
      expect(result).toBe(expected)
    })
  })

  describe('formatISOWithFallback', () => {
    it.each([
      ['MMM yyyy', '2021-08-20T21:42:05+00:00', 'Aug 2021'],
      ['MMM yyyy', '2020-04-20T21:42:05+00:00', 'Apr 2020'],
      ['MMMM yyyy', '2020-04-25T19:05:54.5496363', 'April 2020'],
    ])('should be able to convert the date into given format', (formatter, date, expected) => {
      const result = SUT.formatISOWithFallback(formatter)(date)
      expect(result).toBe(expected)
    })
  })

  describe('formatIntervalToDuration', () => {
    it.each([
      ['10/12/2020', '11/10/2021', '1 year'],
      ['10/12/2016', '10/12/2016', ''],
      ['05/04/2016', '06/04/2016', '1 month'],
      ['03/05/2012', '07/06/2018', '6 years 4 months'],
    ])('should be able to find the difference with years and months', (startDate, endDate, expected) => {
      const result = SUT.formatIntervalToDuration(startDate, endDate)
      expect(result).toBe(expected)
    })
  })

  describe('dateToISOString', () => {
    it('should be able to convert the IOS date into string', () => {
      const date = new Date('2011-10-05T14:48:00.000Z')
      const result = SUT.dateToISOString(date)
      expect(result).toBe('2011-10-05T14:48:00.000Z')
    })
  })
  describe('formatStartEndString', () => {
    it('should return the date period as well as the interval length', () => {
      const durationTimestamps = { startDate: '2021-06-02T10:32:47.330Z', endDate: '2021-08-02T10:32:47.330Z' }

      const result = SUT.formatStartEndString(durationTimestamps)

      expect(result).toBe('Jun 2021 - Aug 2021')
    })
  })
  describe('formatStartEndDatesWithDuration', () => {
    it('should return the date period as well as the interval length', () => {
      const durationTimestamps = { startDate: '2021-06-02T10:32:47.330Z', endDate: '2021-08-02T10:32:47.330Z' }

      const result = SUT.formatStartEndWithDurationString(durationTimestamps)

      expect(result).toBe('Jun 2021 - Aug 2021 • 2 months')
    })
  })
})
