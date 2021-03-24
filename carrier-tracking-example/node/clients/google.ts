import {
  ExternalClient,
  InstanceOptions,
  IOContext,
} from '@vtex/api'

export default class GoogleClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super("http://www.google.com", context, options)
  }

  public async Get(): Promise<any> {
    return this.http.get("/")
  }
}
