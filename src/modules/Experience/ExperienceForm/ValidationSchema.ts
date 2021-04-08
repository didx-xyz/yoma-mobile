import * as yup from 'yup'

export default () => {
  return yup.object().shape({
    title: yup.string().min(2).max(200).required('Required').label('Job title'),
    description: yup.string().min(2).max(1000).required('Required').label('Job description'),
    startDate: yup.date().max(new Date()).nullable().required('Required'),
    endDate: yup
      .date()
      .when('startDate', (eventStartDate: any, schema: any) => (eventStartDate ? schema.min() : schema))
      .max(new Date())
      .nullable()
      .required('Required'),
    skillNames: yup.array().of(yup.string().max(30).label('A skill')).required('Required').label('Skills developed'),
    organisationId: yup.string().when('noResultInd', {
      is: false,
      then: yup.string().required('Required'),
    }),
    organisationName: yup
      .string()
      .when('noResultInd', {
        is: true,
        then: yup.string().min(2).max(50).required('Required'),
      })
      .label('Organisation name'),
    organisationWebsite: yup
      .string()
      .when('noResultInd', {
        is: true,
        then: yup.string().min(2).max(100).required('Required'),
      })
      .label('Organisation website'),
    primaryContactName: yup
      .string()
      .when('noResultInd', {
        is: true,
        then: yup.string().min(2).max(50).required('Required'),
      })
      .label('Primary contact name'),
    primaryContactEmail: yup
      .string()
      .email()
      .when('noResultInd', {
        is: true,
        then: yup.string().email().min(2).max(255).required('Required'),
      })
      .label('Primary contact email'),
  })
}
