import * as yup from 'yup'

export const ValidationSchema = () => {
  return yup.object().shape({
    title: yup.string().min(2).max(200).required('Required'),
    description: yup.string().min(2).max(1000).required('Required'),
    organisationId: yup.string().required('Required'),
    countries: yup.array().min(1).required('Required'),
    startTime: yup.date().nullable().required('Required'),
    endTime: yup
      .date()
      .when('startTime', (eventStartDate: any, schema: any) =>
        eventStartDate ? schema.min(eventStartDate, 'End date cannot be before start date') : schema,
      )
      .nullable()
      .required('Required'),
  })
}
