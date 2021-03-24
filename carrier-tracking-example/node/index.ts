import {
  ClientsConfig,
  method,
  Service,
} from '@vtex/api'
import { trackingEvents } from './middlewares/trackingEvents'
import { Clients } from './clients'

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: 2000,
    },
  },
}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  routes: {
    // `status` is the route ID from service.json. It maps to an array of middlewares (or a single handler).
    getTrackingEvents: method({
      POST: [trackingEvents],
    }),
  },
})
