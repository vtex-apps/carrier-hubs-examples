import {
  method,
  Service,
} from '@vtex/api'
import { notfisFile } from './middlewares/notfisFile'
import { notify } from './middlewares/notifier'

// Export a service that defines route handlers and client options.
export default new Service({
  routes: {
    // `status` is the route ID from service.json. It maps to an array of middlewares (or a single handler).
    notify: method({
      POST: [notify],
    }),
    generateNotfis: method({
      POST: [notfisFile],
    }),
  },
})
