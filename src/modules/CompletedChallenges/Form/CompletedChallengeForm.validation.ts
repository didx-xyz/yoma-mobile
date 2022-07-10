import i18n from 'i18next'
import * as Yup from 'yup'

export const schema = Yup.object().shape({
  credentialItemId: Yup.string().min(2).max(200).required(i18n.t('forms.validation.required')),
  startTime: Yup.date()
    .max(new Date(), i18n.t('forms.validation.noStartDateInFuture'))
    .nullable()
    .required(i18n.t('forms.validation.required')),
  endTime: Yup.date()
    .when('startDate', (eventStartDate: any, dateSchema: any) =>
      eventStartDate ? dateSchema.min(eventStartDate, i18n.t('forms.validation.noStartDateInFuture')) : dateSchema,
    )
    .max(new Date(), i18n.t('forms.validation.noEndDateInFuture'))
    .nullable()
    .required(i18n.t('forms.validation.required')),
  requestVerification: Yup.boolean(),
})
