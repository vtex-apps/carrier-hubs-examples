import {
  ClientsConfig,
  method,
  Service,
} from '@vtex/api'
import { Clients } from './clients'
import { notify } from './middlewares/notifier'

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
    notify: method({
      POST: [notify],
    })
  },
})
