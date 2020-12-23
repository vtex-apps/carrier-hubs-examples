import { json } from 'co-body'

export async function notfisFile(ctx: Context, next: () => Promise<any>) {

  const content = await json(ctx.req) as NotificationFileRequest
  console.log(content)

  ctx.status = 200
  ctx.body = {
    "url": "url"
  }

  await next()
}
