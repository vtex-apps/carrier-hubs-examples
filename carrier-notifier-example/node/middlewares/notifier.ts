import { json } from 'co-body'

export async function notify(ctx: Context, next: () => Promise<any>) {

  const content = await json(ctx.req) as NotificationRequest
  console.log(content)

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
