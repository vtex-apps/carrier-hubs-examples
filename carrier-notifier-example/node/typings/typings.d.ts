import {
  ServiceContext,
  RecorderState,
} from '@vtex/api'

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients, State>

  export interface Item {
    id: string;
    name: string;
    quantity: number;
  }

  export interface Dimension {
    height: number;
    length: number;
    width: number;
    weight: number;
  }

  export interface Country {
    code: string;
    name: string;
  }

  export interface Subregion {
    code: string;
    name: string;
  }

  export interface Location {
    lat: number;
    lng: number;
  }

  export interface Address {
    postalCode: string;
    country: Country;
    subregion1: Subregion;
    subregion2: Subregion;
    subregion3: Subregion;
    street: string;
    number: string;
    complement?: any;
    location: Location;
  }

  export interface Recipient {
    cpf: string;
    id?: any;
    name: string;
    address: Address;
    email?: any;
  }

  export interface InvoiceData {
    number: string;
    value: number;
    url: string;
    date: Date;
    invoiceAccessKeys: string[];
    hasIcms: boolean;
    hasInsurance: boolean;
  }

  export interface TrackingData {
    number: string;
    log: any[];
    finished: boolean;
    finishedDate?: any;
  }

  export interface ShippingData {
    shippingPolicyName: string;
    shippingPolicyId: string;
    carrierName: string;
  }

  export interface Package {
    id: string;
    orderId: string;
    items: Item[];
    dimension: Dimension;
    recipientPostalCode: string;
    recipient: Recipient;
    invoiceData: InvoiceData;
    trackingData: TrackingData;
    origin: string;
    status: string;
    orderCreationDate: Date;
    carrierNotifiedDate: Date;
    labelIssuedDate?: any;
    shippingEstimate: string;
    shippingEstimateDate: Date;
    shippingData: ShippingData;
  }

  export interface JuridicPerson {
    cnpj: string;
    fantasyName: string;
    stateRegistration: string;
    email: string;
    phone: string;
  }

  export interface DispatchOrder
  {
    id: string,
    packages: Package[],
    sender: JuridicPerson,
    carrier: JuridicPerson
  }

  export interface NotificationRequest {
    dispatchOrder: DispatchOrder;
    email: string;
  }

  export interface NotificationFileRequest {
    dispatchOrder: DispatchOrder
  }

  export interface NotificationResponse {
    tracking: Tracking,
    notification: Notification;
  }

  export interface Tracking {
    number: string,
    url: string
  }

  export interface Notification {
    id: string
  }
}
