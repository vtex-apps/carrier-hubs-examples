import {
  method,
  Service,
} from '@vtex/api'
import { generateLabels } from './middlewares/generateLabels'

// Export a service that defines route handlers and client options.
export default new Service({
  routes: {
    // `status` is the route ID from service.json. It maps to an array of middlewares (or a single handler).
    getLabels: method({
      POST: [generateLabels],
    }),
  },
})
