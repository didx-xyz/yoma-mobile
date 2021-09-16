import * as Yup from 'yup'

export const schema = Yup.object().shape({
  title: Yup.string().min(2).max(200).required('Required'),
  description: Yup.string().min(2).max(1000).required('Required'),
  organisationId: Yup.string().required('Required'),
  startTime: Yup.date().nullable().required('Required'),
  endTime: Yup.date()
    .when('startTime', (eventStartDate: any, schema: any) =>
      eventStartDate ? schema.min(eventStartDate, 'End date cannot be before start date') : schema,
    )
    .nullable()
    .required('Required'),
})
