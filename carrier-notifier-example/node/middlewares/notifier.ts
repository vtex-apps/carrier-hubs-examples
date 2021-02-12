import { json } from 'co-body'

export async function notify(ctx: Context, next: () => Promise<any>) {
  const { clients: { google } } = ctx
  
  const content = await json(ctx.req) as NotificationRequest
  console.log(content)

  const googleResponse = await google.Get()
  console.log(googleResponse != null)

  ctx.status = 200
  ctx.body = {
    "AL123456789PB": {
      "tracking": {
        "number": "AL123456789PB",
        "url": "url"
      },
      "notification": {
        "id": "id"
      }
    }
  }

  await next()
}
