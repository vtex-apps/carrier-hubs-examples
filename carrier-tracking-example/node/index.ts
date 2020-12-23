import {
  method,
  Service,
} from '@vtex/api'
import { trackingEvents } from './middlewares/trackingEvents'

// Export a service that defines route handlers and client options.
export default new Service({
  routes: {
    // `status` is the route ID from service.json. It maps to an array of middlewares (or a single handler).
    getTrackingEvents: method({
      POST: [trackingEvents],
    }),
  },
})
