import {
  ServiceContext,
  RecorderState,
} from '@vtex/api'

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients, State>

  export interface TrackingRequest {
    trackingNumber: string;
  }

  export interface Event {
    city: string;
    date: Date;
    description: string;
    state: string;
  }

  export interface TrackingResponse {
    deliveredDate: Date;
    events: Event[];
    hasReturnedToSender: boolean;
    isDelivered: boolean;
  }
}
