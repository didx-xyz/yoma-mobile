import * as Sentry from '@sentry/react-native'

import Env from '~/env.json'
import { navigationRef } from '~/modules/Navigation/Navigation.utils'

export const routingInstrumentation = new Sentry.ReactNavigationInstrumentation()

Sentry.init({
  dsn: 'https://9bec1ba1ff514183bc08dfbbaa609aad@o415689.ingest.sentry.io/6453219',
  tracesSampleRate: Env.SENTRY_TRACES_SAMPLE_RATE,
  environment: Env.ENVIRONMENT,
  integrations: [
    new Sentry.ReactNativeTracing({
      tracingOrigins: ['localhost', /^\//],
      routingInstrumentation,
    }),
  ],
})

export const setupSentryNavigation = () => {
  routingInstrumentation.registerNavigationContainer(navigationRef)
}

export default Sentry
