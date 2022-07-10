import i18n from 'i18next'
import * as yup from 'yup'

import * as Strings from '~/constants/strings.constants'

export const schema = yup.object().shape({
  title: yup.string().min(2).max(30).required(i18n.t('forms.validation.required')),
  description: yup.string().min(2).max(1000).required(i18n.t('forms.validation.required')),
  organisationId: yup.string().min(2).max(200).required(i18n.t('forms.validation.required')),
  startTime: yup
    .date()
    .max(new Date(), i18n.t('forms.validation.noStartDateInFuture'))
    .nullable()
    .required(i18n.t('forms.validation.required')),
  endTime: yup
    .date()
    .when('startDate', (eventStartDate: any, s: any) =>
      eventStartDate ? s.min(eventStartDate, i18n.t('forms.validation.endDateNotBeforeStartDate')) : s,
    )
    .max(new Date(), i18n.t('forms.validation.noEndDateInFuture'))
    .nullable()
    .required(i18n.t('forms.validation.required')),
  skillNames: yup
    .array(yup.string())
    .min(1)
    .label(i18n.t('Skills developed'))
    .required(i18n.t('forms.validation.required')),
})
