import * as Yup from 'yup'

export const schema = Yup.object().shape({
  challengeId: Yup.string().min(2).max(200).required('Required'),
  startDate: Yup.date().max(new Date(), 'Start date cannot be in the future').nullable().required('Required'),
  endDate: Yup.date()
    .when('startDate', (eventStartDate: any, schema: any) =>
      eventStartDate ? schema.min(eventStartDate, 'End date cannot be before start date') : schema,
    )
    .max(new Date(), 'End date cannot be in the future')
    .nullable()
    .required('Required'),
  requestVerification: Yup.boolean(),
})
