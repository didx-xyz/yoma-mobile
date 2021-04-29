import * as yup from 'yup'

export default () => {
  return yup.object().shape({
    title: yup.string().min(2).max(200).required('Required'),
    description: yup.string().min(2).max(1000).required('Required'),
    qualificationType: yup.string().min(2).max(30).required('Required'),
    organisationId: yup.string().when('noResultInd', {
      is: false,
      then: yup.string().required('Required'),
    }),
    organisationName: yup.string().required('Required'),
    country: yup.string().required('Required'),
    startDate: yup.date().nullable().required('Required'),
    endDate: yup
      .date()
      .when('startDate', (eventStartDate: any, schema: any) =>
        eventStartDate ? schema.min(eventStartDate, 'End date cannot be before start date') : schema,
      )
      .nullable()
      .required('Required'),
  })
}
